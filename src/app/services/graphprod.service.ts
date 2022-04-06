import { Injectable } from '@angular/core';
import { Graphprod } from '../classes/Graphprod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GraphprodService {

  graphprod: Graphprod;  // definisco i dati come array vuoto

  private rotta = "/graphprod";
  private rottafunction = '';

  private APIURL = environment.APIURL + this.rotta;  // definisco l'url su cui effettuare la lettura sul server

  constructor(private http: HttpClient,
              private auth: AuthService) { }

              getAuthHeader(): HttpHeaders {
                const headers = new HttpHeaders(
                  {
                    Autorization: 'Bearer ' + this.auth.getToken()
                  }
                );
                return headers;
              }

              // ok
              getAllGraph() {

                console.log('frontend - graphprodService --- getAllGraph  --  appena entrato');
                     return this.http.get(this.APIURL,  {
                      headers: this.getAuthHeader()
                    });      // ok;      // ok

                  }

              getAll() {

                    return this.http.get(this.APIURL,  {
                      headers: this.getAuthHeader()
                    });      // ok
             }



               // ok
              getidGraph(id: number) {
                      return this.http.get(this.APIURL + '/' + id,  {
                        headers: this.getAuthHeader()
                      });      // ok;
                  }
              // ok
              deleteGraph(id: number) {
                this.rottafunction = 'deletebyid';
                return this.http.delete(this.APIURL + '/' + this.rottafunction + '/' + id,  {
                        headers: this.getAuthHeader()
                      });      // ok;
                  }

              deleteAllGraph() {
                    this.rottafunction = 'deleteAll';
                    return this.http.delete(this.APIURL + '/' + this.rottafunction,  {
                      headers: this.getAuthHeader()
                    });      // ok      // ok
                 }

              updateGraph(graphprod: Graphprod) {
                this.rottafunction = 'updatebyid';
                return this.http.put(this.APIURL + '/' + this.rottafunction + '/' + graphprod.id, graphprod,  {
                  headers: this.getAuthHeader()
                });      // ok      // ok
              }
               createGraph(graphprod: Graphprod) {
                this.rottafunction = 'create';
                return this.http.post(this.APIURL + '/' + this.rottafunction, graphprod,  {
                  headers: this.getAuthHeader()
                });      // ok      // ok
              }

}
