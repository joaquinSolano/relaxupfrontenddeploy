import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Suscripciones } from '../../../models/Suscripciones';
import { SuscripcionesService } from '../../../services/suscripciones.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-suscripcion-listar',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatPaginatorModule],
  templateUrl: './suscripcion-listar.component.html',
  styleUrl: './suscripcion-listar.component.css'
})
export class SuscripcionListarComponent implements OnInit{
  datasource: MatTableDataSource<Suscripciones> = new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'c7',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private suS: SuscripcionesService, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.suS.list().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
      this.datasource.paginator = this.paginator

    });
    this.suS.getList().subscribe((data) => {
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
    this.suS.delete(id).subscribe((data) => {
      this.suS.list().subscribe((data) => {
        this.suS.setList(data);
      });
    });
    this.snackBar.open('Se eliminó de manera correcta', 'Cerrar', {
      duration: 5000,
    });
  }
}
