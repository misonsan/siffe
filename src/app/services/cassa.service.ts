import { Injectable } from '@angular/core';
import { Cassa } from './../classes/Cassa';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class CassaService {

     // lettura dati da server Sifapi
     cassa: Cassa;

     private rotta = "/cassa";
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

      deleteTaglia(cassa: Cassa) {
            this.rottafunction = 'deletebyid';
            return this.http.delete(this.APIURL + '/' + this.rottafunction + '/' + cassa.id,  {
              headers: this.getAuthHeader()
            });      // ok;
          }

     deleteidGiornata(id: number) {
           this.rottafunction = 'deletebyidGiornata';
           return this.http.delete(this.APIURL + '/' + this.rottafunction + '/' + id,  {
             headers: this.getAuthHeader()
           });      // ok;
         }

      updateCassa(cassa: Cassa, idGiornata: number) {

        this.rottafunction = 'updatebyid';
        return this.http.put(this.APIURL + '/' + this.rottafunction + '/' + cassa.idTaglia + '/' + idGiornata, cassa,  {
          headers: this.getAuthHeader()
        });      // ok;
      }

      createCassa(cassa: Cassa){
        this.rottafunction = 'create';
        return this.http.post(this.APIURL + '/' + this.rottafunction , cassa,  {
          headers: this.getAuthHeader()
        });      // ok;
      }

      getbyidGiornata(idGiornata: number) {
       this.rottafunction = 'idGiornata';
       return this.http.get(this.APIURL + '/' + this.rottafunction + '/' + idGiornata,   {
              headers: this.getAuthHeader()
       });      // ok;
     }


     getTotaleCassa(idGiornata: number) {

       this.rottafunction = 'totaliidGiornata';
       return this.http.get(this.APIURL + '/' + this.rottafunction + '/' + idGiornata,  {
         headers: this.getAuthHeader()
       });      // ok;
     }


     getbyidTagliaeGiorno(idGiornata: number, idTaglia: number) {
      this.rottafunction = 'getbytaglia';
      return this.http.get(this.APIURL + '/' + this.rottafunction + '/' + idGiornata + '/' + idTaglia,   {
             headers: this.getAuthHeader()
      });      // ok;
    }
    getTagliebyGiorno(idGiornata: number) {
      console.log('cassaService --- getTagliebyGiorn ----  idGiornata: ' + idGiornata);
      this.rottafunction = 'gettagliebyDay';
      return this.http.get(this.APIURL + '/' + this.rottafunction + '/' + idGiornata ,   {
             headers: this.getAuthHeader()
      });      // ok;
    }


}
