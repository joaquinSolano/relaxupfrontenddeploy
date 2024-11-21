import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { RutinaService } from '../../../services/rutina.service';
import { EjerciciorutinaService } from '../../../services/ejerciciorutina.service';
import { Rutina } from '../../../models/Rutina';
import { EjercicioRutina } from '../../../models/EjercicioRutina';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ejerciciorutina-registrar',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    NgIf,
  ],
  templateUrl: './ejerciciorutina-registrar.component.html',
  styleUrls: ['./ejerciciorutina-registrar.component.css'], 
})
export class EjerciciorutinaRegistrarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaRutina: Rutina[] = [];
  listaTítulos: string[] = []; 
  ejerciciorutina: EjercicioRutina = new EjercicioRutina();
  edicion: boolean = false;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private rutinaservice: RutinaService,
    private route: ActivatedRoute,
    private ejerciciorutinaservice: EjerciciorutinaService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id > 0;
      this.init();
    });

    
    this.ejerciciorutinaservice.list().subscribe((data) => {
      this.listaTítulos = data.map((item) => item.tituloEjercicioRutina.toLowerCase());
    });

    
    this.rutinaservice.list().subscribe((data) => {
      this.listaRutina = data;
    });

   
    this.form = this.formBuilder.group({
      idEjercicioRutinaa: [''],
      tituloEjercicioRutinaa: [
        '',
        [Validators.required, Validators.minLength(3), this.localDuplicateValidator()],
      ],
      descripcionEjercicioRutinaa: [
        '',
        [Validators.required, Validators.minLength(3)],
      ],
      RutinaEjercicioRutinaa: ['', Validators.required],
    });
  }

  insertar(): void {
    if (this.form.valid) {
      this.ejerciciorutina.idEjercicioRutina = this.form.value.idEjercicioRutinaa;
      this.ejerciciorutina.tituloEjercicioRutina = this.form.value.tituloEjercicioRutinaa;
      this.ejerciciorutina.descripcionEjercicioRutina = this.form.value.descripcionEjercicioRutinaa;
      this.ejerciciorutina.rutina.idRutina = this.form.value.RutinaEjercicioRutinaa;

      if (this.edicion) {
        this.ejerciciorutinaservice.update(this.ejerciciorutina).subscribe(
          () => {
            this.showSnackBar('Ejercicio actualizado con éxito');
            this.router.navigate(['ejerciciorutinas']);
          },
          (error) => this.handleError(error, 'Error al actualizar el ejercicio')
        );
      } else {
        this.ejerciciorutinaservice.insert(this.ejerciciorutina).subscribe(
          () => {
            this.showSnackBar('Ejercicio de rutina registrado con éxito');
            this.router.navigate(['ejerciciorutinas']);
          },
          (error) => this.handleError(error, 'Error al registrar el ejercicio de la rutina')
        );
      }
    } else {
      this.showSnackBar('Por favor, complete los campos requeridos');
    }
  }

  init() {
    if (this.edicion) {
      this.ejerciciorutinaservice.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          idEjercicioRutinaa: data.idEjercicioRutina,
          tituloEjercicioRutinaa: data.tituloEjercicioRutina,
          descripcionEjercicioRutinaa: data.descripcionEjercicioRutina,
          RutinaEjercicioRutinaa: data.rutina.idRutina,
        });
      });
    }
  }

 
  localDuplicateValidator(): (control: FormControl) => { [key: string]: any } | null {
    return (control: FormControl) => {
      if (!control.value) {
        return null; 
      }
      const title = control.value.toLowerCase();
      const isDuplicate = this.listaTítulos.includes(title);
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
