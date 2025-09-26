import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import Swal from 'sweetalert2';
import { MovementService } from '../movement-dialog/movement-dialog.component/movement.service';

@Component({
  selector: 'app-form-credito',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './form-credito.html',
  styleUrls: ['./form-credito.scss']
})
export class FormCreditoComponent implements OnInit {
  creditoForm: FormGroup;
  mostrarCampoProceso = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormCreditoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { account_num: string },
    @Inject(MAT_DIALOG_DATA) public usuario: any,
    private movementService: MovementService
  ) {
    this.creditoForm = this.fb.group({
      tipo: ['', Validators.required],
      valorProceso: [{ value: '', disabled: true }],
      monto: [0, Validators.required],
      account_num: [this.data?.account_num || '']
    });
  }

  ngOnInit(): void {
    // Cambios en tipo
    this.creditoForm.get('tipo')?.valueChanges.subscribe((tipo) => {

      // Consulta
      if (tipo === 'consulta') {
        this.mostrarCampoProceso = false;
        this.creditoForm.get('valorProceso')?.disable();
        const monto = 135000 * 0.075;
        this.creditoForm.patchValue({ monto });

        // Proceso
      } else if (tipo === 'proceso') {
        this.mostrarCampoProceso = true;
        this.creditoForm.get('valorProceso')?.enable();
        this.creditoForm.patchValue({ monto: 0 });
      }
    });

    // Escuchar cambios en el valorProceso
    this.creditoForm.get('valorProceso')?.valueChanges.subscribe((valorProceso: number) => {
      if (valorProceso && this.creditoForm.get('tipo')?.value === 'proceso') {
        const monto = Number(valorProceso) * 0.075;
        this.creditoForm.patchValue({ monto }, { emitEvent: false });
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  registrarOperacion(): void {
    if (this.creditoForm.invalid) return;

    console.log('Formulario enviado:', this.creditoForm.getRawValue());

    const formValue = this.creditoForm.value;

    // Mapear al formato que espera el backend
    const movimiento = {
      type: formValue.tipo,
      amount: formValue.monto,
      account_num: formValue.account_num.startsWith('+57')
        ? formValue.account_num
        : `+57${formValue.account_num}`
    };

    const monto = this.creditoForm.get('monto')?.value || 0;

    Swal.fire({
      title: '¿Confirmar operación?',
      html: `Estás a punto de registrar una <strong>COMISIÓN</strong> por <strong>$${Number(monto).toLocaleString('es-CO')}</strong>. ¿Deseas continuar?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.movementService.credit(movimiento).subscribe({
          next: () => {
            Swal.fire('¡Éxito!', 'La operación fue registrada.', 'success');
            this.dialogRef.close(movimiento);
          },
          error: () => {
            Swal.fire('Error', 'No se pudo registrar la operación.', 'error');
          }
        });
      }
    });
  }
}
