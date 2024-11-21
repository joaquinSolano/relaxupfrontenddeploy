import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { UsuarioListarComponent } from "./usuario-listar/usuario-listar.component";

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [RouterOutlet, UsuarioListarComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
constructor(public route:ActivatedRoute){}
}