import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Eventos } from '../../../models/Eventos';
import { EventosService } from '../../../services/eventos.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-eventos-listar',
  standalone: true,
  imports: [MatTableModule,MatPaginator,MatIconModule,RouterLink],
  templateUrl: './eventos-listar.component.html',
  styleUrl: './eventos-listar.component.css'
})
export class EventosListarComponent implements OnInit{
  datasource: MatTableDataSource<Eventos> = new MatTableDataSource();
  displayedColumns: string[] = ['c1','c2','c3','c4','c5','c6','c7','c8','accion01','accion02'];
  constructor(private eventosservice:EventosService,private snackBar: MatSnackBar){}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
      this.eventosservice.list().subscribe((data)=>{
        this.datasource=new MatTableDataSource(data)
        this.datasource.paginator = this.paginator

      })
      this.eventosservice.getList().subscribe((data)=>{
        this.datasource=new MatTableDataSource(data)
        this.datasource.paginator = this.paginator

      })
  }
  delete(id: number) {
    this.eventosservice.delete(id).subscribe(
      (data) => {
        console.log('Respuesta de eliminación:', data);  // Agregar log para inspeccionar la respuesta
        this.eventosservice.list().subscribe((data) => {
          this.eventosservice.setList(data);
          this.snackBar.open('Evento eliminado con éxito', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        });
      },
      (error) => {
        console.error('Error al eliminar el evento:', error);  // Agregar log para inspeccionar el error
        this.snackBar.open('Hubo un error al eliminar el evento ', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    );
  }
}
