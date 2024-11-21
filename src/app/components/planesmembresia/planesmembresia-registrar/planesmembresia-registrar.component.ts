import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Planes } from '../../../models/Planes';
import { PlanesService } from '../../../services/planes.service';
import { MatSnackBar } from '@angular/material/snack-bar';  // Importar MatSnackBar

@Component({
  selector: 'app-planesmembresia-registrar',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './planesmembresia-registrar.component.html',
  styleUrls: ['./planesmembresia-registrar.component.css']
})
export class PlanesmembresiaRegistrarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  plan: Planes = new Planes();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private cS: PlanesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar  // Inyectar MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] > 0;
      this.init();
    });

    this.form = this.formBuilder.group({
      plancodigo: [''],
      plannombre: ['', Validators.required],
      plandescripcion: ['', Validators.required],
      planprecio: [
        '',
        [
          Validators.required,
          Validators.min(0),  // Validación de precio mayor o igual a 0
          Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$') // Asegura que sea un número decimal válido
        ]
      ],
    });
  }

  insertar(): void {
    if (this.form.valid) {
      this.plan.idPlan = this.form.value.plancodigo;
      this.plan.nombrePlan = this.form.value.plannombre;
      this.plan.descripcion = this.form.value.plandescripcion;
      this.plan.precio = this.form.value.planprecio;

      if (this.edicion) {
        // Actualizar plan
        this.cS.update(this.plan).subscribe(
          (data) => {
            this.cS.list().subscribe((data) => {
              this.cS.setList(data);
            });
            this.snackBar.open('Plan actualizado con éxito', 'Cerrar', {
              duration: 3000, // Duración del mensaje
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
          },
          (error) => {
            this.snackBar.open('Error al actualizar el plan', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
          }
        );
      } else {
        // Insertar plan
        this.cS.insert(this.plan).subscribe(
          (data) => {
            this.cS.list().subscribe((data) => {
              this.cS.setList(data);
            });
            this.snackBar.open('Plan registrado con éxito', 'Cerrar', {
              duration: 3000, // Duración del mensaje
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
          },
          (error) => {
            this.snackBar.open('Error al registrar el plan', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
          }
        );
      }
    } else {
      // Validación fallida, mostrar mensaje en snackbar
      if (this.form.get('planprecio')?.hasError('min')) {
        this.snackBar.open('El precio debe ser mayor o igual a 0', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
      if (this.form.get('planprecio')?.hasError('pattern')) {
        this.snackBar.open('El precio debe ser un número válido', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    }

    this.router.navigate(['planes']);
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          plancodigo: new FormControl(data.idPlan),
          plannombre: new FormControl(data.nombrePlan),
          plandescripcion: new FormControl(data.descripcion),
          planprecio: new FormControl(data.precio),
        });
      });
    }
  }
}