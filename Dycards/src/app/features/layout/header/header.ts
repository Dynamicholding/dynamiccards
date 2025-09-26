import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router' 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  showButton = false;

  constructor(
    private location: Location, 
    private router: Router
  ){}

  ngOnInit() {
    /** Ocultar boton de atras en el Home */
    this.router.events.subscribe(() => {
      this.showButton = !this.router.url.includes('/mobile/home');
    })
  }

  goBack() {
    this.location.back()
  }
}
