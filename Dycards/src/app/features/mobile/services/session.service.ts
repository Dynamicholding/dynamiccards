import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private loginStatus: 'new' | 'existing' | null = null;

  setLoginStatus(status: 'new' | 'existing') {
    this.loginStatus = status;
  }

  isNewLogin(): boolean {
    return this.loginStatus === 'new';
  }

  clearLoginStatus() {
    this.loginStatus = null;
  }
}
