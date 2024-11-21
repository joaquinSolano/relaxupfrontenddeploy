import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Planes } from '../../../models/Planes';
import { PlanesService } from '../../../services/planes.service';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-planesmembresia-listar',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatPaginatorModule],
  templateUrl: './planesmembresia-listar.component.html',
  styleUrls: ['./planesmembresia-listar.component.css']
})
export class PlanesmembresiaListarComponent implements OnInit {

  datasource: MatTableDataSource<Planes> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'accion01', 'accion02'];

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private cS: PlanesService, private snackBar: MatSnackBar) {} 

  ngOnInit(): void {
    // Cargar la lista de planes
    this.cS.list().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
    });
    this.cS.getList().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
    });
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.datasource.paginator = this.paginator;
    }
  }

  // Método para eliminar un plan
  delete(id: number) {
    this.cS.delete(id).subscribe(
      (data) => {
        console.log('Respuesta de eliminación:', data);  // Agregar log para inspeccionar la respuesta
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
          this.snackBar.open('Plan eliminado con éxito', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        });
      },
      (error) => {
        console.error('Error al eliminar el plan:', error);  // Agregar log para inspeccionar el error
        this.snackBar.open('Hubo un error al eliminar el plan', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    );
  }
}
