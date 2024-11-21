import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { MetodopagoListarComponent } from './metodopago-listar/metodopago-listar.component';

@Component({
  selector: 'app-metodopago',
  standalone: true,
  imports: [RouterOutlet, MetodopagoListarComponent],
  templateUrl: './metodopago.component.html',
  styleUrl: './metodopago.component.css'
})
export class MetodopagoComponent {
  constructor(public route:ActivatedRoute) {}
}
