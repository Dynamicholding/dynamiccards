import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { SessionService } from './session-service';
import { BehaviorSubject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private sessionService: SessionService
  ) { }

  // auth.service.ts
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  // Login HTTP con almacenamiento de token y usuario
  login(email: string, password: string) {

    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      catchError(err => {
        console.error('Error en petición HTTP:', err);
        return throwError(() => err);
      }),
      tap((res: any) => {
        this.saveToken(res.token);
        localStorage.setItem('user', JSON.stringify(res.user));

        const role = res.user?.role;

        if (role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else if (role === 'user') {
          this.router.navigate(['/mobile/home']);
        } else {
          console.warn('Rol desconocido', role);
          this.router.navigate(['/unauthorized']);
        }

        this.userSubject.next(res.user);
      }),
      map(res => res) // Esto lo envía al subscribe del componente
    );
  }

  /** Registro de usuario */
  register(userData: FormData | any) {
    return this.http.post<any>(`${this.apiUrl}/register`, userData).pipe(
      catchError(err => {
        console.error('Error en peticion HTTP:', err);
        return throwError(() => err);
      }),
      tap((res: any) => {
        this.saveToken(res.token);
        localStorage.setItem('user', JSON.stringify(res.data));

        const role = res.data?.role;

        if (role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else if (role === 'user') {
          this.router.navigate(['/mobile/home']);
        } else {
          console.warn('Rol desconocido', role);
          this.router.navigate(['/unauthorized']);
        }

        this.userSubject.next(res.user);
      }),
      map(res => res)
    );
  }

  /** Recuperar contraseña */
  forgodPassword(email: string) {
    return this.http.post<any>(`${this.apiUrl}/forgot_password`, email).pipe(
      catchError(err => {
        console.error('Error en recuperación de contraseña:', err);
        return throwError(() => err);
      }),
      map(res => res)
    );
  }

  /** Validar Token */
  validateResetToken(token: string) {
    return this.http.get<any>(`${this.apiUrl}/validate-reset-token/${token}`).pipe(
      catchError(err => throwError(() => err)),
      map(res => res)
    );
  }

  /** Cambiar contraseña */
  resetPassword(token: string, newPassword: string) {
    return this.http.post<any>(`${this.apiUrl}/reset-password`, {
      token,
      password: newPassword
    }).pipe(
      catchError(err => throwError(() => err)),
      map(res => res)
    );
  }

  // Guardar token
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Guardar usuario
  saveUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Obtener usuario
  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Verificar si está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Cerrar sesión
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
