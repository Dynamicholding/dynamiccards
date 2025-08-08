import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-login-modal.component',
  standalone: true,
  imports: [CommonModule],
  /* templateUrl: './login-modal.components.html',
  styleUrl: './login-modal.components.scss' */
  template: `
    <div class="overlay" *ngIf="isVisible()">
      <div class="modal-content">
        <img src="assets/bienvenida.jpg" alt="Bienvenido" />
        <h2>¡Bienvenido!</h2>
        <p>Tu sesión ha iniciado correctamente.</p>
        <button (click)="close()">Cerrar</button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.6);
    }

    .modal-content {
      background: #fff;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 0 20px rgba(0,0,0,0.2);
      max-width: 90%;
      text-align: center;
    }

  `]
})
export class LoginModalComponent {
  isVisible = signal(true);

  close() {
    this.isVisible.set(false);
  }
}
