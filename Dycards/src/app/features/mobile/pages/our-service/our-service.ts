import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-our-service',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './our-service.html',
  styleUrls: ['./our-service.scss']
})
export class OurService {
  private http = inject(HttpClient);
  private router = inject(Router);

  services: any[] = [];

  ngOnInit() {
    this.http.get<any[]>('assets/data/our-services.json').subscribe(data => {
      this.services = data;
    });
  }

  goToDetail(id: string) {
    this.router.navigate(['/mobile/our-service', id]);
  }
}
