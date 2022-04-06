import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Modulo } from '../classes/Modulo';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {

  private rotta = '/modulis';

  private rottafunction = '';

  constructor(private http: HttpClient,
              private auth: AuthService) { }

  // connessione tra backend e frontend

  apiUrl = environment.APIURL + this.rotta;

  modulo: Modulo;

getAuthHeader(): HttpHeaders {
  const headers = new HttpHeaders(
    {
      Authorization : 'Bearer ' + this.auth.getToken()
    }
  );
  return headers;
}

// lettura tutti i moduli
  getAlls():Observable<any> {
    return this.http.get(`${this.apiUrl}`, {
      headers: this.getAuthHeader()
    });
  }

  // inserimento nuovo modulo
   createNew(data:any):Observable<any>{
    this.rottafunction = 'create';
    return this.http.post(this.apiUrl + '/' + this.rottafunction, data, {
      headers: this.getAuthHeader()
    });
  }

  // cancellazione utente
   delete(id:any):Observable<any>  {
    this.rottafunction = "deletebyid";
  //  console.log('cancellazione Utente: ' + id);
    return this.http.delete(this.apiUrl + '/' + this.rottafunction + '/' + id, {
      headers: this.getAuthHeader()
    });
  }

  update(data:any,id:number):Observable<any> {
    this.rottafunction = "updatebyid";
    console.log(`aggiornamento rotta ${id} `);
    return this.http.put(`${this.apiUrl}/${this.rottafunction}/${id}`, data, {
      headers: this.getAuthHeader()
    });
  }

  getbyId(id:number):Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeader()
    });
  }

  getlastId():Observable<any> {
    const id = 9999;
    this.rottafunction = "lastid";
    return this.http.get(this.apiUrl + '/' + this.rottafunction + '/' + id, {
      headers: this.getAuthHeader()
    });
  }

}
