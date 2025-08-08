import { Component, inject, NgModule, Renderer2 } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/AuthService';
import { Navbar } from './shared/layout/navbar/navbar';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { SessionService } from './core/services/session-service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  /* imports: [RouterOutlet, CommonModule, Navbar], */
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Dycards';

  showNav = true;
  router = inject(Router);
  renderer = inject(Renderer2);

  constructor(
    private authService: AuthService,
    private session: SessionService
  ) { }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        
      });


    ['click', 'mousemove', 'keydown', 'scroll'].forEach(event =>
      window.addEventListener(event, () => this.session.resetTimeout(15))
    );
  }

  @NgModule({
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }
    ]
  })

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  shouldShowNavbar(): boolean {
    return this.isLoggedIn() && this.showNav;
  }

}
