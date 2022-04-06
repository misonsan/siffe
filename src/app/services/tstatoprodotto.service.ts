import { Injectable } from '@angular/core';
import { TstatoProdotto } from '../classes/T_stato_prodotto';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class TstatoprodottoService {

  tstatoprodotti: TstatoProdotto[] = [];  // definisco i dati come array vuoto

  private rotta = "/statoprodotto";
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

        getbyid(id: number) {
          return this.http.get(this.APIURL + '/' + id,  {
            headers: this.getAuthHeader()
          });      // ok      // ok
        }

        delete(statoprodotto: TstatoProdotto) {
          this.rottafunction = 'deletebyid';
          return this.http.delete(this.APIURL + '/' + this.rottafunction + '/' + statoprodotto.id,  {
            headers: this.getAuthHeader()
          });      // ok      // ok
        }

    update(statoprodotto: TstatoProdotto) {
      this.rottafunction = 'updatebyid';
      return this.http.put(this.APIURL + '/' + this.rottafunction + '/' + statoprodotto.id, statoprodotto,  {
        headers: this.getAuthHeader()
      });      // ok      // ok
    }

     create(statoprodotto: TstatoProdotto){
      this.rottafunction = 'create';
      return this.http.post(this.APIURL + '/' + this.rottafunction, statoprodotto,  {
        headers: this.getAuthHeader()
      });      // ok      // ok
    }

    getlastid() {
      this.rottafunction = 'lastid';
      return this.http.get(this.APIURL + '/' + this.rottafunction ,  {
        headers: this.getAuthHeader()
      });      // ok      // ok
    }

}
