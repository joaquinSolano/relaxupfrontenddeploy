import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UsuarioRutina } from '../../../models/UsuarioRutina';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioRutinaService } from '../../../services/usuario-rutina.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgIf } from '@angular/common';
import { Rutina } from '../../../models/Rutina';
import { RutinaService } from '../../../services/rutina.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-usuariorutina-registrar',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    NgIf
  ],
  templateUrl: './usuariorutina-registrar.component.html',
  styleUrl: './usuariorutina-registrar.component.css'
})
export class UsuariorutinaRegistrarComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  listaUsuario: Usuario[] = [];
  listarutina: Rutina[]=[];
  usuariorutina: UsuarioRutina = new UsuarioRutina();
  edicion:boolean=false;
  id: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private usuarioservice: UsuarioService,
    private rutinaservice: RutinaService,
    private usuariorutinaservice: UsuarioRutinaService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] > 0;
      this.init();
    });
    this.form = this.formBuilder.group({
      IdUsuarioRutina: [''],
      FechaRealizacion: ['', Validators.required],
      Progreso: ['', [Validators.required,Validators.min(0),Validators.max(100),Validators.pattern(/^\d+$/)]],
      idUsuario: ['', Validators.required],
      idRutina:['', Validators.required],
    });
    this.usuarioservice.list().subscribe((data) => {
      this.listaUsuario = data;
    });
    this.rutinaservice.list().subscribe((data) => {
      this.listarutina = data;
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.usuariorutina.idusuariorutina = this.form.value.IdUsuarioRutina;
      this.usuariorutina.fecharealizacion = this.form.value.FechaRealizacion;
      this.usuariorutina.progreso = this.form.value.Progreso;
      this.usuariorutina.usuario.idUsuario = this.form.value.idUsuario;
      this.usuariorutina.rutina.idRutina=this.form.value.idRutina;
      if (this.edicion) {
        this.usuariorutinaservice.update(this.usuariorutina).subscribe((data) => {
          this.usuariorutinaservice.list().subscribe((data) => {
            this.usuariorutinaservice.setList(data);
          }); 
        });
      } else {
        this.usuariorutinaservice.insert(this.usuariorutina).subscribe((data) => {
          this.usuariorutinaservice.list().subscribe((data) => {
            this.usuariorutinaservice.setList(data);
          });
        });
      }
      this.router.navigate(['UsuarioRutina']);
      this.snackBar.open('Se registro de manera exitosa', 'Cerrar', {
        duration: 3000,
      });
    }
  }
  init(){
    if(this.edicion){
      this.usuariorutinaservice.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          IdUsuarioRutina:new FormControl(data.idusuariorutina),
          FechaRealizacion:new FormControl(data.fecharealizacion),
          Progreso:new FormControl(data.progreso),
          idUsuario:new FormControl(data.usuario.idUsuario),
          idRutina:new FormControl(data.rutina.idRutina),
        })
      })
    }
  }
}