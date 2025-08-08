// user-form.component.ts
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { MatOptionModule } from '@angular/material/core';
import Swal from 'sweetalert2';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatInputModule, MatOptionModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  avatarPreview: string | ArrayBuffer | null = null;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserFormComponent>,
    private uploadService: UploadService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      dni: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      father_id: ['', Validators.required],
      avatar: ['']
      /* role: ['user', Validators.required] */
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onAvatarSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    // Mostrar vista previa
    const reader = new FileReader();
    reader.onload = () => {
      this.avatarPreview = reader.result;
    };
    reader.readAsDataURL(file);

    // Obtener el dni del formulario
    const dni = this.form.get('dni')?.value;
    if (!dni) {
      Swal.fire('Error', 'Debes ingresar el número de identificación antes de subir el avatar.', 'warning');
      return;
    }

    // Preparar FormData
    const formData = new FormData();
    formData.append('file', file);
    formData.append('dni', dni); // ← necesario para renombrar en el backend

    // Subir imagen
    this.uploadService.uploadAvatar(formData).subscribe({
      next: (res: any) => {
        this.form.patchValue({ avatar: res.filename });
        Swal.fire('Avatar subido', 'La imagen fue cargada correctamente.', 'success');
      },
      error: (err: any) => {
        Swal.fire('Error', 'No se pudo subir la imagen. Asegúrate de que sea PNG y menor a 2MB.', 'error');
        console.error('Error al subir avatar:', err);
      }
    });
  }
}
