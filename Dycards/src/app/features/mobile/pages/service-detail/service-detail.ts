import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatExpansionModule],
  templateUrl: './service-detail.html',
  styleUrls: ['./service-detail.scss']
})
export class ServiceDetail {
  serviceId: string = '';
  details: { titulo: string; descripcion: string }[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.params.subscribe(params => {
      this.serviceId = params['id'];
      this.loadDetails();
    });
  } 
  loadDetails() {
    this.http.get<{ [key: string]: { titulo: string; descripcion: string }[] }>('assets/data/service-details.json').subscribe(data => {
        this.details = data[this.serviceId] || [];
      });
  } 
}
