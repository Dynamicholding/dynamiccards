import { CommonModule } from '@angular/common';
import { Component, inject, Injectable, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovementService } from 'src/app/core/services/movementService';
import { Movement, MovementResponse } from 'src/app/models/movements.model';

@Component({
  selector: 'app-record',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './record.html',
  styleUrl: './record.scss',
  providers: [
    { provide: MovementService, useFactory: MovementService }
  ]
})


export class Record implements OnInit {

  movements: Movement[] = [];
  balance: number = 0;

  protected movementAPI = inject(MovementService);

  ngOnInit() {
    const userRaw = localStorage.getItem('user');
    const user = userRaw ? JSON.parse(userRaw) : null;
    const phone = user?.phone;

    if (phone) {
      this.movementAPI.getByPhone(phone).subscribe({
        next: (data: MovementResponse) => {
          this.movements = data.movements;
          this.balance = +data.saldo;
        },
        error: (err: any) => {
          console.error('Error al cargar movimientos', err);
        }
      });
    }
  }
}
