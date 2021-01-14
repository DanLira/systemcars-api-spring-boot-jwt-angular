import { Usuarios } from './../models/usuarios.model';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  readonly apiUrl = environment.BASE_URL;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
 constructor(private readonly _HTTP: HttpClient) { }


   getAllUsuario(): Observable<Usuarios[]> {
       return this._HTTP.get<Usuarios[]>(this.apiUrl + '/users', {});
   }
   getUsuarioById(idUsuarios: string): Observable<any> {
       return this._HTTP.get(this.apiUrl + '/users/?id=' + idUsuarios);
   }
   saveUsuario(usuario: Usuarios): Observable<Usuarios> {
       return this._HTTP.post<Usuarios>(this.apiUrl + '/users', usuario, this.httpOptions);
   }
   editUsuario(usuario: Usuarios): Observable<any> {

     return this._HTTP.put(this.apiUrl + '/users' , usuario, this.httpOptions);
   }
   deleteUsuario(id: string): Observable<any> {
       return this._HTTP.delete(this.apiUrl + '/users/' + id, this.httpOptions);
   }

}
