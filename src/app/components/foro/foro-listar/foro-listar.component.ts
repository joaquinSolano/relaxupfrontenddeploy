import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink, RouterModule } from '@angular/router';
import { Foros } from '../../../models/Foros';
import { ForosService } from '../../../services/foros.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-foro-listar',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, RouterModule, RouterLink],
  templateUrl: './foro-listar.component.html',
  styleUrl: './foro-listar.component.css'
})
export class ForoListarComponent {
  datasource: MatTableDataSource<Foros> = new MatTableDataSource();
  displayedColumns:string[]=['c1', 'c2', 'c3','accion01','accion02']
  
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private forosservice:ForosService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
  this.forosservice.list().subscribe(data=>{
    this.datasource = new MatTableDataSource(data)
    this.datasource.paginator = this.paginator
  });
  this.forosservice.getList().subscribe(data=>{
    this.datasource = new MatTableDataSource(data);
    this.datasource.paginator = this.paginator
  })
  }
  delete(id: number) {
    this.forosservice.delete(id).subscribe(
      (data) => {
        console.log('Respuesta de eliminación:', data);  // Agregar log para inspeccionar la respuesta
        this.forosservice.list().subscribe((data) => {
          this.forosservice.setList(data);
          this.snackBar.open('Foro eliminado con éxito', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        });
      },
      (error) => {
        console.error('Error al eliminar el foro:', error);
        this.snackBar.open('Hubo un error al eliminar el foro', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    );
  }
}
