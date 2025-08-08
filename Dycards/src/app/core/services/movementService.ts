import { HttpClient, provideHttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { environment } from "@environments/environment";
import { MovementResponse } from "src/app/models/movements.model";



export const MovementService = () => {
    const http = inject(HttpClient);
    const baseUrl = `${environment.apiUrl}/movements`;
    return {
        getByPhone: ( phone: string ) => http.get<MovementResponse>(`${baseUrl}/by-phone/${phone}`)
    };
}

export const provideAccountService = [provideHttpClient()]