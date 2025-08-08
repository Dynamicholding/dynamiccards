import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { Account } from 'src/app/models/account.model';
import { environment } from '@environments/environment';

export const AccountService = () => {
  const http = inject(HttpClient);
  const baseUrl = `${environment.apiUrl}/accounts`;

  return {
    getById: (id: number) => http.get<Account>(`${baseUrl}/${id}`),
    getAccountByUser: (userId: number) => http.get<Account>(`${baseUrl}/by-user/${userId}`),
   /*  getMovements: (id: number) => http.get<MovementResponse>(`${baseUrl}/${id}/movements`), */

  

  };
};

export const provideAccountService = [provideHttpClient()];

