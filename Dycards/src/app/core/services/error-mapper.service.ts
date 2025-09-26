import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorMapperService {
    private mensajes: { [key: string]: string } = {
        '401|Contraseña incorrecta': 'Credenciales inválidas. Intenta nuevamente.',
        '401|Unauthorized': 'Acceso no autorizado. Verifica tus datos.',
        '404|Usuario no encontrado': 'Credenciales inválidas. Intenta nuevamente.',
        '0|': 'No se pudo conectar con el servidor. Revisa tu conexión.',
        'default': 'Ocurrió un error inesperado. Intenta más tarde.'
    };
    obtenerMensaje(status: number, backendMessage: string): string {
        const clave = `${status}|${backendMessage}`;
        return this.mensajes[clave] || this.mensajes['default'];
    }
}
