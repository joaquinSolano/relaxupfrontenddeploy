import { Foros } from "./Foros"
import { Usuario } from "./Usuario"
export class MensajesForos{
    idMensajesForos:number=0
    contenido:string=""
    fechaPublicacion:Date=new Date(Date.now())
    foros:Foros=new Foros()
    usuario:Usuario=new Usuario()
}