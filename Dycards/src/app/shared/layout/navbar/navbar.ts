import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/AuthService';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar {
  isLoggedIn = signal(false);
  user: any = null;
  services: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { this.isLoggedIn = signal(this.authService.isAuthenticated()); }

  logout() {
    this.authService.logout();
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }
}
