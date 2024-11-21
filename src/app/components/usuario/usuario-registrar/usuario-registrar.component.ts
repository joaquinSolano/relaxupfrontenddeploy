import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Rol } from '../../../models/Rol';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { RolserviceService } from '../../../services/rolservice.service';
import { NgIf } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuario-registrar',
  standalone: true,
  imports: [    
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    NgIf
],
  templateUrl: './usuario-registrar.component.html',
  styleUrl: './usuario-registrar.component.css'
})
export class UsuarioRegistrarComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  listaRoles: Rol[] = [];
  user: Usuario = new Usuario();
  edicion: boolean = false;
  id: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuarioService,
    private rS: RolserviceService,
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
      uid:[''],
      unombre: ['', [Validators.required,Validators.minLength(3)]],
      ucorreo: ['', [Validators.required,Validators.email]],
      utelefono: ['', [Validators.required,Validators.min(900000000),Validators.max(999999999),Validators.pattern(/^\d+$/)]],
      ucontrasena: ['', [Validators.required, Validators.minLength(8)]],
      uprogreso: ['', [Validators.required,Validators.min(0),Validators.max(100),Validators.pattern(/^\d+$/)]],
      urol: ['', Validators.required],
    });
    this.rS.list().subscribe((data) => {
      this.listaRoles = data;
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.user.idUsuario=this.form.value.uid;
      this.user.nombreUsuario = this.form.value.unombre;
      this.user.correoUsuario = this.form.value.ucorreo;
      this.user.telefonoUsuario = this.form.value.utelefono;
      this.user.contrasenaUsuario = this.form.value.ucontrasena;
      this.user.progresoUsuario = this.form.value.uprogreso;
      this.user.rol.idRol = this.form.value.urol;
      if (this.edicion) {
        this.uS.update(this.user).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          }); 
        });
      } else {
        this.uS.insert(this.user).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      }
      this.router.navigate(['usuarios']);
      this.snackBar.open('Se registro de manera exitosa', 'Cerrar', {
        duration: 3000,
      });
    } else {
      this.snackBar.open('Por favor, ingresa al menos 8 caracteres en nombre del rol.', 'Cerrar', {
        duration: 5000,
      });
    } 
  }
  init(){
    if(this.edicion){
      this.uS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          uid:new FormControl(data.idUsuario),
          unombre:new FormControl(data.nombreUsuario),
          ucorreo:new FormControl(data.correoUsuario),
          utelefono:new FormControl(data.telefonoUsuario),
          ucontrasena:new FormControl(data.contrasenaUsuario),
          uprogreso:new FormControl(data.progresoUsuario),
          urol:new FormControl(data.rol.idRol)
        })
      })
    }
  }
}