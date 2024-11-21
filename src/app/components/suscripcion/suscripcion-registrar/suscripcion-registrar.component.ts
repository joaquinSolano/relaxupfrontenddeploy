import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Planes } from '../../../models/Planes';
import { MetodoPago } from '../../../models/MetodoPago';
import { Suscripciones } from '../../../models/Suscripciones';
import { MetodoPagoService } from '../../../services/metodo-pago.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlanesService } from '../../../services/planes.service';
import { SuscripcionesService } from '../../../services/suscripciones.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-suscripcion-registrar',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './suscripcion-registrar.component.html',
  styleUrls: ['./suscripcion-registrar.component.css']
})
export class SuscripcionRegistrarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaMPagos: MetodoPago[] = [];
  listaPlanes: Planes[] = [];
  suscrip: Suscripciones = new Suscripciones();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private pS: PlanesService,
    private mp: MetodoPagoService,
    private Ss: SuscripcionesService,
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
      scodigo: [''],
      sfechaInicio: ['', Validators.required],
      sfechaFin: ['', Validators.required],
      smetodoPago: ['', Validators.required],
      splanes: ['', Validators.required],
    });

    // Obtener listas de métodos de pago y planes
    this.mp.list().subscribe((data) => {
      this.listaMPagos = data;
    });

    this.pS.list().subscribe((data) => {
      this.listaPlanes = data;
    });
  }

  insertar(): void {
    // Verificar si el formulario es válido
    if (this.form.valid) {
      this.suscrip.idSuscripcion = this.form.value.scodigo;
      this.suscrip.fechaInicio = this.form.value.sfechaInicio;
      this.suscrip.fechaFin = this.form.value.sfechaFin;
      this.suscrip.metodoPago.idMetodoPago = this.form.value.smetodoPago;
      this.suscrip.planes.idPlan = this.form.value.splanes;

      if (this.edicion) {
        // Si es edición, actualizar suscripción
        this.Ss.update(this.suscrip).subscribe(
          () => {
            this.showSnackBar('Suscripción actualizada con éxito');
            this.router.navigate(['suscripciones']);
          },
          (error) => this.handleError(error, 'Error al actualizar la suscripción')
        );
      } else {
        // Si es creación, insertar nueva suscripción
        this.Ss.insert(this.suscrip).subscribe(
          () => {
            this.showSnackBar('Suscripción registrada con éxito');
            this.router.navigate(['suscripciones']);
          },
          (error) => this.handleError(error, 'Error al registrar la suscripción')
        );
      }
    } else {
      // Si el formulario no es válido, mostrar mensaje de error
      this.showSnackBar('Por favor, complete los campos requeridos');
    }
  }

  init() {
    if (this.edicion) {
      // Si es edición, cargar datos de la suscripción
      this.Ss.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          scodigo: data.idSuscripcion,
          sfechaInicio: data.fechaInicio,
          sfechaFin: data.fechaFin,
          smetodoPago: data.metodoPago.idMetodoPago,
          splanes: data.planes.idPlan,
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
