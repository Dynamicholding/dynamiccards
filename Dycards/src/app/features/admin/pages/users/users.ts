import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { UserService } from './user.service';
import { User } from './user.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from './user-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MovementDialogComponent } from '../../components/movement-dialog/movement-dialog.component/movement-dialog.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './users.html',
  styleUrls: ['./users.scss']
})
export class Users implements OnInit {

  displayedColumns: string[] = ['first_name', 'last_name', 'phone', 'email', 'actions'];
  dataSource = new MatTableDataSource<User>();
  users: User[] = [];

  constructor(private userService: UserService, private dialog: MatDialog) { }

  /** Modal crear Usuario */
  /********************** */
  openCreateUserModal(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.createUser(result).subscribe(() => {
          this.refreshUsers(); // recarga la tabla
        });
      }
    });
  }

  /** Modal Crear Movimietos */  
  /************************* */
  openMovementDialog(user: User): void {
    const dialogRef = this.dialog.open(MovementDialogComponent, {
      width: '400px',
      data: {
        username: user.first_name,
        account_num: user.phone 
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Puedes mostrar un toast o refrescar movimientos si tienes historial
        console.log('Movimiento registrado:', result);
      }
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.dataSource.data = users;
    });

    /** Refrescar datatable */
    this.refreshUsers();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAddUser() {
    console.log('Agregar nuevo usuario');
    // Aquí podrías navegar a una ruta tipo /usuarios/nuevo
    // O abrir un modal para crear usuario
  }

  editUser(user: any) {
    console.log('Editar usuario:', user);
    // Aquí puedes navegar a /admin/usuarios/edit/{{user.id}} o abrir un modal
  }

  deleteUser(userId: number) {
    console.log('Eliminar usuario con ID:', userId);
    // Puedes mostrar confirmación o realizar lógica de eliminación simulada
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<User>;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  /** Refrescar datatable */
  refreshUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.table.renderRows();
    });
  }


  /*   editUser(user: User): void {
  
    }
  
    deleteUser(id: number): void {
      
    } */

}
