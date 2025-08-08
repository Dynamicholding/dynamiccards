// sidebar.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isVisible = false;

  toggleSidebar() {
    this.isVisible = !this.isVisible;
  }

  hideSidebarOnMobile() {
    if (window.innerWidth < 600) {
      this.isVisible = false;
    }
  }

  ngOnInit() {
    this.hideSidebarOnMobile();
    window.addEventListener('resize', () => this.hideSidebarOnMobile());
  }
}
