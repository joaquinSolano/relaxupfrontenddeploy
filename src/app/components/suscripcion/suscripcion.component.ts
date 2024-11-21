import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { SuscripcionListarComponent } from './suscripcion-listar/suscripcion-listar.component';

@Component({
  selector: 'app-suscripcion',
  standalone: true,
  imports: [RouterOutlet, SuscripcionListarComponent],
  templateUrl: './suscripcion.component.html',
  styleUrl: './suscripcion.component.css'
})
export class SuscripcionComponent {
  constructor(public route:ActivatedRoute) {}
}
