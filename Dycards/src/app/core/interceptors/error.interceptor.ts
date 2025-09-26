import { Injectable } from '@angular/core'; 
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http'; 
import { Observable, throwError } from 'rxjs'; 
import { catchError } from 'rxjs/operators'; 
import { ErrorMapperService } from '../services/error-mapper.service'
@Injectable() 
export class ErrorInterceptor implements HttpInterceptor { 
    constructor(
       private errorMapper: ErrorMapperService
    ) {} 
    
    intercept(req: HttpRequest<any>, next: HttpHandler): 
    Observable<HttpEvent<any>> { 
        return next.handle(req).pipe( 
            catchError((err: HttpErrorResponse) => {
                const backendMessage = err?.error?.message || err?.statusText || ''; 
                const mensaje = this.errorMapper.obtenerMensaje(err.status, backendMessage); 

                return throwError(() => err); 
            }) 
        ); 
    } 
}