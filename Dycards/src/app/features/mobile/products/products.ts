import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrls: ['./products.scss']
})
export class Products {

  products: any[] = [];

  constructor(private http: HttpClient) {
    this.http.get<any[]>('assets/data/products.json').subscribe(data => {
      this.products = data.map(item => ({ ...item, abierto: false }));
    })
  }

  toggleItem(item: any) {
    item.abierto = !item.abierto;
  }
}
