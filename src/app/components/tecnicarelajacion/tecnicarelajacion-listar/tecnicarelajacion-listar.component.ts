import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink, RouterModule } from '@angular/router';
import { TecnicasRelajacion } from '../../../models/TecnicasRelajacion';
import { TecnicarelajacionService } from '../../../services/tecnicarelajacion.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tecnicarelajacion-listar',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, RouterLink,MatPaginator],
  templateUrl: './tecnicarelajacion-listar.component.html',
  styleUrl: './tecnicarelajacion-listar.component.css',
})
export class TecnicarelajacionListarComponent implements OnInit {
  datasource: MatTableDataSource<TecnicasRelajacion> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'accion01', 'accion02'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tecnicarelajacionservice: TecnicarelajacionService,private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.tecnicarelajacionservice.list().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
      this.datasource.paginator = this.paginator
    });
    this.tecnicarelajacionservice.getList().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
      this.datasource.paginator = this.paginator
    });
  }
  delete(id: number) {
    this.tecnicarelajacionservice.delete(id).subscribe((data) => {
      this.tecnicarelajacionservice.list().subscribe((data) => {
        this.tecnicarelajacionservice.setList(data);
      });
    });
    this.snackBar.open('Se eliminó de manera correcta', 'Cerrar', {
      duration: 5000,
    });
  }
  }
