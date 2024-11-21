import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/Usuario';
import { Eventos } from '../../../models/Eventos';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { EventosService } from '../../../services/eventos.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgIf, Time } from '@angular/common';
@Component({
  selector: 'app-eventos-registrar',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatDatepicker,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatCheckboxModule,
    NgxMaterialTimepickerModule,
    NgIf
  ],
  templateUrl: './eventos-registrar.component.html',
  styleUrl: './eventos-registrar.component.css'
})
export class EventosRegistrarComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  listaUsuario: Usuario[] = [];
  Eventos: Eventos = new Eventos();
  edicion: boolean = false;
  id: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private usuarioservice: UsuarioService,
    private eventosservice: EventosService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] > 0;
      this.init();
    });
    this.form = this.formBuilder.group({
      IdEventos:[''],
      Titulo: ['',[Validators.required,Validators.minLength(8)]],
      Actividad: ['',[Validators.required,Validators.minLength(8)]],
      FechaInicio: ['', Validators.required],
      FechaFin: ['', Validators.required],
      Hora: ['', [Validators.required, Validators.pattern(/^\d{2}:\d{2}:\d{2}$/)]],
      Confirmacion: ['', Validators.required],
      IdUsuario: ['', Validators.required],
    });
    this.usuarioservice.list().subscribe((data) => {
      this.listaUsuario = data;
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.Eventos.ideventos = this.form.value.IdEventos;
      this.Eventos.titulo = this.form.value.Titulo;
      this.Eventos.actividad = this.form.value.Actividad;
      this.Eventos.fechaInicio = this.form.value.FechaInicio;
      this.Eventos.fechaFin = this.form.value.FechaFin;
      this.Eventos.hora = this.form.value.Hora;
      this.Eventos.confirmacion = this.form.value.Confirmacion;
      this.Eventos.usuario.idUsuario = this.form.value.IdUsuario;
      if (this.edicion) {
        this.eventosservice.update(this.Eventos).subscribe((data) => {
          this.eventosservice.list().subscribe((data) => {
            this.eventosservice.setList(data);
          }); 
        });
      } else {
        this.eventosservice.insert(this.Eventos).subscribe((data) => {
          this.eventosservice.list().subscribe((data) => {
            this.eventosservice.setList(data);
          });
        });
      }
      this.router.navigate(['eventos']);
      this.snackBar.open('Se registro de manera exitosa', 'Cerrar', {
        duration: 3000,
      });
    }
  }
  init(){
    if(this.edicion){
      this.eventosservice.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          IdEventos:new FormControl(data.ideventos),
          Titulo:new FormControl(data.titulo),
          Actividad:new FormControl(data.actividad),
          FechaInicio:new FormControl(data.fechaInicio),
          FechaFin:new FormControl(data.fechaFin),
          Hora:new FormControl(data.hora),
          Confirmacion:new FormControl(data.confirmacion),
          IdUsuario:new FormControl(data.usuario.idUsuario)
        })
      })
    }
  }
}