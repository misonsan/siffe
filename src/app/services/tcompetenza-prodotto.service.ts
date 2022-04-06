import { Injectable } from '@angular/core';
import { TcompetenzaProdotto } from '../classes/T_competenza_prodotto';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class TcompetenzaProdottoService {

  private rotta = '/tcompetnzaprodotto';
  private rottafunction = '';

  private APIURL = environment.APIURL + this.rotta;  // definisco l'url su cui effettuare la lettura sul server

  constructor(private http: HttpClient,
              private auth: AuthService) { }

 // attenzione: per ogni funzione che voglio usare DEVO passare il token per dimostrare che sono loggato

 getAuthHeader(): HttpHeaders   {
   // passo il token dentro a header per non farlo passare in chiaro su url

   const headers = new HttpHeaders(
       {
           Authorization: 'Bearer ' +  this.auth.getToken()
       }
     );
     return headers;
   }

  getAll():Observable<any> {

          return this.http.get(this.APIURL,  {
          headers: this.getAuthHeader()
        });      // ok      // ok

       }

  getbyId(id: number) {
         return this.http.get(this.APIURL + '/' + id,  {
          headers: this.getAuthHeader()
        });      // ok);
       }


      delete(competenza: TcompetenzaProdotto) {
        this.rottafunction = 'deletebyid';
        return this.http.delete(this.APIURL + '/' + this.rottafunction + '/' + competenza.id,  {
          headers: this.getAuthHeader()
        });      // ok);

       }

      update(competenza: TcompetenzaProdotto) {
        this.rottafunction = 'updatebyid';
        return this.http.put(this.APIURL + '/' + this.rottafunction + '/' + competenza.id, competenza,  {
            headers: this.getAuthHeader()
          });      // ok);
         }

      create(competenza: TcompetenzaProdotto){
        this.rottafunction = 'create';
        return this.http.post(this.APIURL + '/' + this.rottafunction, competenza,  {
          headers: this.getAuthHeader()
       });      // ok);
   }

   getlastid() {
    this.rottafunction = 'lastid';
    return this.http.get(this.APIURL + '/' + this.rottafunction ,  {
      headers: this.getAuthHeader()
    });      // ok      // ok
  }
}
