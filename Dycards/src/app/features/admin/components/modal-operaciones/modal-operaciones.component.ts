import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from '@angular/material/card';
import { FormCreditoComponent } from '../form-credito/form-credito';
import { FormDebitoComponent } from '../form-debito/form-debito';
import { MovimientosComponent } from '../movimientos/movimientos';

@Component({
  selector: 'app-modal-operaciones',
  standalone: true,
  imports: [
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './modal-operaciones.component.html',
  styleUrl: './modal-operaciones.component.scss'
})
export class ModalOperacionesComponent {

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ModalOperacionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  abrirModal(tipo: string) {
    this.dialogRef.close(); // cerramos el menú de operaciones

    if (tipo === 'credito') {
      this.dialog.open(FormCreditoComponent, {
        width: '500px',
        data: { account_num: this.data.phone }
      });
    }

    if (tipo === 'debito') {
      this.dialog.open(FormDebitoComponent, {
        width: '500px',
        data: { account_num: this.data.phone }
      });
    }

    if (tipo === 'movimientos') {
      this.dialog.open(MovimientosComponent, {
        width: '800px',
        data: { account_num: this.data.phone }
      });
    }

  }
}
