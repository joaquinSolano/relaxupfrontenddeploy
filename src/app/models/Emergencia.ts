import { Usuario } from "./Usuario"

export class Emergencia{
    idEmergencia:number=0
    fechaEmergencia:Date=new Date(Date.now())
    horaEmergencia:number=0
    usuario:Usuario=new Usuario()
}