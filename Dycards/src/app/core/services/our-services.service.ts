import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OurServicesService {
  private http = inject(HttpClient);

  private dataUrl = 'assets/data/services.json';

  constructor() {}

  getServices(): Observable<any> {
    return this.http.get<any>(this.dataUrl);
  }
}