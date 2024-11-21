import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink, RouterModule } from '@angular/router';
import { Rutina } from '../../../models/Rutina';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { RutinaService } from '../../../services/rutina.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-rutina-listar',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule, MatIconModule, RouterModule, RouterLink],
  templateUrl: './rutina-listar.component.html',
  styleUrl: './rutina-listar.component.css'
})
export class RutinaListarComponent implements OnInit{
  datasource: MatTableDataSource<Rutina> = new MatTableDataSource();
  displayedColumns:string[]=['c1', 'c2', 'c3', 'c4', 'c5', 'accion01', 'accion02']

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private Rutina:RutinaService, private snackBar: MatSnackBar){}
  ngOnInit(): void {
  this.Rutina.list().subscribe(data=>{
    this.datasource = new MatTableDataSource(data)
    this.datasource.paginator = this.paginator

  });
  this.Rutina.getList().subscribe(data=>{
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
    this.Rutina.delete(id).subscribe(
      (data) => {
        console.log('Respuesta de eliminación:', data);  // Agregar log para inspeccionar la respuesta
        this.Rutina.list().subscribe((data) => {
          this.Rutina.setList(data);
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
