import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Foros } from '../models/Foros';
import { Observable, Subject } from 'rxjs';
import { CantidadForosByUsuariosDTO } from '../models/CantidadForosByUsuariosDTO';
import { CantidadMensajesForosDTO } from '../models/CantidadMensajesForosDTO';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})

export class ForosService {
  private url=`${base_url}/foross`;
  private listacambio=new Subject<Foros[]>();

  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Foros[]>(this.url);
  }
  insert(fo:Foros){
    return this.http.post(this.url,fo)
  }
  getList() {
    return this.listacambio.asObservable();
  }
  setList(listaNueva: Foros[]) {
    this.listacambio.next(listaNueva);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id:number){
    return this.http.get<Foros>(`${this.url}/${id}`);
  }
  update(foros:Foros){
    return this.http.put(this.url,foros);
  }

  getCantidadForos(): Observable<CantidadForosByUsuariosDTO[]> {
    return this.http.get<CantidadForosByUsuariosDTO[]>(
      `${this.url}/cantidadForos`
    );
  }
  getCantidadMensajeForos(): Observable<CantidadMensajesForosDTO[]> {
    return this.http.get<CantidadMensajesForosDTO[]>(
      `${this.url}/CantidadMensajes`
    );
  }
}
