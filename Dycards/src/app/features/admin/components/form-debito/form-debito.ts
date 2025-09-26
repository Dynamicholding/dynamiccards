import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MovementService } from '../movement-dialog/movement-dialog.component/movement.service';
import Swal from 'sweetalert2';
import { DebitoService } from './debito.service';

@Component({
  selector: 'app-form-debito',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './form-debito.html',
  styleUrls: ['./form-debito.scss']
})
export class FormDebitoComponent {
  debitoForm: FormGroup;
  saldoActual: number = 0;
  saldo: number | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormDebitoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { account_num: string },
    private movementService: MovementService,
    private debitoService: DebitoService
  ) {
    this.debitoForm = this.fb.group({
      monto: ['', [Validators.required, Validators.min(0.01)]],
      account_num: [this.data.account_num || '']
    });
  }

  ngOnInit() {
    console.log('Entró a ngOnInit de FormDebitoComponent');
    console.log('account_num recibido:', this.data);
    let phone = this.data.account_num;

    if (!phone) {
      console.warn('No llegó account_num en this.data');
      return;
    }

    // Normalizar el número
    if (!phone.startsWith('+57')) {
      if (phone.startsWith('57')) {
        phone = '+' + phone;
      } else if (phone.length === 10) {
        phone = '+57' + phone;
      }
    }

    console.log('Número normalizado:', phone);
    this.consultarSaldo(phone);
  }

  consultarSaldo(phone: string) {
    console.log('Entró a consultarSaldo con:', phone);
    this.debitoService.getSaldo(phone).subscribe({
      next: (data) => {
        console.log('Respuesta del backend:', data);
        this.saldoActual = Number(data.saldo_actual);
      },
      error: (err) => {
        console.error('Error al consultar saldo', err);
      }
    });
  }

  saldoFormateado(): string {
    if (this.saldoActual != null) {
      return this.saldoActual
        .toLocaleString('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0
        })
        .replace(/\s/g, ''); //elimina espacios
    }
    return '$0';
  }


  close(): void {
    this.dialogRef.close();
  }

  registrarDebito(): void {
    if (this.debitoForm.invalid) return;

    const monto = this.debitoForm.value.monto;

    console.log('Datos de formulario', this.debitoForm.getRawValue());
    

    if (monto > this.saldoActual) {
      Swal.fire('Saldo insuficiente', 'No tienes fondos suficientes para este débito.', 'warning');
      return;
    }

    const formValue = this.debitoForm.value;

    const movimiento = {
      type: 'débito',
      amount: monto,
      account_num: formValue.account_num.startsWith('+57')
        ? formValue.account_num
        : `+57${formValue.account_num}`
    };

    Swal.fire({
      title: '¿Confirmar débito?',
      html: `Se debitará <strong>$${monto}</strong> de la cuenta.<br>Saldo disponible: <strong>$${this.saldoActual}</strong>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, debitar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.movementService.debit(movimiento).subscribe({
          next: () => {
            Swal.fire('¡Éxito!', 'El débito fue registrado.', 'success');
            this.dialogRef.close(movimiento);
          },
          error: () => {
            Swal.fire('Error', 'No se pudo registrar el débito.', 'error');
          }
        });
      }
    });
  }
}
