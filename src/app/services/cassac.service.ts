import { Injectable } from '@angular/core';
import { Cassac } from './../classes/cassac';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CassacService {

       // lettura dati da server Sifapi
       cassac: Cassac;

       private rotta = "/cassac";
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

      getAll() {
              return this.http.get(this.APIURL,  {
               headers: this.getAuthHeader()
             });
           }

      getTaglia(id: number) {
              return this.http.get(this.APIURL + '/' + id,  {
                headers: this.getAuthHeader()
              });      // ok;
            }

        deleteTaglia(cassac: Cassac) {
              this.rottafunction = 'deletebyid';
              return this.http.delete(this.APIURL + '/' + this.rottafunction + '/' + cassac.id,  {
                headers: this.getAuthHeader()
              });      // ok;
            }

       deleteidCommanda(id: number) {
             this.rottafunction = 'deletebyidCommanda';
             return this.http.delete(this.APIURL + '/' + this.rottafunction + '/' + id,  {
               headers: this.getAuthHeader()
             });      // ok;
           }

        updateCassac(cassac: Cassac) {

          this.rottafunction = 'updatebyid';
          return this.http.put(this.APIURL + '/' + this.rottafunction + '/' + cassac.idTaglia + '/' + cassac.idCommanda , cassac,  {
            headers: this.getAuthHeader()
          });      // ok;
        }

        createCassac(cassac: Cassac){
          this.rottafunction = 'create';
          return this.http.post(this.APIURL + '/' + this.rottafunction , cassac,  {
            headers: this.getAuthHeader()
          });      // ok;
        }

        getbyidCommanda(idCommanda: number) {
         this.rottafunction = 'idCommanda';
         return this.http.get(this.APIURL + '/' + this.rottafunction + '/' + idCommanda,   {
                headers: this.getAuthHeader()
         });      // ok;
       }


       getTotaleCassac(idCommanda: number) {

         this.rottafunction = 'totaliidGiornata';
         return this.http.get(this.APIURL + '/' + this.rottafunction + '/' + idCommanda,  {
           headers: this.getAuthHeader()
         });      // ok;
       }


       getbyidTagliaeCommanda(idCommanda: number, idTaglia: number) {
        this.rottafunction = 'getbytaglia';
        return this.http.get(this.APIURL + '/' + this.rottafunction + '/' + idCommanda + '/' + idTaglia,   {
               headers: this.getAuthHeader()
        });      // ok;
      }

}
