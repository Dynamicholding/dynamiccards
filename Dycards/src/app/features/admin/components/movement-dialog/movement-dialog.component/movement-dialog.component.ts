import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MovementService } from './movement.service';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  selector: 'app-movement-dialog',
  templateUrl: './movement-dialog.component.html',
  styleUrls: ['./movement-dialog.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ]
})

/* @Input() usuario: { nombre: string; cuenta: string }; */

export class MovementDialogComponent {
  movementForm: FormGroup;

  constructor(
    private movementService: MovementService,
    public dialogRef: MatDialogRef<MovementDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { username: string; account_num: string }
  ) {
    this.movementForm = this.fb.group({
      tipo: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  cerrarModal(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.movementForm.valid) {
      this.dialogRef.close(this.movementForm.value);
    }
  }

  registrarMovimiento(): void {

    if (this.movementForm.invalid) return;

    const movimiento = {
      type: this.movementForm.value.tipo,
      amount: this.movementForm.value.monto,
      account_num: this.data.account_num
    };

    console.log('Número de cuenta recibido:', this.data.account_num);

    Swal.fire({
      title: '¿Confirmar registro?',
      html: `Estás a punto de registrar un <strong>${movimiento.type}</strong> por <strong>$${this.movementForm.value.monto}</strong>. ¿Deseas continuar?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, registrar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.movementService.createMovement(movimiento).subscribe({
          next: (res) => {
            Swal.fire({
              icon: 'success',
              title: '¡Registrado!',
              text: 'El movimiento se ha registrado correctamente.',
              confirmButtonText: 'Aceptar'
            });
            this.dialogRef.close(movimiento);
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo registrar el movimiento.',
              confirmButtonText: 'Cerrar'
            });
          }
        });
      }
    });
  }
}