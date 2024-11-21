import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Rol } from '../models/Rol';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base;
@Injectable({
  providedIn: 'root'
})
export class RolserviceService {
  private url = `${base_url}/rol`;
  private listaCambio = new Subject<Rol[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Rol[]>(this.url);
  }
  insert(r: Rol) {
    return this.http.post(this.url, r);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Rol[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Rol>(`${this.url}/${id}`);
  }
  update(ro: Rol) {
    return this.http.put(this.url, ro);
  }
}
