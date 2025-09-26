import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/core/services/AuthService';
import { MatDialog } from '@angular/material/dialog';
import { WelcomeModal } from '../../../shared/components/welcome-modal/welcome-modal';
import { Header } from '../../layout/header/header';
import { Footer } from "../../layout/footer/footer";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    Header,
    Footer
],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  loginForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }



  get email(): AbstractControl {
    return this.loginForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.loginForm.get('password')!;
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(event?: Event): void {
    event?.preventDefault(); // Esto evita cualquier reload implícito del form

    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMessage = null;

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (res) => {
        this.loginForm.reset();
        this.loading = false;

        const userName = res.user?.name || 'Usuario';
        const role = res.user?.role;
        
        // Mostrar el modal de bienvenida       
        if (role === 'user') {         
          const dialogRef = this.dialog.open(WelcomeModal, {
            data: { name: userName },
            width: '300px',
            disableClose: true // Opcional: evita que se cierre haciendo clic fuera
          });

          // Redirigir después de cerrar el modal
          dialogRef.afterClosed().subscribe(() => {
            this.router.navigate(['/mobile/home']);
          });
        }
      },
      
      error: (err) => {
        console.error('Error en el componente:', err);
        this.loading = false;

        if (err.status === 401 || err.status === 404) {
          this.errorMessage = 'Credenciales incorrectas. Intenta nuevamente.';
        } else if (err.status === 0) {
          this.errorMessage = 'No se pudo conectar con el servidor.';
        } else {
          this.errorMessage = 'Ocurrió un error inesperado.';
        }
      }
    });
  }
}

