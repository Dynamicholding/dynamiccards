import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/AuthService';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.scss']
})
export class ResetPassword implements OnInit {
  token: string = '';
  resetForm!: FormGroup;
  errorMessage = '';
  successMessage = '';
  tokenValid = false;
  tokenChecked = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') || '';

    this.authService.validateResetToken(this.token).subscribe({
      next: () => {
        this.tokenValid = true;
        this.tokenChecked = true;
        this.resetForm = this.fb.group({
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', [Validators.required]]
        });
      },
      error: (err) => {
        this.tokenValid = false;
        this.tokenChecked = true;
        this.errorMessage = err.error?.error || 'Token inválido o expirado';
      }
    });
  }

  onSubmit() {
    if (this.resetForm.invalid) return;

    const { password, confirmPassword } = this.resetForm.value;

    if (password !== confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    this.authService.resetPassword(this.token, password!).subscribe({
      next: () => {
        this.successMessage = 'Contraseña actualizada correctamente';
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Error al actualizar la contraseña';
      }
    });
  }
}
