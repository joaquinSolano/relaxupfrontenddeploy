import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { TecnicarelajacionListarComponent } from "./tecnicarelajacion-listar/tecnicarelajacion-listar.component";

@Component({
  selector: 'app-tecnicarelajacion',
  standalone: true,
  imports: [RouterOutlet, TecnicarelajacionListarComponent],
  templateUrl: './tecnicarelajacion.component.html',
  styleUrl: './tecnicarelajacion.component.css'
})
export class TecnicarelajacionComponent {
  constructor(public route:ActivatedRoute) {}
}
