import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { EjercicioRutina } from '../models/EjercicioRutina';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class EjerciciorutinaService {

  private url=`${base_url}/ejerciciorutinas`;
  private listacambio=new Subject<EjercicioRutina[]>();

  constructor(private http:HttpClient) {}
  list(){
    return this.http.get<EjercicioRutina[]>(this.url);
  }
  insert(er:EjercicioRutina){
    return this.http.post(this.url,er)
  }
  getList() {
    return this.listacambio.asObservable();
  }
  setList(listaNueva: EjercicioRutina[]) {
    this.listacambio.next(listaNueva);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id:number){
    return this.http.get<EjercicioRutina>(`${this.url}/${id}`);
  }
  update(ejerciciorutina:EjercicioRutina){
    return this.http.put(this.url,ejerciciorutina);
  }
  
}
