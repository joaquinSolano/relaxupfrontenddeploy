import { Time } from "@angular/common"
import { Usuario } from './Usuario';
import { TimeFormatterPipe } from "ngx-material-timepicker/src/app/material-timepicker/pipes/time-formatter.pipe";
import { time } from "console";

export class Eventos{
    ideventos:number=0
    titulo:string=""
    actividad:string=""
    fechaInicio:Date=new Date(Date.now()) 
    fechaFin:Date=new Date(Date.now())
    hora: string=""
    confirmacion:boolean=false
    usuario:Usuario=new Usuario()
}