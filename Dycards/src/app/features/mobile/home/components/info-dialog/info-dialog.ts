import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-dialog.html',
  styleUrls: ['./info-dialog.scss']

})
export class InfoDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }) {}

  get title() {
    return this.data.title;
  }

  get message() {
    return this.data.message;
  }
}
