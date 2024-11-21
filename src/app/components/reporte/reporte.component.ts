import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { ReporterutinaComponent } from './reporterutina/reporterutina.component';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [RouterOutlet,ReporterutinaComponent],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent {
  constructor(public route: ActivatedRoute) {}
}
