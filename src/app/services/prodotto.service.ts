import { Injectable } from '@angular/core';
import { Prodotto } from '../classes/Prodotto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ProdottoService {

  persone: Prodotto[] = [];  // definisco i dati come array vuoto

  private rotta = "/prodotto";
  private rottalast = "/prodottolast/lastid";
  private rottafunction = '';

  // vecchia versione senza environment
  //  private APIURL = 'http://localhost:8000/users';  // definisco l'url su cui effettuare la lettura sul server

  private APIURL = environment.APIURL + this.rotta;  // definisco l'url su cui effettuare la lettura sul server
  private APIURLLAST = environment.APIURL + this.rottalast;

  private rootProdottibyMenu = '/getProdottiforMenu/';
  private rootProdottibyTipologia = '/getProdottiforTipologia/';
  private rootProdottibyTipologia1 = '/getProdottiforTipologia1/';
  private rootProdottibyCategoria = '/getProdottiforCategoria/';
  private rootProdottibyCompetenza = '/getProdottiforCompetenza/';
  private rootProdottibyStato = '/getProdottiforStato/';
  private rootResetamenu = '/amenu/updateamenuProdotto';

  private rootResetselectedDay = '/selectedDay/reset';

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

    // ritorniamo un observoble - il subscribe devo farlo su users.component.ts

    // la chiamata la faccio solo se ho il token per abilitare la lettura solo a uteti loggati

        // primo metodo passando il token in chiaro su url
        //  return this.http.get(this.APIURL + '?token=' + this.auth.getToken());       // <---- 1° metodo  in chiaro su url

        // secondo metodo passando il token non in chiaro come header                   // <---- 2* metodo come header (non in chiaro)
         return this.http.get(this.APIURL,  {
          headers: this.getAuthHeader()
        });      // ok      // ok      // ok

      }

        getProdotto(id: number) {
          return this.http.get(this.APIURL + '/' + id,  {
            headers: this.getAuthHeader()
          });      // ok      // ok
        }

        deleteProdotto(prodotto: Prodotto) {
          this.rottafunction = 'deletebyid';
          return this.http.delete(this.APIURL + '/' + this.rottafunction + '/' + prodotto.id,  {
            headers: this.getAuthHeader()
          });      // ok      // ok

        }



    updateProdotto(prodotto: Prodotto) {
      this.rottafunction = 'updatebyid';
      return this.http.put(this.APIURL + '/' + this.rottafunction + '/' + prodotto.id, prodotto,  {
        headers: this.getAuthHeader()
      });      // ok      // ok

    }


     createProdotto(prodotto: Prodotto){
      this.rottafunction = 'create';
      return this.http.post(this.APIURL + '/' + this.rottafunction, prodotto,  {
        headers: this.getAuthHeader()
      });      // ok      // ok
    }


    getProdottiforMenu(menu: string) {

      // ritorniamo un observoble - il subscribe devo farlo su users.component.ts

      // la chiamata la faccio solo se ho il token per abilitare la lettura solo a uteti loggati

          // primo metodo passando il token in chiaro su url
          //  return this.http.get(this.APIURL + '?token=' + this.auth.getToken());       // <---- 1° metodo  in chiaro su url

          // secondo metodo passando il token non in chiaro come header


           // return this.http.get(this.APIURL + this.rootProdottibyRuolo + ruolo);
            return this.http.get(this.APIURL + this.rootProdottibyMenu + menu,  {
              headers: this.getAuthHeader()
            });      // ok      // ok

          }

          getProdottiforTipologia(tipo: number) {

            // ritorniamo un observoble - il subscribe devo farlo su users.component.ts

            // la chiamata la faccio solo se ho il token per abilitare la lettura solo a uteti loggati

                // primo metodo passando il token in chiaro su url
                //  return this.http.get(this.APIURL + '?token=' + this.auth.getToken());       // <---- 1° metodo  in chiaro su url

                // secondo metodo passando il token non in chiaro come header


                 // return this.http.get(this.APIURL + this.rootProdottibyRuolo + ruolo);
                  return this.http.get(this.APIURL + this.rootProdottibyTipologia + tipo,  {
                    headers: this.getAuthHeader()
                  });      // ok      // ok

                }

                getProdottiforTipologia1(tipo: number) {

                  // recupero solo prodotti della tipologia selezionata con qta selezionata a zero
                        return this.http.get(this.APIURL + this.rootProdottibyTipologia1 + tipo,  {
                          headers: this.getAuthHeader()
                        });      // ok      // ok

                      }


          getProdottiforCategoria(tipo: number) {

                return this.http.get(this.APIURL + this.rootProdottibyCategoria + tipo,  {
                          headers: this.getAuthHeader()
                        });
                }

          getProdottiforCompetenza(tipo: number) {

                return this.http.get(this.APIURL + this.rootProdottibyCompetenza + tipo,  {
                           headers: this.getAuthHeader()
                         });
                }

          getProdottiforStato(stato: number) {

                  return this.http.get(this.APIURL + this.rootProdottibyStato + stato,  {
                             headers: this.getAuthHeader()
                           });
                  }

          getProdottoLastId() {
            return this.http.get(this.APIURLLAST ,  {
              headers: this.getAuthHeader()
            });
          }

          // su tutti i prodotti reimposto il carattere * per selezione se a menu
        resettaamenu() {

          const test = this.APIURL + this.rootResetamenu;
          console.log('prodottoService - resettaamenu : ' + test);
          return this.http.put(this.APIURL + this.rootResetamenu ,  {
            headers: this.getAuthHeader()
          });
        }

     // su tutti i prodotti reimposto il carattere N per selectedDay
     resettaselectedDay() {

      const test = this.APIURL + this.rootResetselectedDay;
      console.log('prodottoService - resettaselectedDay : ' + test);
      return this.http.put(this.APIURL + this.rootResetselectedDay ,  {
        headers: this.getAuthHeader()
      });
    }

    getProdottiforMenbyCompetenza(menu: string, competenza: number) {

      this.rottafunction = 'getProdottimenuforCompetenza';
      return this.http.get(this.APIURL + '/' + this.rottafunction + '/' + menu + '/' + competenza,  {
             headers: this.getAuthHeader()
            });      // ok      // ok

          }




}
