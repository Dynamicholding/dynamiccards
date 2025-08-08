import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/accountService';
import { MovementService } from 'src/app/core/services/movementService';
import { Account } from 'src/app/models/account.model';
import { MovementResponse } from 'src/app/models/movements.model';
import { Movement } from 'src/app/models/movements.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  providers: [
    { provide: MovementService, useFactory: MovementService },
    { provide: AccountService, useFactory: AccountService }
  ]
})

export class Dashboard implements OnInit {
  private accountAPI = inject(AccountService);
  private movementAPI = inject(MovementService);

  account: Account | null = null;
  movements: Movement[] = [];

  ngOnInit() {
    const userRaw = localStorage.getItem('user');
    const user = userRaw ? JSON.parse(userRaw) : null;
    const userId = user?.id;
    const phone = user?.phone;

    if (userId) {
      this.accountAPI.getAccountByUser(userId).subscribe((account: Account) => {
        this.account = account;
      });
    }

    if (phone) {
      console.log(phone);
      
      this.movementAPI.getByPhone(phone).subscribe({
        next: (data: MovementResponse) => {
          this.movements = data.movements;
        },
        error: (err: any) => {
          console.error('Error al cargar movimientos:', err);
        }
      });
    }
  }

}


