import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manifestazione } from '../classes/Manifestazione';    // ../../../classes/user
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ManifestazioneService {

  manif: Manifestazione;

  private rotta = "/manif";
  private rottaSearch = '/manife';   // per ricerche con chiavi diverse da id

  private rottaLast = "/manifestazione";
  private rootManiflastid  = "/lastid";
  private rootRicercaStato  = "/getbyStato/";
  private rootActive  = "/getManifestazioneActive";
  private rottafunction = '';

// vecchia versione senza environment
//  private APIURL = 'http://localhost:8000/users';  // definisco l'url su cui effettuare la lettura sul server

private APIURL = environment.APIURL + this.rotta;  // definisco l'url su cui effettuare la lettura sul server

private APIURLLAST = environment.APIURL + this.rottaLast;

private APIURLSEARCH = '';

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

      getManifestazioni() {
  // ritorniamo un observoble - il subscribe devo farlo su users.component.ts

        // la chiamata la faccio solo se ho il token per abilitare la lettura solo a uteti loggati

            // primo metodo passando il token in chiaro su url
            //  return this.http.get(this.APIURL + '?token=' + this.auth.getToken());       // <---- 1° metodo  in chiaro su url

            // secondo metodo passando il token non in chiaro come header                   // <---- 2* metodo come header (non in chiaro)

             return this.http.get(this.APIURL,  {
               headers: this.getAuthHeader()
             });      // ok


         /*
          return this.http.get(this.APIURL).subscribe(
            data => console.log(data),
            error => alert(error.message)
          );
  */

      }

      getManifestazione(id: number) {
        return this.http.get(this.APIURL + '/' + id, {
          headers: this.getAuthHeader()
        });
      }


      deleteManifestazione(manif: Manifestazione) {
        this.rottafunction = 'deletebyid';
        return this.http.delete(this.APIURL + '/' + this.rottafunction + '/' + manif.id,  {
          headers: this.getAuthHeader()
        });

      }


      updateManifestazione(manif: Manifestazione) {
        this.rottafunction = 'updatebyid';
        return this.http.put(this.APIURL + '/' + this.rottafunction + '/' + manif.id, manif,  {
          headers: this.getAuthHeader()
        });

      }


       createManifestazione(manif: Manifestazione){
        this.rottafunction = 'create';
        return this.http.post(this.APIURL + '/' + this.rottafunction, manif,  {
          headers: this.getAuthHeader()
        });
      }

      getLastManifestazioneid() {

        this.APIURL = environment.APIURL + this.rottaLast;

        return this.http.get(this.APIURL + this.rootManiflastid ,  {
          headers: this.getAuthHeader()
        });      // ok;

      }

      getManifbyStato(stato: number) {

        // ritorniamo un observoble - il subscribe devo farlo su users.component.ts

        // la chiamata la faccio solo se ho il token per abilitare la lettura solo a uteti loggati

            // primo metodo passando il token in chiaro su url
            //  return this.http.get(this.APIURL + '?token=' + this.auth.getToken());       // <---- 1° metodo  in chiaro su url

            // secondo metodo passando il token non in chiaro come header

            this.APIURLSEARCH = environment.APIURL + this.rotta + this.rootRicercaStato;

            return this.http.get(this.APIURLSEARCH + stato,  {
                headers: this.getAuthHeader()
              });      // ok;

    }

      getManifActive() {

          this.APIURLSEARCH = environment.APIURL + this.rottaSearch + this.rootActive;

          return this.http.get(this.APIURLSEARCH,  {
            headers: this.getAuthHeader()
          });      // ok;


      }

}
