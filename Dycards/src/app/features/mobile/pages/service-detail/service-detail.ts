import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ViewChild } from '@angular/core';
import { CarouselComponent } from 'ngx-bootstrap/carousel';



@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatExpansionModule, CarouselModule],
  templateUrl: './service-detail.html',
  styleUrls: ['./service-detail.scss']
})
export class ServiceDetail {
  touchStartX = 0;
  @ViewChild('carousel', { static: false }) carousel!: CarouselComponent;
  currentIndexes: number[] = [];
  serviceId: string = '';
  details: {
    titulo: string;
    descripcion: string;
    imagenes?: string[];
    redes?: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
      tiktok?: string;
    };
  }[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.route.params.subscribe(params => {
      this.serviceId = params['id'];
      this.loadDetails();
    });
  }
  loadDetails() {
    this.http.get<{ [key: string]: { titulo: string; descripcion: string, imagen: string }[] }>('assets/data/service-details.json')
      .subscribe(data => {
        this.details = data[this.serviceId] || [];
        this.currentIndexes = this.details.map(() => 0);
      });
  }
  isPaused = false;

  onMouseEnter() {
    this.isPaused = true;
  }

  onMouseLeave() {
    this.isPaused = false;
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].clientX;
  }

  onTouchEnd(event: TouchEvent): void {
    const touchEndX = event.changedTouches[0].clientX;
    const delta = touchEndX - this.touchStartX;

    if (delta > 50) {
      this.carousel.previousSlide();
    } else if (delta < -50) {
      this.carousel.nextSlide();
    }
  }
}
