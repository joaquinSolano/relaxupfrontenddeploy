import { Component, OnInit, ViewChild } from '@angular/core';
import { Emergencia } from '../../../models/Emergencia';
import { EmergenciaService } from '../../../services/emergencia.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-emergencia-listar',
  standalone: true,
  imports: [
    MatTableModule,MatIconModule,RouterModule,MatPaginatorModule
  ],
  templateUrl: './emergencia-listar.component.html',
  styleUrl: './emergencia-listar.component.css'
})
export class EmergenciaListarComponent implements OnInit {
  
  datasource: MatTableDataSource<Emergencia> = new MatTableDataSource();
  displayedColumns: string [] = ['cttt1','cttt2','cttt3','cttt4','accion01','accion02'];

  @ViewChild(MatPaginator) paginator: MatPaginator | null=null;

  constructor(private mp: EmergenciaService, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
      this.mp.list().subscribe((data) => {
        this.datasource = new MatTableDataSource(data);
        this.datasource.paginator = this.paginator
      });
      this.mp.getList().subscribe((data) => {
        this.datasource = new MatTableDataSource(data);
        this.datasource.paginator = this.paginator
      });
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.datasource.paginator = this.paginator;
    }
  }

  delete(id: number) {
    this.mp.delete(id).subscribe(
      (data) => {
        console.log('Respuesta de eliminación', data);
        this.mp.list().subscribe((data) => {
          this.mp.setList(data);
          this.snackBar.open('Emergencia eliminada con éxito', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        });
      },
      (error) => {
        console.error('Error al eliminar emergencia:', error);
        this.snackBar.open('Hubo un error al eliminar la emergencia', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    );
  }
}
