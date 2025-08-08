import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class MovementService {
  private apiUrl = `${environment.apiUrl}/movements`;

  constructor(private http: HttpClient) { }

  createMovement(data: {
    type: string;
    amount: number;
    account_num: string;
  }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
