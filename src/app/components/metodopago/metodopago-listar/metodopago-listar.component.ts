import { Component, OnInit, ViewChild } from '@angular/core';
import { MetodoPago } from '../../../models/MetodoPago';
import { MetodoPagoService } from '../../../services/metodo-pago.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-metodopago-listar',
  standalone: true,
  imports: [
    MatTableModule, MatIconModule, RouterModule, MatPaginatorModule
  ],
  templateUrl: './metodopago-listar.component.html',
  styleUrl: './metodopago-listar.component.css'
})
export class MetodopagoListarComponent implements OnInit{

  datasource: MatTableDataSource<MetodoPago> = new MatTableDataSource();
  displayedColumns: string[] = ['ctt1','ctt2','ctt3','accion01', 'accion02'];

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private mp: MetodoPagoService, private snackBar: MatSnackBar) {}
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
        console.log('Respuesta de eliminación:', data);  // Agregar log para inspeccionar la respuesta
        this.mp.list().subscribe((data) => {
          this.mp.setList(data);
          this.snackBar.open('Metodo de pago eliminado con éxito', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        });
      },
      (error) => {
        console.error('Error al eliminar el plan:', error);  // Agregar log para inspeccionar el error
        this.snackBar.open('Hubo un error al eliminar el metodo de pago', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    );
  }
}
