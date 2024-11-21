import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { UsuarioRutina } from '../models/UsuarioRutina';
import { HttpClient } from '@angular/common/http';
import { ProgresoCompletadoDTO } from '../models/ProgresoCompletadoDTO';

const base_url=environment.base;
@Injectable({
  providedIn: 'root'
})
export class UsuarioRutinaService {
  private url = `${base_url}/UsuarioRutina`;
  private listaCambio = new Subject<UsuarioRutina[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<UsuarioRutina[]>(this.url);
  }
  insert(ur: UsuarioRutina) {
    return this.http.post(this.url, ur);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: UsuarioRutina[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<UsuarioRutina>(`${this.url}/${id}`);
  }
  update(urr: UsuarioRutina) {
    return this.http.put(this.url, urr);
  }
  getprogreso():Observable<ProgresoCompletadoDTO[]>{
    return this.http.get<ProgresoCompletadoDTO[]>(`${this.url}/Progresocompletado`)
  }
}
