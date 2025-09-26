import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MovementService } from '../movement-dialog/movement-dialog.component/movement.service';

@Component({
  selector: 'app-movimientos',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './movimientos.html',
  styleUrls: ['./movimientos.scss']
})
export class MovimientosComponent implements OnInit {
  //displayedColumns: string[] = ['fecha', 'tipo', 'monto', 'descripcion'];
  displayedColumns: string[] = ['date', 'type', 'amount'];
  movimientos: any[] = [];

  constructor(
    private movementService: MovementService,
    public dialogRef: MatDialogRef<MovimientosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { account_num: string }
  ) { }

  ngOnInit(): void {
    this.cargarMovimientos();
  }

  cargarMovimientos(): void {
    this.movementService.getMovements(this.data.account_num).subscribe({
      next: (res) => {
        //this.movimientos = res;
        this.movimientos = res.movements || [];
      },
      error: () => {
        this.movimientos = [];
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
