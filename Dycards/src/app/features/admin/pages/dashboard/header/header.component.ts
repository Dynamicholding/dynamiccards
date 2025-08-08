// header.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/services/AuthService';
import { Router } from '@angular/router';
/* import { ToastrService } from 'ngx-toastr'; */

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']

})
export class HeaderComponent implements OnInit {
  userName: string = '';

  constructor(
    private authService: AuthService,
    private router: Router/* ,
     private toastr: ToastrService */
  ) { }

  ngOnInit(): void {
    const userData = this.authService.getUser();
    this.userName = userData.name
  }

  onLogoutClick(): void {
    // 1. Eliminar datos del usuario
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // 2. Redirigir al login
    this.router.navigate(['/login']);

    // 3. (Opcional) Mostrar mensaje
     alert('Sesión cerrada correctamente');
    /* this.toastr.success('Sesión cerrada correctamente'); */
    /* this.toastr.success('Sesión cerrada correctamente'); */


  }

  onSettingsClick() {
    // lógica de navegación a ajustes
  }
}
