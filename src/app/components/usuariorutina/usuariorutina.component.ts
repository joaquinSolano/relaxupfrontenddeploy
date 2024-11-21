import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { UsuariorutinaListarComponent } from "./usuariorutina-listar/usuariorutina-listar.component";

@Component({
  selector: 'app-usuariorutina',
  standalone: true,
  imports: [RouterOutlet, UsuariorutinaListarComponent],
  templateUrl: './usuariorutina.component.html',
  styleUrl: './usuariorutina.component.css'
})
export class UsuariorutinaComponent {
  constructor(public route:ActivatedRoute){}
}
