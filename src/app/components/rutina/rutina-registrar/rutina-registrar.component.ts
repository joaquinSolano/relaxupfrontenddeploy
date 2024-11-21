import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgIf } from '@angular/common'; 
import { RutinaService } from '../../../services/rutina.service';
import { TecnicarelajacionService } from '../../../services/tecnicarelajacion.service';
import { TecnicasRelajacion } from '../../../models/TecnicasRelajacion';
import { Rutina } from '../../../models/Rutina';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rutina-registrar',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    NgIf,
  ],
  templateUrl: './rutina-registrar.component.html',
  styleUrls: ['./rutina-registrar.component.css'],
})
export class RutinaRegistrarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaTecnicasRelajacion: TecnicasRelajacion[] = [];
  listaNombresRutinas: string[] = [];
  rutina: Rutina = new Rutina();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private tecnicasrelajacionservice: TecnicarelajacionService,
    private rutinaservice: RutinaService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id > 0;
      this.init();
    });

    this.rutinaservice.list().subscribe((data) => {
      this.listaNombresRutinas = data.map((rutina) => rutina.nombreRutina.toLowerCase());
    });

    this.form = this.formBuilder.group({
      IdRutina: [''],
      nombreRutina: [
        '',
        [Validators.required, Validators.minLength(3), this.localDuplicateValidator()],
      ],
      descripcionRutina: [
        '',
        [Validators.required, Validators.minLength(3)],
      ],
      duracionRutina: ['', Validators.required],
      TecnicaRelajacionRutina: ['', Validators.required],
    });

    this.tecnicasrelajacionservice.list().subscribe((data) => {
      this.listaTecnicasRelajacion = data;
    });
  }

  insertar(): void {
    if (this.form.valid) {
      this.rutina.idRutina = this.form.value.IdRutina;
      this.rutina.nombreRutina = this.form.value.nombreRutina;
      this.rutina.descripcionRutina = this.form.value.descripcionRutina;
      this.rutina.duracionRutina = this.form.value.duracionRutina;
      this.rutina.tecnicasRelajacion.idTecnicaRelajacion = this.form.value.TecnicaRelajacionRutina;

      if (this.edicion) {
        this.rutinaservice.update(this.rutina).subscribe(
          () => {
            this.showSnackBar('Rutina actualizada con éxito');
            this.router.navigate(['rutina']);
          },
          (error) => this.handleError(error, 'Error al actualizar la rutina')
        );
      } else {
        this.rutinaservice.insert(this.rutina).subscribe(
          () => {
            this.showSnackBar('Rutina registrada con éxito');
            this.router.navigate(['rutina']);
          },
          (error) => this.handleError(error, 'Error al registrar la rutina')
        );
      }
    } else {
      this.showSnackBar('Por favor, complete los campos requeridos');
    }
  }

  init() {
    if (this.edicion) {
      this.rutinaservice.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          IdRutina: data.idRutina,
          nombreRutina: data.nombreRutina,
          descripcionRutina: data.descripcionRutina,
          duracionRutina: data.duracionRutina,
          TecnicaRelajacionRutina: data.tecnicasRelajacion.idTecnicaRelajacion,
        });
      });
    }
  }

  localDuplicateValidator(): (control: FormControl) => { [key: string]: any } | null {
    return (control: FormControl) => {
      if (!control.value) {
        return null; 
      }
      const name = control.value.toLowerCase();
      const isDuplicate = this.listaNombresRutinas.includes(name);
      return isDuplicate ? { duplicateName: true } : null;
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
