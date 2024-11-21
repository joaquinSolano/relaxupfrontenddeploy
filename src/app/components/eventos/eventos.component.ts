import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { EventosRegistrarComponent } from './eventos-registrar/eventos-registrar.component';
import { EventosListarComponent } from "./eventos-listar/eventos-listar.component";

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [RouterOutlet, EventosRegistrarComponent, EventosListarComponent],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent {
  constructor(public route:ActivatedRoute){}
}
