import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cars } from '../models/cars.model';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  readonly apiUrl = environment.BASE_URL;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
 constructor(private readonly _HTTP: HttpClient) { }

   getAllCar(): Observable<Cars[]> {
       return this._HTTP.get<Cars[]>(this.apiUrl + '/cars', {});
   }
   getCarById(idCars: string): Observable<any> {
       return this._HTTP.get(this.apiUrl + '/cars/?id=' + idCars);
   }
   saveCar(car: Cars): Observable<Cars> {
       return this._HTTP.post<Cars>(this.apiUrl + '/cars', car, this.httpOptions);
   }
   editCar(car: Cars): Observable<any> {

     return this._HTTP.put(this.apiUrl + '/cars' , car, this.httpOptions);
   }
   deleteCar(id: string): Observable<any> {
       return this._HTTP.delete(this.apiUrl + '/cars/' + id, this.httpOptions);
   }

}
