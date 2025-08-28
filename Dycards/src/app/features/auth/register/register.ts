import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/AuthService';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatIconModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})

export class Register {
  registerForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  loading = false;
  errorMessage = '';
  fotoPerfil: File | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      dni: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      code: ['', [Validators.required]],
    }, { validator: this.passwordMatchValidator });
  }

  /** Validar Password */
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  /** Foto perfil */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fotoPerfil = input.files[0];
    }
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      console.warn('Formulario inválido');
      return;
    }

    this.loading = true;

    const formData = new FormData();
    const rawData = this.registerForm.value;
    //const formData = this.registerForm.value;

    // Agrega todos los campos del formulario
    Object.keys(rawData).forEach(key => {
      formData.append(key, rawData[key]);
    });

    // Agrega la imagen si existe
    if (this.fotoPerfil) {
      formData.append('fotoPerfil', this.fotoPerfil);
    }

    console.log('Datos enviados:', formData);

    // Aquí llamas a tu servicio que conecta con Node.js
    this.authService.register(formData).subscribe({
      next: (res) => {
        console.log('Registro exitoso:', res);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al registrar:', err);
        this.errorMessage = err.error?.message || 'Error inesperado';
        this.loading = false;
      }
    })
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  get first_name() { return this.registerForm.get('name'); }
  get last_name() { return this.registerForm.get('last_name'); }
  get dni() { return this.registerForm.get('dni'); }
  get phone() { return this.registerForm.get('phone'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get code() { return this.registerForm.get('code'); }
}
