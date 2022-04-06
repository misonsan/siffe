import { Injectable } from '@angular/core';
import { Truoloday } from '../classes/T_ruolo_day';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TruoloDayService {

  private rotta = '/truoloday';

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

   // ritorniamo un observoble - il subscribe devo farlo su users.component.ts

   // la chiamata la faccio solo se ho il token per abilitare la lettura solo a uteti loggati

       // primo metodo passando il token in chiaro su url
       //  return this.http.get(this.APIURL + '?token=' + this.auth.getToken());       // <---- 1° metodo  in chiaro su url

       // secondo metodo passando il token non in chiaro come header                   // <---- 2* metodo come header (non in chiaro)
        return this.http.get(this.APIURL,  {
          headers: this.getAuthHeader()
        });      // ok      // ok

       }

  getbyId(id: number) {
         return this.http.get(this.APIURL + '/' + id,  {
          headers: this.getAuthHeader()
        });      // ok);
       }


      delete(ruoloday: Truoloday) {
         return this.http.delete(this.APIURL + '/' + ruoloday.id,  {
          headers: this.getAuthHeader()
        });      // ok);

       }

      update(ruoloday: Truoloday) {
           return this.http.put(this.APIURL + '/' + ruoloday.id, ruoloday,  {
            headers: this.getAuthHeader()
          });      // ok);
         }

      create(ruoloday: Truoloday){
     return this.http.post(this.APIURL, ruoloday,  {
      headers: this.getAuthHeader()
    });      // ok);
   }

/*    versione con authHeader

 getRuoli() {

   // ritorniamo un observoble - il subscribe devo farlo su users.component.ts

   // la chiamata la faccio solo se ho il token per abilitare la lettura solo a uteti loggati

       // primo metodo passando il token in chiaro su url
       //  return this.http.get(this.APIURL + '?token=' + this.auth.getToken());       // <---- 1° metodo  in chiaro su url

       // secondo metodo passando il token non in chiaro come header                   // <---- 2* metodo come header (non in chiaro)
        return this.http.get(this.APIURL,  {
         headers: this.getAuthHeader()
       });      // ok

       }

       getRuolo(id: number) {
         return this.http.get(this.APIURL + '/' + id,  {
           headers: this.getAuthHeader()
         });
       }


       deleteRuolo(ruolo: Truolo) {
         return this.http.delete(this.APIURL + '/' + ruolo.id,  {
           headers: this.getAuthHeader()
         });

       }

   updateRuolo(ruolo: Truolo) {

     // imposto il metodo put pervhè laravel non gestisce e devo utilizzare il post per camuffare
     //
     //   return this.http.patch(this.APIURL + '/' + user.id,user);
     ruolo['_method'] = 'PUT';

     return this.http.patch(this.APIURL + '/' + ruolo.id, ruolo,  {
       headers: this.getAuthHeader()
     });

   }

    createRuolo(ruolo: Truolo){
     return this.http.post(this.APIURL, ruolo,  {
       headers: this.getAuthHeader()
     });
   }




*/

}
