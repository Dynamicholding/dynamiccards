import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-mobile-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, Header, Footer],
  templateUrl: './mobile-layout.html',
  styleUrl: './mobile-layout.scss'
})
export class MobileLayout {

}
