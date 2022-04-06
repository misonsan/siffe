import { Injectable } from '@angular/core';
import { Persona } from '../classes/Persona';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  persone: Persona[] = [];  // definisco i dati come array vuoto

  private rotta = '/personas';
  private rottafunction = '';
  private rottaactive = '/personeact';
  private rottalast = '/personeact/lastid';
  private rottareset = '/azzeraRuoloPersona';


  // vecchia versione senza environment
  //  private APIURL = 'http://localhost:8000/users';  // definisco l'url su cui effettuare la lettura sul server

  private APIURL = environment.APIURL + this.rotta;  // definisco l'url su cui effettuare la lettura sul server
  private APIURLLAST = environment.APIURL + this.rotta + this.rottalast;
  private APIURLSELECT = environment.APIURL;

  private rootPersoneforRuolo = '/getpersoneforRuolo/';
  private rootPersoneforRuolo1 = '/getpersoneforRuolo1/';
  private rootPersonebyRuolo2  = '/getpersoneforRuolo2/';
  private rootPersoneforTitolo  = '/getpersoneforTitolo/';
  private rootPersoneforStato  = '/getpersoneforStato/';
  private rootPersoneforLivello  = '/getpersoneforLivello/';


  private rootPersoneforRuoloFiltro  = '/getpersoneforRuoloFiltrato/';

  private rootPersonebyRuoloFiltro  = '/getpersonebyRuoloFiltrato/';
  private rootPersoneActive  = '/getpersoneActive/';






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


  getPersone() {

    // ritorniamo un observoble - il subscribe devo farlo su users.component.ts

    // la chiamata la faccio solo se ho il token per abilitare la lettura solo a uteti loggati

        // primo metodo passando il token in chiaro su url
        //  return this.http.get(this.APIURL + '?token=' + this.auth.getToken());       // <---- 1° metodo  in chiaro su url

        // secondo metodo passando il token non in chiaro come header                   // <---- 2* metodo come header (non in chiaro)
         return this.http.get(this.APIURL,  {
          headers: this.getAuthHeader()
        });      // ok      // ok


        }

        getPersona(id: number) {
          return this.http.get(this.APIURL + '/' + id,  {
            headers: this.getAuthHeader()
          });      // ok
        }

        deletePersona(persona: Persona) {
          this.rottafunction = 'deletebyid';
          return this.http.delete(this.APIURL + '/' + this.rottafunction + '/' + persona.id, {
            headers: this.getAuthHeader()
          });      // ok

        }
    updatePersona(persona: Persona) {
      this.rottafunction = 'updatebyid';
      return this.http.put(this.APIURL + '/' + this.rottafunction + '/' + persona.id, persona, {
        headers: this.getAuthHeader()
        });
     }

     createPersona(persona: Persona){
      this.rottafunction = 'create';
      return this.http.post(this.APIURL + '/' + this.rottafunction, persona, {
        headers: this.getAuthHeader()
      });      // ok
    }


    getPersoneforRuolo1(ruolo: number) {

      // ritorniamo un observoble - il subscribe devo farlo su users.component.ts

      // la chiamata la faccio solo se ho il token per abilitare la lettura solo a uteti loggati

          // primo metodo passando il token in chiaro su url
          //  return this.http.get(this.APIURL + '?token=' + this.auth.getToken());       // <---- 1° metodo  in chiaro su url

          // secondo metodo passando il token non in chiaro come header


           // return this.http.get(this.APIURL + this.rootPersonebyRuolo + ruolo);
            return this.http.get(this.APIURL + this.rootPersoneforRuolo1 + ruolo,  {
              headers: this.getAuthHeader()
            });      // ok

          }


   getPersoneforRuolo2(ruolo1: number, ruolo2: number) {

           // return this.http.get(this.APIURL + this.rootPersoneforRuoloFiltro + ruolo1 + '/ruolo/' + ruolo2);

           //  this.rootPersoneforRuoloFiltro
            return this.http.get(this.APIURL +  this.rootPersonebyRuolo2 + ruolo1 + '/ruolo/' + ruolo2, {
              headers: this.getAuthHeader()
            });      // ok



          }


          getPersoneforRuoloFiltrato(ruolo1: number) {



            // return this.http.get(this.APIURL + this.rootPersoneforRuoloFiltro + ruolo1 + '/ruolo/' + ruolo2);

             return this.http.get(this.APIURL + this.rootPersonebyRuoloFiltro + ruolo1,  {
              headers: this.getAuthHeader()
            });      // ok
           }


// http://localhost:3000/personeact/getpersoneActive

           getpersoneActive() {
              const pathrotta = '/active';
              return this.http.get(this.APIURL  + pathrotta + this.rootPersoneActive,  {
              headers: this.getAuthHeader()
              });      // ok
           }


           getPersoneforTitolo(tipo: number) {

            // ritorniamo un observoble - il subscribe devo farlo su users.component.ts

            // la chiamata la faccio solo se ho il token per abilitare la lettura solo a uteti loggati

                // primo metodo passando il token in chiaro su url
                //  return this.http.get(this.APIURL + '?token=' + this.auth.getToken());       // <---- 1° metodo  in chiaro su url

                // secondo metodo passando il token non in chiaro come header


                 // return this.http.get(this.APIURL + this.rootProdottibyRuolo + ruolo);
                  return this.http.get(this.APIURL + this.rootPersoneforTitolo + tipo,  {
                    headers: this.getAuthHeader()
                  });      // ok      // ok

                }

            getPersoneforStato(stato: number) {


                        return this.http.get(this.APIURL + this.rootPersoneforStato + stato,  {
                          headers: this.getAuthHeader()
                        });      // ok      // ok

                      }

            getPersoneforLivello(livello: number) {


                        return this.http.get(this.APIURL + this.rootPersoneforLivello + livello,  {
                          headers: this.getAuthHeader()
                        });      // ok      // ok

                      }

            getPersoneinServizio() {
              this.rottafunction = 'inServizio/ok';
              return this.http.get(this.APIURL + '/' + this.rottafunction , {
                          headers: this.getAuthHeader()
                        });      // ok      // ok
              }
            getPersoneutCommanda() {
                this.rottafunction = 'utCommanda/ok';
                return this.http.get(this.APIURL + '/' + this.rottafunction , {
                            headers: this.getAuthHeader()
                          });      // ok      // ok
                }

            getPersonaLastId() {

              return this.http.get(this.APIURLLAST ,  {
                          headers: this.getAuthHeader()
                        });
                      }


             resettaPersona() {
                return this.http.post(this.APIURL + this.rottareset ,  {
                headers: this.getAuthHeader()
              });
        }

}
