import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { MensajesForos } from '../models/MensajesForos';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class MensajeforoService {

  private url=`${base_url}/mensajeforos`;
  private listacambio=new Subject<MensajesForos[]>();

  constructor(private http:HttpClient) {}
  list(){
    return this.http.get<MensajesForos[]>(this.url);
  }
  insert(mf:MensajesForos){
    return this.http.post(this.url,mf)
  }
  getList() {
    return this.listacambio.asObservable();
  }
  setList(listaNueva: MensajesForos[]) {
    this.listacambio.next(listaNueva);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id:number){
    return this.http.get<MensajesForos>(`${this.url}/${id}`);
  }
  update(mensajesforos:MensajesForos){
    return this.http.put(this.url,mensajesforos);
  }
}
