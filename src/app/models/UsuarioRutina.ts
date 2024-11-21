import { Usuario } from "./Usuario"
import { Rutina } from "./Rutina"
export class  UsuarioRutina{
    idusuariorutina:number=0
    fecharealizacion:Date=new Date(Date.now())
    progreso:number=0
    usuario:Usuario=new Usuario()
    rutina:Rutina=new Rutina()
}