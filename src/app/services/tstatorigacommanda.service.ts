import { Injectable } from '@angular/core';
import { Tstatorigacommanda } from '../classes/T_stato_rigacommanda';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TstatorigacommandaService {

  tstato: Tstatorigacommanda;

  private rotta = "/tstatorigacommanda";
  private rottafunction = '';

  private APIURL = environment.APIURL + this.rotta;  // definisco l'url su cui effettuare la lettura sul server

  constructor(private http: HttpClient,
              private auth: AuthService) { }

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

                    getbyId(id: number) {
                      return this.http.get(this.APIURL + '/' + id,  {
                        headers: this.getAuthHeader()
                      });
                    }

                    delete(tstato: Tstatorigacommanda) {
                      this.rottafunction = 'deletebyid';
                      return this.http.delete(this.APIURL + '/' + this.rottafunction + '/' + tstato.id,  {
                        headers: this.getAuthHeader()
                      });      // ok      // ok
                    }

                update(tstato: Tstatorigacommanda) {
                  this.rottafunction = 'updatebyid';
                  return this.http.put(this.APIURL + '/' + this.rottafunction + '/' + tstato.id, tstato,  {
                    headers: this.getAuthHeader()
                  });
                }

                 create(tstato: Tstatorigacommanda){
                  this.rottafunction = 'create';
                  return this.http.post(this.APIURL + '/' + this.rottafunction, tstato,  {
                    headers: this.getAuthHeader()
                  });      // ok      // ok
                }

}
