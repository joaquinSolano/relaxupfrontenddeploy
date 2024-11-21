import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MetodoPago } from '../models/MetodoPago';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {
  private url = `${base_url}/metodos`;
  private listaCambio = new Subject<MetodoPago[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<MetodoPago[]>(this.url);
  }
  insert(c: MetodoPago) {
    return this.http.post(this.url, c);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: MetodoPago[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<MetodoPago>(`${this.url}/${id}`);
  }
  update(ci: MetodoPago) {
    return this.http.put(this.url, ci);
  }
}
