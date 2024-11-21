import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { PlanesmembresiaListarComponent } from './planesmembresia-listar/planesmembresia-listar.component';

@Component({
  selector: 'app-planesmembresia',
  standalone: true,
  imports: [RouterOutlet,PlanesmembresiaListarComponent],
  templateUrl: './planesmembresia.component.html',
  styleUrl: './planesmembresia.component.css'
})
export class PlanesmembresiaComponent {
  constructor(public route:ActivatedRoute) {}
}
