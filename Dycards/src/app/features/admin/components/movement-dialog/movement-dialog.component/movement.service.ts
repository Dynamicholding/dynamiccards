import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

// Modelo de movimiento individual
export interface Movement {
  movements_id: number;
  account_id: number;
  type: 'credit' | 'debit';
  amount: string;
  date: string;
}

// Respuesta al consultar movimientos
export interface MovementsResponse {
  numeroCuenta: string;
  saldo: string;
  movements: Movement[];
}

@Injectable({ providedIn: 'root' })
export class MovementService {
  private apiUrl = `${environment.apiUrl}/movements`;

  constructor(private http: HttpClient) { }

  // Crear crédito
  credit(data: {

    amount: number;
    account_num: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/credit`, data);
  }

  // Crear débito
  debit(data: {
    type: string;
    amount: number;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/debit`, data);
  }

  // Obtener movimientos por número de teléfono
    getMovements(phone: string): Observable<MovementsResponse> {
      return this.http.get<MovementsResponse>(`${this.apiUrl}/by-phone/${phone}`);
    }
}
