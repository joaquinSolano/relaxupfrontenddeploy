import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Eventos } from '../models/Eventos';
import { HttpClient } from '@angular/common/http';
import { CantidadConfirmaronDTO } from '../models/CantidadConfirmaronDTO';
const base_url=environment.base;
@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private url = `${base_url}/eventos`;
  private listaCambio = new Subject<Eventos[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Eventos[]>(this.url);
  }
  insert(e: Eventos) {
    return this.http.post(this.url, e);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Eventos[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Eventos>(`${this.url}/${id}`);
  }
  update(ev: Eventos) {
    return this.http.put(this.url, ev);
  }
  getCantidad():Observable<CantidadConfirmaronDTO[]>{
    return this.http.get<CantidadConfirmaronDTO[]>(`${this.url}/Confirmaron`)
  }
}
