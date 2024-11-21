import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Suscripciones } from '../models/Suscripciones';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class SuscripcionesService {
  private url = `${base_url}/suscripciones`;
  private listaCambio = new Subject<Suscripciones[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Suscripciones[]>(this.url);
  }
  insert(c: Suscripciones) {
    return this.http.post(this.url, c);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Suscripciones[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Suscripciones>(`${this.url}/${id}`);
  }
  update(ci: Suscripciones) {
    return this.http.put(this.url, ci);
  }
}