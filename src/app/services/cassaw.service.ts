import { Injectable } from '@angular/core';
import { Cassaw } from './../classes/Cassaw';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CassawService {

      // lettura dati da server Sifapi
      cassaw: Cassaw;

      private rotta = "/cassaw";
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

     getAllTaglie() {
             return this.http.get(this.APIURL,  {
              headers: this.getAuthHeader()
            });
          }

     getTaglia(id: number) {
             return this.http.get(this.APIURL + '/' + id,  {
               headers: this.getAuthHeader()
             });      // ok;
           }

       deleteTaglia(cassaw: Cassaw) {
             this.rottafunction = 'deletebyid';
             return this.http.delete(this.APIURL + '/' + this.rottafunction + '/' + cassaw.id,  {
               headers: this.getAuthHeader()
             });      // ok;
           }

      deleteidGiornata(id: number) {
            this.rottafunction = 'deletebyidGiornata';
            return this.http.delete(this.APIURL + '/' + this.rottafunction + '/' + id,  {
              headers: this.getAuthHeader()
            });      // ok;
          }

       updateCassa(cassaw: Cassaw, idGiornata: number) {
console.log('cassawService - Updatecassa - -------------------------------------  ' + JSON.stringify(cassaw));
         this.rottafunction = 'updatebyid';
         return this.http.put(this.APIURL + '/' + this.rottafunction + '/' + cassaw.idTaglia + '/' + idGiornata, cassaw,  {
           headers: this.getAuthHeader()
         });      // ok;
       }

       createCassa(cassaw: Cassaw){
         this.rottafunction = 'create';
         return this.http.post(this.APIURL + '/' + this.rottafunction , cassaw,  {
           headers: this.getAuthHeader()
         });      // ok;
       }

       getbyidGiornata(idGiornata: number) {
        this.rottafunction = 'idGiornata';
        return this.http.get(this.APIURL + '/' + this.rottafunction + '/' + idGiornata,   {
               headers: this.getAuthHeader()
        });      // ok;
      }

      azzeraCassa(idGiornata: number) {

        this.rottafunction = 'azzerabyidGiornata';
        return this.http.put(this.APIURL + '/' + this.rottafunction + '/' + idGiornata,  {
          headers: this.getAuthHeader()
        });      // ok;
      }

      getTotaleCassa(idGiornata: number) {

        this.rottafunction = 'totaliidGiornata';
        return this.http.get(this.APIURL + '/' + this.rottafunction + '/' + idGiornata,  {
          headers: this.getAuthHeader()
        });      // ok;
      }





}

