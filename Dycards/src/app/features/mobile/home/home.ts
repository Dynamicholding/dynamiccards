import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/AuthService';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { InfoDialog } from './components/info-dialog/info-dialog';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTooltipModule, MatDialogModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {
  user: any = null;
  services: any[] = [];
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog
  ) {  }

  ngOnInit(): void {
    try {
      const userData = this.authService.getUser();

      if (userData) {
        const fullName = this.capitalizeWords(
          `${userData.name || userData.nombres || ''} ${userData.apellido || ''}`
        ).trim();

        this.user = {
          ...userData,
          name: fullName,
          email: userData.email,
          avatar: userData.avatar && userData.avatar.trim() !== '' ? userData.avatar : 'default'
        };
      } else {
        console.warn('⚠️ Usuario no encontrado en localStorage');
      }

      console.log('👤 Usuario procesado:', this.user);
    } catch (error) {
      console.error('Error al procesar usuario:', error);
    }
    
    this.http.get<any[]>('assets/data/services.json').subscribe({
      next: (data) => {
        this.services = data;
        console.log('Servicios cargados:', this.services);
      },
      error: (err) => {
        console.error('Error al cargar servicios:', err);
      }
    });

  }

  logout(): void {
    this.authService.logout();
  }

  capitalizeWords(text: string): string {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  openVideo(url: string): void {
    window.open(url, '_blank');
  }

  openInfo() {
    this.dialog.open(InfoDialog, {
      data: {
        title: 'Terminos y Condiciones',
        message: 'Para cualquier información o trámite relacionado con la Tarjeta Dynamica, los únicos canales oficiales de atención son: administrativo@gefi.com, +57 324 334 0225, 324 334 0225'
      },
      width: '300px'
    });
  }
}
