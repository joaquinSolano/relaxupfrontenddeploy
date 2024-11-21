import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { Usuario } from '../models/Usuario';
import { Rol } from '../models/Rol';
import { useAnimation } from '@angular/animations';
import { userInfo } from 'os';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
  
export class UsuarioService {
  private url=`${base_url}/usuarios`;
  private listacambio=new Subject<Usuario[]>();

  constructor(private http:HttpClient) {}
list() {
  const token = sessionStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.get(this.url, { headers }).pipe(
    catchError(error => {
      console.error('Error al obtener usuarios:', error);
      return throwError(error);
    })
  );
}
  insert(us:Usuario){
    return this.http.post(this.url,us)
  }
  getList() {
    return this.listacambio.asObservable();
  }
  setList(listaNueva: Usuario[]) {
    this.listacambio.next(listaNueva);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id:number){
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }
  update(usuario:Usuario){
    return this.http.put(this.url,usuario);
  }
}
