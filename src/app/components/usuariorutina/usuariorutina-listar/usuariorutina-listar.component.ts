import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsuarioRutina } from '../../../models/UsuarioRutina';
import { UsuarioRutinaService } from '../../../services/usuario-rutina.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-usuariorutina-listar',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule,MatPaginator],
  templateUrl: './usuariorutina-listar.component.html',
  styleUrl: './usuariorutina-listar.component.css'
})
export class UsuariorutinaListarComponent {
  datasource: MatTableDataSource<UsuarioRutina> = new MatTableDataSource();
  displayedColumns: string[] = ['c1','c2','c3','c4','c5','accion01','accion02'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private urs: UsuarioRutinaService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.urs.list().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
      this.datasource.paginator = this.paginator
    });
    this.urs.getList().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
      this.datasource.paginator = this.paginator
    });
  }
  delete(id: number) {
    this.urs.delete(id).subscribe(
      (data) => {
        console.log('Respuesta de eliminación:', data);  // Agregar log para inspeccionar la respuesta
        this.urs.list().subscribe((data) => {
          this.urs.setList(data);
          this.snackBar.open('UsuarioRutina eliminada con éxito', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        });
      },
      (error) => {
        console.error('Error al eliminar la rutina:', error);  // Agregar log para inspeccionar el error
        this.snackBar.open('Hubo un error al eliminar el Usuariorutina ', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    );
  }
}
