import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Header } from '../layout/header/header';

@Component({
  selector: 'app-our-service',
  standalone: true,
  imports: [CommonModule, RouterModule, Header],
  templateUrl: './our-service.html',
  styleUrls: ['./our-service.scss']
})
export class OurService {
  private http = inject(HttpClient);
  private router = inject(Router);

  services: any[] = [];
  products: any[] = [];

  ngOnInit() {
    this.http.get<any[]>('assets/data/our-services.json').subscribe(data => {
      this.services = data;
    });

   /*  this.http.get<any[]>('assets/data/our-products.json').subscribe(data => {
      this.products = data;
    }); */
  }

  goToDetail(id: string) {
    this.router.navigate(['/services', id]);
  }
}
