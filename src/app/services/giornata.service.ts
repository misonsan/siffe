import { Injectable } from '@angular/core';
import { Giornata } from '../classes/Giornata';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GiornataService {

  giornata: Giornata[] = [];  // definisco i dati come array vuoto

  private rotta = "/giornates";
  private rottafunction = '';

  private rottadayActive = '/giornataact';
  private rottaManif = '/giornataManif';

  private rootGiornatalastid  = "/lastid";

  private rootGiornatebyManif = '/getGiornateByManifId/';
  private rootGiornatebyManifFiltro  = '/getGiornateByManifIdFiltrato/';

  private rootGiornatebyManifStato  = '/getGiornateByManifIdbyStato/';
  private rootGirnataactive = '/getGiornataactive/';
  private rootlastGiornatabyManif = '/getLastGiornataByManifId/';

  private APIURL = environment.APIURL + this.rotta;  // definisco l'url su cui effettuare la lettura sul server

  private APIURLLAST = environment.APIURL + this.rottaManif;

  private tipoFiltro = 0;

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
              getGiornate() {

                // ritorniamo un observoble - il subscribe devo farlo su users.component.ts

                // la chiamata la faccio solo se ho il token per abilitare la lettura solo a uteti loggati

                    // primo metodo passando il token in chiaro su url
                    //  return this.http.get(this.APIURL + '?token=' + this.auth.getToken());       // <---- 1° metodo  in chiaro su url

          // secondo metodo passando il token non in chiaro come header                   // <---- 2* metodo come header (non in chiaro)
                     return this.http.get(this.APIURL,  {
                      headers: this.getAuthHeader()
                    });      // ok;      // ok

                  }
               // ok
              getGiornata(id: number) {
                      return this.http.get(this.APIURL + '/' + id,  {
                        headers: this.getAuthHeader()
                      });      // ok;
                  }
              // ok
              deleteGiornata(giornata: Giornata) {
                      return this.http.delete(this.APIURL + '/' + giornata.id,  {
                        headers: this.getAuthHeader()
                      });      // ok;

                  }
              // ok
              updateGiornata(giornata: Giornata) {
                  console.log(`aggiornamento giornata ${giornata.id} `);
                  return this.http.put(this.APIURL + '/' + giornata.id, giornata, {
                  headers: this.getAuthHeader()
                  });
                 }
              // ok
              createGiornata(giornata: Giornata){
                  return this.http.post(this.APIURL, giornata,  {
                    headers: this.getAuthHeader()
                  });      // ok;
                  }

              // metodo gestito in laravel
              // per nodejs  smembrato nei die metodi getGiornateManifAll   e  getGiornateManifFiltro
              // OK  -  FATTI DUE MODULI SEPARATI
              getGiornateforManif(id: number, tipoRic: string) {

                  // ritorniamo un observoble - il subscribe devo farlo su users.component.ts

                  // la chiamata la faccio solo se ho il token per abilitare la lettura solo a uteti loggati

                      // primo metodo passando il token in chiaro su url
                      //  return this.http.get(this.APIURL + '?token=' + this.auth.getToken());       // <---- 1° metodo  in chiaro su url

                      // secondo metodo passando il token non in chiaro come header



              //alert('GiornataService - Parametri: ' + tipoRic + ' tipo filtro: ' + this.tipoFiltro);

                      if(tipoRic === 'T') {
                        return this.http.get(this.APIURL + this.rootGiornatebyManif + id,  {
                          headers: this.getAuthHeader()
                        });      // ok;
                      } else {
                         return this.http.get(this.APIURL + this.rootGiornatebyManifStato + id + '/tipo/' + tipoRic,  {
                          headers: this.getAuthHeader()
                        });      // ok;
                      }
                  }

              // ok
              getGiornateManifAll(id: number) {
                return this.http.get(this.APIURL + this.rootGiornatebyManif + id,  {
                  headers: this.getAuthHeader()
                });      // ok;
              }
              // OK
              getGiornateManifbyStato(id: number, tipoRic: string) {
                  this.tipoFiltro = 0;
                  switch (tipoRic) {
                    case 'T':
                        break;
                   case 'A':
                       this.tipoFiltro = 2;
                       break;
                   case 'C':
                       this.tipoFiltro = 3;
                       break;
                   case 'E':
                       this.tipoFiltro = 4;
                       break;
                   case 'N':
                        this.tipoFiltro = 1;
                        break;
                   default:
                       tipoRic = 'T';
                       break;
                   }
                  return this.http.get(this.APIURL + this.rootGiornatebyManifStato + id + '/tipo/' + this.tipoFiltro,  {
                  headers: this.getAuthHeader()
                });      // ok;
              }


              // ok
              getGiornataactive()  {

                this.rottafunction = environment.APIURL + this.rotta + this.rottadayActive + this.rootGirnataactive;
                  return this.http.get(this.rottafunction,  {
                    headers: this.getAuthHeader()
                  });      // ok;      // ok  // ok;

                  }

              // ok
              getLastGiornataid() {

                this.APIURLLAST = environment.APIURL + this.rottaManif + this.rootGiornatalastid;

                return this.http.get(this.APIURLLAST ,  {
                  headers: this.getAuthHeader()
                });      // ok;

                 }
              // Ok
              getLastGiornataidbyManif(id: number) {

                this.APIURLLAST = environment.APIURL + this.rotta + this.rootlastGiornatabyManif  + id;

                return this.http.get(this.APIURLLAST  ,  {
                  headers: this.getAuthHeader()
                });      // ok;

                 }
              // ok
              getGiornatebyManif(id: number) {

                return this.http.get(this.APIURL + this.rootGiornatebyManif + id,  {
                        headers: this.getAuthHeader()
                      });      // ok;

                 }

}
