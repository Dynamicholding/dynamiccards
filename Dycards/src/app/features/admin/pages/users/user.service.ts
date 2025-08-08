import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    private apiUrl = `${environment.apiUrl}/users`;

    constructor(private http: HttpClient) { }

    /** Listar usuarios */
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }

    /** Insertar usuarios */
    createUser(user: User): Observable<User> {
        console.log(user);
        
        const token = localStorage.getItem('token');
        console.log('Token enviado:', token);
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });

        return this.http.post<User>(this.apiUrl, user, { headers });
    }
}
