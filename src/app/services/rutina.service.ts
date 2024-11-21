import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Rutina } from '../models/Rutina';
import { Observable, Subject } from 'rxjs';
import { CantidadRutinasByTecnicasRelajacionDTO} from '../models/CantidadRutinasByTecnicasRelajacionDTO';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class RutinaService {

  private url=`${base_url}/rutina`;
  private listacambio=new Subject<Rutina[]>();

  constructor(private http:HttpClient) {}
  list(){
    return this.http.get<Rutina[]>(this.url);
  }
  insert(ru:Rutina){
    return this.http.post(this.url,ru)
  }
  getList() {
    return this.listacambio.asObservable();
  }
  setList(listaNueva: Rutina[]) {
    this.listacambio.next(listaNueva);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id:number){
    return this.http.get<Rutina>(`${this.url}/${id}`);
  }
  update(Rutina:Rutina){
    return this.http.put(this.url,Rutina);
  }
  getCantidad(): Observable<CantidadRutinasByTecnicasRelajacionDTO[]> {
    return this.http.get<CantidadRutinasByTecnicasRelajacionDTO[]>(
      `${this.url}/cantidadRutinas`
    );
  }
}