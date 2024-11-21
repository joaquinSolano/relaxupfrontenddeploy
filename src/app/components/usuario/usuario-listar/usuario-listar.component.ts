import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink, RouterModule } from '@angular/router';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuario-listar',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, RouterLink,MatPaginator,MatFormField,MatLabel],
  templateUrl: './usuario-listar.component.html',
  styleUrl: './usuario-listar.component.css'
})
export class UsuarioListarComponent implements OnInit{
  datasource: MatTableDataSource<Usuario> = new MatTableDataSource();
  displayedColumns:string[]=['c1', 'c2', 'c3', 'c4', 'c6', 'c7','accion01','accion02']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private usuario:UsuarioService,private snackBar: MatSnackBar){}
  ngOnInit(): void {
  this.usuario.list().subscribe(data=>{
    this.datasource = new MatTableDataSource(data)
    this.datasource.paginator = this.paginator
  });
  this.usuario.getList().subscribe(data=>{
    this.datasource = new MatTableDataSource(data);
    this.datasource.paginator = this.paginator
  })
  }
  delete(id: number) {
    this.usuario.delete(id).subscribe(
      (data) => {
        console.log('Respuesta de eliminación:', data);  // Agregar log para inspeccionar la respuesta
        this.usuario.list().subscribe((data) => {
          this.usuario.setList(data);
          this.snackBar.open('Rutina eliminada con éxito', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        });
      },
      (error) => {
        console.error('Error al eliminar la rutina:', error);  // Agregar log para inspeccionar el error
        this.snackBar.open('Hubo un error al eliminar la rutina ', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    );
  }
}
