import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { MensajesForos } from '../../../models/MensajesForos';
import { Foros } from '../../../models/Foros';
import { Usuario } from '../../../models/Usuario';
import { MensajeforoService } from '../../../services/mensajeforo.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ForosService } from '../../../services/foros.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mensajeforo-registrar',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    NgIf,
  ],
  templateUrl: './mensajeforo-registrar.component.html',
  styleUrls: ['./mensajeforo-registrar.component.css'],
})
export class MensajeforoRegistrarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaForos: Foros[] = [];
  listaUsuario: Usuario[] = [];
  mensajesforos: MensajesForos = new MensajesForos();
  edicion: boolean = false;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private forosservice: ForosService,
    private usuarioservice: UsuarioService,
    private mensajeforoservice: MensajeforoService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id > 0;
      this.init();
    });

    this.form = this.formBuilder.group({
      idMensajesFoross: [''],
      contenido: ['', [Validators.required, Validators.minLength(3)]],
      FechaPublicacion: ['', Validators.required],
      mensajesforosforos: ['', Validators.required],
      mensajesforosusuarios: ['', Validators.required],
    });

    this.forosservice.list().subscribe((data) => {
      this.listaForos = data;
    });

    this.usuarioservice.list().subscribe((data) => {
      this.listaUsuario = data;
    });
  }

  insertar(): void {
    if (this.form.valid) {
      this.mensajesforos.idMensajesForos = this.form.value.idMensajesFoross;
      this.mensajesforos.contenido = this.form.value.contenido;
      this.mensajesforos.fechaPublicacion = this.form.value.FechaPublicacion;
      this.mensajesforos.foros.idForos = this.form.value.mensajesforosforos;
      this.mensajesforos.usuario.idUsuario =
        this.form.value.mensajesforosusuarios;

      if (this.edicion) {
        this.mensajeforoservice.update(this.mensajesforos).subscribe(
          () => {
            this.showSnackBar('Mensaje actualizado con éxito');
            this.router.navigate(['mensajeforos']);
          },
          (error) => this.handleError(error, 'Error al actualizar el mensaje')
        );
      } else {
        this.mensajeforoservice.insert(this.mensajesforos).subscribe(
          () => {
            this.showSnackBar('Mensaje registrado con éxito');
            this.router.navigate(['mensajeforos']);
          },
          (error) => this.handleError(error, 'Error al registrar el mensaje')
        );
      }
    } else {
      this.showSnackBar('Por favor, complete los campos requeridos');
    }
    this.router.navigate(['mensajeforos']);
  }

  init() {
    if (this.edicion) {
      this.mensajeforoservice.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          idMensajesFoross: data.idMensajesForos,
          contenido: data.contenido,
          FechaPublicacion: data.fechaPublicacion,
          mensajesforosforos: data.foros.idForos,
          mensajesforosusuarios: data.usuario.idUsuario,
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
