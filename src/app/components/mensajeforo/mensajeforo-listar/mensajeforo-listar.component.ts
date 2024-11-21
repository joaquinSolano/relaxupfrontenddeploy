import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink, RouterModule } from '@angular/router';
import { MensajesForos } from '../../../models/MensajesForos';
import { MensajeforoComponent } from '../mensajeforo.component';
import { MensajeforoService } from '../../../services/mensajeforo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator,MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-mensajeforo-listar',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, RouterLink, MatPaginatorModule],
  templateUrl: './mensajeforo-listar.component.html',
  styleUrl: './mensajeforo-listar.component.css'
})
export class MensajeforoListarComponent {
  datasource: MatTableDataSource<MensajesForos> = new MatTableDataSource();
  displayedColumns:string[]=['c1', 'c2', 'c3', 'c4','c5' ,'accion01', 'accion02']

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private mensajesforos:MensajeforoService, private snackBar: MatSnackBar){}
  ngOnInit(): void {
  this.mensajesforos.list().subscribe(data=>{
    this.datasource = new MatTableDataSource(data)
    this.datasource.paginator = this.paginator;

  });
  this.mensajesforos.getList().subscribe(data=>{
    this.datasource = new MatTableDataSource(data);
    this.datasource.paginator = this.paginator;

  })
  }
  delete(id: number) {
    this.mensajesforos.delete(id).subscribe(
      (data) => {
        console.log('Respuesta de eliminación:', data);  // Agregar log para inspeccionar la respuesta
        this.mensajesforos.list().subscribe((data) => {
          this.mensajesforos.setList(data);
          this.snackBar.open('Mensaje del foro eliminado con éxito', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        });
      },
      (error) => {
        console.error('Error al eliminar el mensaje del foro:', error);  // Agregar log para inspeccionar el error
        this.snackBar.open('Hubo un error al eliminar el mensaje del foro', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    );
  }
}
