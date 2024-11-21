import { MetodoPago } from "./MetodoPago"
import { Planes } from "./Planes"

export class Suscripciones{
    idSuscripcion:number=0
    fechaInicio:Date=new Date(Date.now())
    fechaFin:Date=new Date(Date.now())
    metodoPago:MetodoPago= new MetodoPago()
    planes:Planes=new Planes()
}