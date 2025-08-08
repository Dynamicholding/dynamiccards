import { Injectable } from "@angular/core";

// src/app/services/theme.service.ts
@Injectable({ providedIn: 'root' })
export class ThemeService {
  setTheme(themeName: string): void {
    const body = document.body;
    body.className = '';
    body.classList.add(themeName);
  }
}
