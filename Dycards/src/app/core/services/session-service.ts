import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private timeout: any;
  private readonly LOGIN_KEY = 'isNewLogin';

  setNewLogin(): void {
    sessionStorage.setItem(this.LOGIN_KEY, 'true');
  }

  startTimeout(minutes: number) {
    this.clearTimeout();
    this.timeout = setTimeout(() => {
      this.logout();
    }, minutes * 60 * 1000);
  }

  

  resetTimeout(minutes: number) {
    this.startTimeout(minutes);
  }

  clearTimeout() {
    if (this.timeout) clearTimeout(this.timeout);
  }

  logout() {
    localStorage.clear();
    window.location.href = '/login'; // o usa Router.navigate
  }
}

