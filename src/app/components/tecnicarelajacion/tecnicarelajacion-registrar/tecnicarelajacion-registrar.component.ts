import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TecnicasRelajacion } from '../../../models/TecnicasRelajacion';
import { TecnicarelajacionService } from '../../../services/tecnicarelajacion.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-tecnicarelajacion-registrar',
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
  templateUrl: './tecnicarelajacion-registrar.component.html',
  styleUrl: './tecnicarelajacion-registrar.component.css',
})
export class TecnicarelajacionRegistrarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  tecnicaRelajacion: TecnicasRelajacion = new TecnicasRelajacion();
  id: number = 0;
  edicion: boolean = false;

  listaNombres: { value: string; viewValue: string} [] = [
    { value: 'Meditación', viewValue: 'Meditación'},
    { value: 'Relajación muscular', viewValue: 'Relajación muscular'},
    { value: 'Yoga', viewValue: 'Yoga'},
    { value: 'Ejercicios progresivos', viewValue: 'Ejercicios progresivos'},
    { value: 'Respiración profunda', viewValue: 'Respiración profunda'}
  ];
  
  constructor(
    private tecnicarelajacionservice: TecnicarelajacionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] > 0;
      this.init();
    });

    this.form = this.formBuilder.group({
      tid: [''],
      tnombre: ['', Validators.required],
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.tecnicaRelajacion.idTecnicaRelajacion = this.form.value.tid;
      this.tecnicaRelajacion.nombreTecnica = this.form.value.tnombre;
      if (this.edicion) {
        this.tecnicarelajacionservice.update(this.tecnicaRelajacion).subscribe((data) => {
            this.tecnicarelajacionservice.list().subscribe((data) => {
              this.tecnicarelajacionservice.setList(data);
            });
          });
      } else {
        this.tecnicarelajacionservice.insert(this.tecnicaRelajacion).subscribe((data) => {
          this.tecnicarelajacionservice.list().subscribe((data) => {
            this.tecnicarelajacionservice.setList(data);
          });
        });
      }
    }
    this.router.navigate(['tecnicasrelajacion']);
  }
  init() {
    if (this.edicion) {
      this.tecnicarelajacionservice.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          tid: new FormControl(data.idTecnicaRelajacion),
          tnombre: new FormControl(data.nombreTecnica),
        });
      });
    }
  }
}
