import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from '../../layout/header/header';
import { Footer } from '../../layout/footer/footer';



@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterModule, Footer],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
