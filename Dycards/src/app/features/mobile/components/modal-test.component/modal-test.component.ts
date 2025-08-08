import { Component, HostListener, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overlay">
      <div class="modal-content">
        <img src="assets/image.jpg" alt="Bienvenido" />
        <h2>Modal de prueba</h2>
        <p>Este modal debería verse centrado y poder cerrarse.</p>
        <button (click)="cerrar()">Cerrar</button>
      </div>
    </div>
  `,
  styles: [`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    .modal-content {
      background: #fff;
      padding: 2rem;
      border-radius: 12px;
      max-width: 400px;
      text-align: center;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
    }
  `]
})
export class ModalTestComponent {
  @Output() cerrarModal = new EventEmitter<void>();

  // Detecta la tecla Escape y emite el cierre del modal
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.cerrarModal.emit();
  }

  // Método que puede ser llamado desde un botón de cerrar
  cerrar(): void {
    this.cerrarModal.emit();
  }
}
