import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { RutinaListarComponent } from './rutina-listar/rutina-listar.component';
@Component({
  selector: 'app-rutina',
  standalone: true,
  imports: [RouterOutlet, RutinaListarComponent],
  templateUrl: './rutina.component.html',
  styleUrl: './rutina.component.css'
})
export class RutinaComponent {
  constructor(public route:ActivatedRoute){}
}
