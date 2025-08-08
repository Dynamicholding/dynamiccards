// upload.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UploadService {
  constructor(private http: HttpClient) {}

  uploadAvatar(formData: FormData): Observable<any> {
  return this.http.post<any>('/api/avatar', formData);
}

}
