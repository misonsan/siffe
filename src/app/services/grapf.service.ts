import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Graphprod } from '../classes/Graphprod';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';




@Injectable({
  providedIn: 'root'
})
export class GrapfService {

  graphprod: Graphprod;

  private rotta = "/graphprod1";

  private rottafunction = '';

private APIURL = environment.APIURL + this.rotta;

  constructor(private http: HttpClient, private auth: AuthService) { }


// attenzione: per ogni funzione che voglio usare DEVO passare il token per dimostrare che sono loggato
// metodo per concatenare il token nei metodi di chiamata al server
      getAuthHeader(): HttpHeaders {
        const headers = new HttpHeaders(
          {
            Autorization: 'Bearer ' + this.auth.getToken()
          }
        );
        return headers;
      }

      getAll() {
             return this.http.get(this.APIURL,  {
               headers: this.getAuthHeader()
             });
      }

      getid(id: number) {
        return this.http.get(this.APIURL + '/' + id, {
          headers: this.getAuthHeader()
        });
      }


      delete(graphprod: Graphprod) {
        this.rottafunction = 'deletebyid';
        return this.http.delete(this.APIURL + '/' + this.rottafunction + '/' + graphprod.id,  {
          headers: this.getAuthHeader()
        });

      }


      update(graphprod: Graphprod) {
        this.rottafunction = 'updatebyid';
        return this.http.put(this.APIURL + '/' + this.rottafunction + '/' + graphprod.id, graphprod,  {
          headers: this.getAuthHeader()
        });
      }


       create(graphprod: Graphprod){
        this.rottafunction = 'create';
        return this.http.post(this.APIURL + '/' + this.rottafunction, graphprod,  {
          headers: this.getAuthHeader()
        });
      }

}
