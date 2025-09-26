import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/AuthService';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { InfoDialog } from './components/info-dialog/info-dialog';
import { environment } from '@environments/environment';


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
  avatarUrl: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    try {
      const userData = this.authService.getUser();
      /* console.log("Datos: ", userData); */


      if (!userData) {
        console.warn('Usuario no encontrado en localStorage');
        return
      }

      const fullName = this.capitalizeWords(
        `${userData.name || userData.first_name || ''} ${userData.last_name || ''}`
      ).trim();

      this.user = {
        ...userData,
        name: fullName,
        email: userData.email,
        codigo: userData.codigo,
        avatar: userData.avatar && userData.avatar.trim() !== '' ? userData.avatar : 'default'
      };
      
      // Construir la URL completa de la imagen
      if (this.user.avatar) {
        this.avatarUrl = `${environment.assetsUrl}/imagenes/perfiles/${this.user.avatar}`;
      } else {
        this.avatarUrl = 'assets/images/default.jpg';
      }

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
        message: 'Para cualquier información o trámite relacionado con la Tarjeta Dynamica, los únicos canales oficiales de atención son: dynamichco@gmail.com, +57 324 334 0211'
      },
      width: '300px'
    });
  }
}
