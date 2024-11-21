import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ForoListarComponent } from './foro-listar/foro-listar.component';

@Component({
  selector: 'app-foro',
  standalone: true,
  imports: [RouterOutlet, ForoListarComponent],
  templateUrl: './foro.component.html',
  styleUrl: './foro.component.css'
})
export class ForoComponent {
  constructor(public route:ActivatedRoute){}
}
