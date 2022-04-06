import { Injectable } from '@angular/core';
import { TTaglia } from '../classes/T_taglia';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class TtagliaService {

  private rotta = '/ttaglia';

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


      delete(taglia: TTaglia) {
         return this.http.delete(this.APIURL + '/' + taglia.id,  {
          headers: this.getAuthHeader()
        });      // ok);

       }

      update(taglia: TTaglia) {
           return this.http.put(this.APIURL + '/' + taglia.id, taglia,  {
            headers: this.getAuthHeader()
          });      // ok);
         }

      create(taglia: TTaglia){
     return this.http.post(this.APIURL, taglia,  {
      headers: this.getAuthHeader()
    });      // ok);
   }

}
