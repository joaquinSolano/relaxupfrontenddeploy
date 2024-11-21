import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { MensajeforoListarComponent } from './mensajeforo-listar/mensajeforo-listar.component';
@Component({
  selector: 'app-mensajeforo',
  standalone: true,
  imports: [RouterOutlet, MensajeforoListarComponent],
  templateUrl: './mensajeforo.component.html',
  styleUrl: './mensajeforo.component.css'
})
export class MensajeforoComponent {
  constructor(public route:ActivatedRoute){}
}
