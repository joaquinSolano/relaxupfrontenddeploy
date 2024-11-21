import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators,ReactiveFormsModule,FormsModule} from '@angular/forms';
import { Usuario } from '../../../models/Usuario';
import { Emergencia } from '../../../models/Emergencia';
import { UsuarioService } from '../../../services/usuario.service';
import { EmergenciaService } from '../../../services/emergencia.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-emergencia-registrar',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  templateUrl: './emergencia-registrar.component.html',
  styleUrl: './emergencia-registrar.component.css',
})
export class EmergenciaRegistrarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaUsuarios: Usuario[] = [];
  emergencia: Emergencia = new Emergencia();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuarioService,
    private mp: EmergenciaService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id > 0;
      this.init();
    });

    this.form = this.formBuilder.group({
      ecodigo: [''],
      efecha: ['', Validators.required],
      ehora: ['', Validators.required],
      eusuario: ['', Validators.required],
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.emergencia.idEmergencia = this.form.value.ecodigo;
      this.emergencia.fechaEmergencia = this.form.value.efecha;
      this.emergencia.horaEmergencia = this.form.value.ehora;
      this.emergencia.usuario.idUsuario = this.form.value.eusuario;

      if (this.edicion) {
        this.mp.update(this.emergencia).subscribe(
          () => {
            this.showSnackBar('Emergencia actualizada con éxito');
            this.router.navigate(['emergencias']);
          },
          (error) =>
            this.handleError(error, 'Error al actualizar la emergencia')
        );
      } else {
        this.mp.insert(this.emergencia).subscribe(
          () => {
            this.showSnackBar('Emergencia registrada con éxito');
            this.router.navigate(['emergencias']);
          },
          (error) => this.handleError(error, 'Error al registrar la emergencia')
        );
      }
    } else {
      this.showSnackBar('Porfavor, complete los campos requeridos');
    }
  }

  init() {
    if (this.edicion) {
      this.mp.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          ecodigo: data.idEmergencia,
          efecha: data.fechaEmergencia,
          ehora: data.horaEmergencia,
          eusuario: data.usuario.idUsuario,
        });
      });
    }
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  private handleError(error: any, userMessage: string) {
    console.error(userMessage, error);
    this.showSnackBar(userMessage);
  }
}
