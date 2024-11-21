import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { TecnicasRelajacion } from '../models/TecnicasRelajacion';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class TecnicarelajacionService {

  private url=`${base_url}/tecnicasrelajacion`;
  private listacambio=new Subject<TecnicasRelajacion[]>();

  constructor(private http:HttpClient) {}
  list(){
    return this.http.get<TecnicasRelajacion[]>(this.url);
  }
  insert(tr:TecnicasRelajacion){
    return this.http.post(this.url,tr)
  }
  getList() {
    return this.listacambio.asObservable();
  }
  setList(listaNueva: TecnicasRelajacion[]) {
    this.listacambio.next(listaNueva);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id:number){
    return this.http.get<TecnicasRelajacion>(`${this.url}/${id}`);
  }
  update(tecnicasrelajacion:TecnicasRelajacion){
    return this.http.put(this.url,tecnicasrelajacion);
  }
}
