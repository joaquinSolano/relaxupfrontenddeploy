import { Rol } from "./Rol"
export class Usuario{
    idUsuario:number=0
    nombreUsuario:string=""
    correoUsuario:string=""
    telefonoUsuario:number=0
    contrasenaUsuario:string=""
    progresoUsuario:number=0
    rol:Rol=new Rol()
}