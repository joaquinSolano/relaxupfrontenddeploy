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
import { Usuario } from '../../../models/Usuario';
import { Foros } from '../../../models/Foros';
import { ForosService } from '../../../services/foros.service';
import { UsuarioService } from '../../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-foro-registrar',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    NgIf,
  ],
  templateUrl: './foro-registrar.component.html',
  styleUrls: ['./foro-registrar.component.css'],
})
export class ForoRegistrarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaUsuario: Usuario[] = [];
  listaTitulos: string[] = []; // Lista para validar títulos duplicados
  foros: Foros = new Foros();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private usuarioservice: UsuarioService,
    private forosservice: ForosService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Detecta si es edición
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id > 0;
      this.init();
    });

    // Carga los títulos existentes para la validación de duplicados
    this.forosservice.list().subscribe((data) => {
      this.listaTitulos = data.map((foro) => foro.titulo.toLowerCase());
    });

    // Configura el formulario con validadores
    this.form = this.formBuilder.group({
      IdForos: [''],
      Titulo: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          this.localDuplicateValidator(),
        ],
      ],
      IdUsuario: ['', Validators.required],
    });

    // Carga usuarios
    this.usuarioservice.list().subscribe((data) => {
      this.listaUsuario = data;
    });
  }

  insertar(): void {
    if (this.form.valid) {
      this.foros.idForos = this.form.value.IdForos;
      this.foros.titulo = this.form.value.Titulo;
      this.foros.usuario.idUsuario = this.form.value.IdUsuario;

      if (this.edicion) {
        this.forosservice.update(this.foros).subscribe(
          () => {
            this.showSnackBar('Foro actualizado con éxito');
            this.forosservice.list().subscribe((data) => {
              this.forosservice.setList(data);
            });
            this.router.navigate(['foross']);
          },
          (error) => this.handleError(error, 'Error al actualizar el foro')
        );
      } else {
        this.forosservice.insert(this.foros).subscribe(
          () => {
            this.showSnackBar('Foro registrado con éxito');
            this.forosservice.list().subscribe((data) => {
              this.forosservice.setList(data);
            });
          },
          (error) => this.handleError(error, 'Error al registrar el foro')
        );
      }
    } else {
      this.showSnackBar('Por favor, complete los campos requeridos');
    }
    this.router.navigate(['foross']);
  }

  init() {
    if (this.edicion) {
      this.forosservice.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          IdForos: data.idForos,
          Titulo: data.titulo,
          IdUsuario: data.usuario.idUsuario,
        });
      });
    }
  }

  // Validador personalizado para evitar títulos duplicados
  localDuplicateValidator(): (
    control: FormControl
  ) => { [key: string]: any } | null {
    return (control: FormControl) => {
      if (!control.value) {
        return null; // Si no hay valor, no valida nada
      }
      const title = control.value.toLowerCase();
      const isDuplicate = this.listaTitulos.includes(title);
      return isDuplicate ? { duplicateTitle: true } : null;
    };
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
