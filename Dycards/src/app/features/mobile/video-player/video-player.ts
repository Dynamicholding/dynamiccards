import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { OurServicesService } from 'src/app/core/services/our-services.service';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-player.html',
  styleUrl: './video-player.scss'
})
export class VideoPlayer {
  videoUrl!: SafeResourceUrl;

  constructor(
    private route: ActivatedRoute,
    private service: OurServicesService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.service.getServices().subscribe(data => {
      const seleted = data.find((s: any) => s.id == + id );
      if ( seleted ) {
        // Agregar autoplay=1 a la URL del video
        const baseUrl = seleted.videoUrl;
        const autoplayUrl = baseUrl.includes('?')
          ? `${baseUrl}&autoplay=1`
          : `${baseUrl}?autoplay=1`;
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(autoplayUrl);
       }
    });
  }
}
