import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { EmergenciaListarComponent } from './emergencia-listar/emergencia-listar.component';

@Component({
  selector: 'app-emergencia',
  standalone: true,
  imports: [RouterOutlet, EmergenciaListarComponent],
  templateUrl: './emergencia.component.html',
  styleUrl: './emergencia.component.css'
})
export class EmergenciaComponent {
  constructor(public route:ActivatedRoute) {}
}
