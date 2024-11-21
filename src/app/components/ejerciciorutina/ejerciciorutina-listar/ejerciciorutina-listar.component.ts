import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink, RouterModule } from '@angular/router';
import { EjercicioRutina } from '../../../models/EjercicioRutina';
import { EjerciciorutinaService } from '../../../services/ejerciciorutina.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-ejerciciorutina-listar',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule, MatIconModule, RouterModule, RouterLink],
  templateUrl: './ejerciciorutina-listar.component.html',
  styleUrl: './ejerciciorutina-listar.component.css'
})
export class EjerciciorutinaListarComponent implements OnInit{
  datasource: MatTableDataSource<EjercicioRutina> = new MatTableDataSource();
  displayedColumns:string[]=['c1', 'c2', 'c3', 'c4', 'accion01', 'accion02']

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private ejerciciorutina:EjerciciorutinaService, private snackBar: MatSnackBar){}
  ngOnInit(): void {
  this.ejerciciorutina.list().subscribe(data=>{
    this.datasource = new MatTableDataSource(data)
    this.datasource.paginator = this.paginator

  });
  this.ejerciciorutina.getList().subscribe(data=>{
    this.datasource = new MatTableDataSource(data);
    this.datasource.paginator = this.paginator

  })
  }
  ngAfterViewInit(): void {
    if (this.paginator) {
      this.datasource.paginator = this.paginator;
    }
  }
  delete(id: number) {
    this.ejerciciorutina.delete(id).subscribe(
      (data) => {
        console.log('Respuesta de eliminación:', data);  // Agregar log para inspeccionar la respuesta
        this.ejerciciorutina.list().subscribe((data) => {
          this.ejerciciorutina.setList(data);
          this.snackBar.open('Ejercicio de rutina eliminado con éxito', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        });
      },
      (error) => {
        console.error('Error al eliminar la rutina:', error);  // Agregar log para inspeccionar el error
        this.snackBar.open('Hubo un error al eliminar el ejercicio ', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    );
  }
}
