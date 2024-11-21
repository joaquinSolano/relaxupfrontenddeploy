import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Emergencia } from '../models/Emergencia';
import { HttpClient } from '@angular/common/http';
import { CantidadEmergenciasByUsuariosDTO } from '../models/CantidadEmergenciasByUsuariosDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class EmergenciaService {
  private url = `${base_url}/emergencias`;
  private listaCambio = new Subject<Emergencia[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Emergencia[]>(this.url);
  }
  insert(e: Emergencia) {
    return this.http.post(this.url, e);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Emergencia[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Emergencia>(`${this.url}/${id}`);
  }
  update(em: Emergencia) {
    return this.http.put(this.url, em);
  }
  getCantidad(): Observable<CantidadEmergenciasByUsuariosDTO[]> {
    return this.http.get<CantidadEmergenciasByUsuariosDTO[]>(
      `${this.url}/cantidadEmergencias`
    );
  }
}
