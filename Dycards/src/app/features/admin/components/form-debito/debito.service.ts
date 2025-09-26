import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DebitoService {
    private apiUrl = `${environment.apiUrl}/accounts/getSaldo`;

    constructor(private http: HttpClient) { }

    // Obtener saldo de cuenta
    getSaldo(account_num: string): Observable<{ saldo_actual: number }> {
        return this.http.get<{ saldo_actual: number }>(`${this.apiUrl}/${account_num}`);
    }
}