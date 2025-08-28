import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-welcome-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule],
  templateUrl: './welcome-modal.html',
  styleUrls: ['./welcome-modal.scss']
  /* template: `
    <h2 mat-dialog-title>¡Bienvenido!</h2>
    <mat-dialog-content>
      <p>Hola {{ data.name }}, nos alegra verte de nuevo 😊</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Continuar</button>
    </mat-dialog-actions>
  ` */
})
export class WelcomeModal {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string }) {}
}
