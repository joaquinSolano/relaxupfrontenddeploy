import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuario } from '../../../models/Usuario';
import { MetodoPago } from '../../../models/MetodoPago';
import { MetodoPagoService } from '../../../services/metodo-pago.service';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-metodopago-registrar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './metodopago-registrar.component.html',
  styleUrls: ['./metodopago-registrar.component.css']
})
export class MetodopagoRegistrarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaUsuarios: Usuario[] = [];
  metodo: MetodoPago = new MetodoPago();
  id: number = 0;
  edicion: boolean = false;
  listaTipos: { value: string; viewValue: string }[] = [
    { value: 'Tarjeta', viewValue: 'Tarjeta' },
    { value: 'Paypal', viewValue: 'Paypal' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuarioService,
    private mp: MetodoPagoService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    // Obtener parámetros de la ruta y determinar si es edición
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id > 0;
      this.init();
    });

    // Inicializar formulario
    this.form = this.formBuilder.group({
      mpcodigo: [''],
      mptipopago: ['', Validators.required],
      mpusuario: ['', Validators.required],
    });

    // Obtener lista de usuarios
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }

  insertar(): void {
    // Verificar si el formulario es válido
    if (this.form.valid) {
      this.metodo.idMetodoPago = this.form.value.mpcodigo;
      this.metodo.tipoPago = this.form.value.mptipopago;
      this.metodo.usuario.idUsuario = this.form.value.mpusuario;

      if (this.edicion) {
        // Si es edición, actualizar método de pago
        this.mp.update(this.metodo).subscribe(
          () => {
            this.showSnackBar('Método de pago actualizado con éxito');
            this.router.navigate(['metodos']);
          },
          (error) => this.handleError(error, 'Error al actualizar el método de pago')
        );
      } else {
        // Si es creación, insertar nuevo método de pago
        this.mp.insert(this.metodo).subscribe(
          () => {
            this.showSnackBar('Método de pago registrado con éxito');
            this.router.navigate(['metodos']);
          },
          (error) => this.handleError(error, 'Error al registrar el método de pago')
        );
      }
    } else {
      // Si el formulario no es válido, mostrar mensaje de error
      this.showSnackBar('Por favor, complete los campos requeridos');
    }
  }

  init() {
    if (this.edicion) {
      // Si es edición, cargar datos del método de pago
      this.mp.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          mpcodigo: data.idMetodoPago,
          mptipopago: data.tipoPago,
          mpusuario: data.usuario.idUsuario,
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