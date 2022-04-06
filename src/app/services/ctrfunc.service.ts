import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Abilfunctione } from '../classes/Abilfunctione';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CtrfuncService {

  private rotta = '/ctrfunc';

  private rottafunction = '';


constructor(private http: HttpClient,
            private auth: AuthService) {

            }



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

  getfuncbyProfilo(idprofilo: number, modulo: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${idprofilo}/${modulo}`, {
      headers: this.getAuthHeader()
    });
  }


checkFunctionbylevelDetail(rottaurl: string, level: number, functionUrl: string) {

      return this.http.get(`${this.apiUrl}/${level}/${rottaurl}/${functionUrl}`, {
      headers: this.getAuthHeader()
    });



  }






}
