import { Injectable } from '@angular/core';
import { Spesa } from '../classes/Spesa';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SpesaService {

  private rotta = "/spesa";
  private rottalast = "/spesalast/lastid";
  private rottafunction = '';

  // vecchia versione senza environment
  //  private APIURL = 'http://localhost:8000/users';  // definisco l'url su cui effettuare la lettura sul server

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
        });      // ok      // ok      // ok

      }

        getSpesa(id: number) {
          return this.http.get(this.APIURL + '/' + id,  {
            headers: this.getAuthHeader()
          });      // ok      // ok
        }

        deleteSpesa(spesa: Spesa) {
          this.rottafunction = 'deletebyid';
          return this.http.delete(this.APIURL + '/' + this.rottafunction + '/' + spesa.id,  {
            headers: this.getAuthHeader()
          });      // ok      // ok

        }

    updateSpesa(spesa: Spesa) {
      this.rottafunction = 'updatebyid';
      return this.http.put(this.APIURL + '/' + this.rottafunction + '/' + spesa.id, spesa,  {
        headers: this.getAuthHeader()
      });      // ok      // ok

    }


     createSpesa(spesa: Spesa){
      this.rottafunction = 'create';
      return this.http.post(this.APIURL + '/' + this.rottafunction, spesa,  {
        headers: this.getAuthHeader()
      });      // ok      // ok
    }



          getSpesaforFornitore(id: number) {
            this.rottafunction = 'getSpeseforFornitore';
            return this.http.get(this.APIURL + '/'  + this.rottafunction  + '/' + id,  {
                          headers: this.getAuthHeader()
                        });
                }


          getSpesaforStato(stato: number) {
            this.rottafunction = 'getSpeseforStato';
            return this.http.get(this.APIURL + '/'  + this.rottafunction  + '/' + stato,  {
                             headers: this.getAuthHeader()
                           });
                  }

          getSpesaLastId() {
            this.rottafunction = 'getSpeselastid/lastid';
                  return this.http.get(this.APIURL  + '/' + this.rottafunction,  {
                  headers: this.getAuthHeader()
            });
          }

          getCountbyspesa(id: number) {

            this.rottafunction = '/count';
            return this.http.get(this.APIURL + this.rottafunction + '/' + id ,  {
                  headers: this.getAuthHeader()
                });
          }

          getTotalibyspese() {
            this.rottafunction = 'getTotalibyspese/spese';
                  return this.http.get(this.APIURL  + '/' + this.rottafunction,  {
                  headers: this.getAuthHeader()
            });
          }

          getimportispeseFornitore(id: number) {
            this.rottafunction = 'getimportispeseFornitore';
            let merda = this.APIURL  + '/' + this.rottafunction + '/' + id;
            console.log('speseController ---  getimportispeseFornitore ' + merda);


                  return this.http.get(this.APIURL  + '/' + this.rottafunction + '/' + id ,  {
                  headers: this.getAuthHeader()
            });
          }

}
