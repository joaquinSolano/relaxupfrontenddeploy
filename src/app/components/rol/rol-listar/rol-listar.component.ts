import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink, RouterModule } from '@angular/router';
import { Rol } from '../../../models/Rol';
import { RolserviceService } from '../../../services/rolservice.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-rol-listar',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule,RouterLink,MatSnackBarModule,MatPaginator],
  templateUrl: './rol-listar.component.html',
  styleUrl: './rol-listar.component.css'
})
export class RolListarComponent implements OnInit{
  datasource:MatTableDataSource<Rol>=new MatTableDataSource();
  displayedColumns:string[]=['c1','c2','accion01','accion02']
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private rolservice:RolserviceService,     
    private snackBar: MatSnackBar){}
  ngOnInit(): void {
      this.rolservice.list().subscribe(data=>{
        this.datasource=new MatTableDataSource(data)
        this.datasource.paginator = this.paginator
      })
      this.rolservice.getList().subscribe(data=>{
        this.datasource=new MatTableDataSource(data)
        this.datasource.paginator = this.paginator
      })
  }
  delete(id: number) {
    this.rolservice.delete(id).subscribe((data) => {
        this.rolservice.list().subscribe((data) => {
          this.rolservice.setList(data);
        });
        this.snackBar.open('Se eliminó de manera correcta', 'Cerrar', {
          duration: 5000,
        });
      },(error) => {
        this.snackBar.open('No se puede eliminar, ya que el rol esta vinculado a un usuario', 'Cerrar', {
          duration: 5000,
        });
      }
    );
  }
  
}
