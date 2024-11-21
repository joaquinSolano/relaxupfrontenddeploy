import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Planes } from '../models/Planes';
import { Observable, Subject } from 'rxjs';
import { TotalSuscripcionesbyPlanDTO } from '../models/TotalSuscripcionesbyPlanDTO';
import { TotalIngresosbyPlanDTO } from '../models/TotalIngresosbyPlanDTO';


const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class PlanesService {
  private url = `${base_url}/planes`;
  private listaCambio = new Subject<Planes[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Planes[]>(this.url);
  }
  insert(c: Planes) {
    return this.http.post(this.url, c);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Planes[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Planes>(`${this.url}/${id}`);
  }
  update(ci: Planes) {
    return this.http.put(this.url, ci);
  }

  getCantidad(): Observable<TotalSuscripcionesbyPlanDTO[]> {
    return this.http.get<TotalSuscripcionesbyPlanDTO[]>(
      `${this.url}/cantidades`
    );
  }
  getSuma(): Observable<TotalIngresosbyPlanDTO[]> {
    return this.http.get<TotalIngresosbyPlanDTO[]>(`${this.url}/ingresos`);
  }
}