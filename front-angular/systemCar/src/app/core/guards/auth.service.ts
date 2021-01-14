import { Usuarios } from '../../models/usuarios.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import {CookieService} from "ngx-cookie-service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl: string;
  public currentUser: Observable<Usuarios>;

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  )
  {
  }

  public get currentUserValue(): Usuarios
  {
    return JSON.parse(this.cookieService.get("currentUser"));
  }

  isUserLoggedIn(): boolean
  {
    return this.cookieService.get("isLoggedIn") === "true";
  }


  login(url: string, formData: FormData)
  {
    return this.httpClient.post<Usuarios>(url, formData)
               .pipe(
                 map((user) =>
                 {
                   // login successful if there's a Spring Session token in the response
                   if (user && user.token)
                   {
                     // store user details and Spring Session token as cookies
                     this.cookieService.set("currentUser", JSON.stringify(user));
                     this.cookieService.set("jwtToken", user.token);
                     this.cookieService.set("isLoggedIn", "true");
                   }
                   return user;
                 })
               );
  }

  logout()
  {
    this.cookieService.deleteAll();
  }

}