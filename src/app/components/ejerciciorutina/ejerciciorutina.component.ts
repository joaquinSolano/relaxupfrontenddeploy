import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { UsuarioListarComponent } from '../usuario/usuario-listar/usuario-listar.component';
import { EjerciciorutinaListarComponent } from "./ejerciciorutina-listar/ejerciciorutina-listar.component";
@Component({
  selector: 'app-ejerciciorutina',
  standalone: true,
  imports: [RouterOutlet, UsuarioListarComponent, EjerciciorutinaListarComponent],
  templateUrl: './ejerciciorutina.component.html',
  styleUrl: './ejerciciorutina.component.css'
})
export class EjerciciorutinaComponent {
  constructor(public route:ActivatedRoute){}
}
