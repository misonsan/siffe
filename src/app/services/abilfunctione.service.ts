import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Abilfunctione } from '../classes/Abilfunctione';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AbilfunctioneService {

  private rotta = '/abilfunctione';

  private rottafunction = '';

  constructor(private http: HttpClient,
              private auth: AuthService) { }

  // connessione tra backend e frontend

  apiUrl = environment.APIURL + this.rotta;

  abilfunctione: Abilfunctione;
  // lettura tutti gli utenti


// non so dove usarlo nelle chiamate http
getAuthHeader(): HttpHeaders {
  const headers = new HttpHeaders(
    {
      Authorization : 'Bearer ' + this.auth.getToken()
    }
  );
  return headers;
}





  getAlls():Observable<any> {
    return this.http.get(`${this.apiUrl}`, {
      headers: this.getAuthHeader()
    });
  }

  // inserimento nuovo utente
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
    console.log(`aggiornamento richiesta abilitazione ${id} `);
    return this.http.put(`${this.apiUrl}/${this.rottafunction}/${id}`, data, {
      headers: this.getAuthHeader()
    });
  }

  getAbilbyId(id:number):Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeader()
    });
  }

  getAbilbylevel(level:number):Observable<any> {
    return this.http.get(`${this.apiUrl}/${level}/level`, {
      headers: this.getAuthHeader()
    });
  }

  getFunctionbylevel(level:number, rotta: string):Observable<any> {
    return this.http.get(`${this.apiUrl}/${level}/route/${rotta}`, {
      headers: this.getAuthHeader()
    });
  }

}

