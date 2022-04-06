import { Injectable } from '@angular/core';
import { Commandawriga } from '../classes/Commandawriga';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommandawrigaService {

  commandawrighe: Commandawriga[] = [];  // definisco i dati come array vuoto
  commandawriga: Commandawriga;




  private rotta = '/commandawriga';

  private rottafunction = '';

  private tipoFiltro = 0;



  private rottaord = '/commandawriga';
  private rottatipo = '/commandawrigatipo';

  private rootProdottibyTipologia = '/getProdottiforTipologia/';
  private rootProdottiOrdinati = '/getProdottiOrdinati/';
  private rootProdottybyTipeCommanda = '/getProdottibyTipologiaComma/';
  private rootbyProdotto = '/prodotto';

  private APIURL = environment.APIURL + this.rotta;  // definisco l'url su cui effettuare la lettura sul server
  private APIURLTipo = environment.APIURL + this.rottatipo + this.rootProdottibyTipologia;
  private APIURLOrd = environment.APIURL + this.rottaord + this.rootProdottiOrdinati;

 private APISearch = '';





  constructor(private http: HttpClient, private auth: AuthService) { }

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


 getCommandewrighe() {

        return this.http.get(this.APIURL,  {
         headers: this.getAuthHeader()
       });      // ok;      // ok


    }

       getCommandawriga(id: number) {
         return this.http.get(this.APIURL + '/' + id,  {
           headers: this.getAuthHeader()
         });      // ok;
       }


       getCommandawrigabyidProd(idCommanda: number, idprod: number) {
        this.rottafunction = 'prodotto';
        return this.http.get(this.APIURL + '/' + this.rottafunction + '/' + idCommanda + '/' + idprod,  {
          headers: this.getAuthHeader()
        });      // ok;
      }

       deleteCommandawriga(id) {
        this.rottafunction = 'deletebyid';
        return this.http.delete(this.APIURL + '/' + this.rottafunction + '/' + id,  {
           headers: this.getAuthHeader()
         });      // ok;

       }



   updateCommandawriga(commandawriga: Commandawriga) {

    this.rottafunction = 'updatebyid';
    return this.http.put(this.APIURL + '/' + this.rottafunction + '/' + commandawriga.id, commandawriga,  {
        headers: this.getAuthHeader()
     });      // ok;

   }


    createCommandawriga(commandawriga: Commandawriga){
      this.rottafunction = 'create';
      return this.http.post(this.APIURL + '/' + this.rottafunction, commandawriga,  {
       headers: this.getAuthHeader()
     });      // ok
   }

   getProdottiforTipologia(tipo: number) {

     // ritorniamo un observoble - il subscribe devo farlo su users.component.ts

     // la chiamata la faccio solo se ho il token per abilitare la lettura solo a uteti loggati

         // primo metodo passando il token in chiaro su url
         //  return this.http.get(this.APIURL + '?token=' + this.auth.getToken());       // <---- 1° metodo  in chiaro su url

         // secondo metodo passando il token non in chiaro come header


          // return this.http.get(this.APIURL + this.rootProdottibyRuolo + ruolo);

           return this.http.get(this.APIURLTipo + tipo,  {
             headers: this.getAuthHeader()
           });      // ok;

         }

         getProdottibyTipologiabycomm(tipo: number, ncommanda: number) {

          //  this.APISearch = environment.APIURL + this.rottatipo + this.rootProdottybyTipeCommanda;
           this.APISearch = environment.APIURL + this.rotta + '/getProdottibyTipologiaComma/';
           return this.http.get(this.APISearch + tipo + '/ncomma/' + ncommanda,  {
                   headers: this.getAuthHeader()
                 });      // ok;

               }

         getProdottiOrdinati(idCommanda: number) {

           return this.http.get(this.APIURLOrd + idCommanda,  {
             headers: this.getAuthHeader()
           });      // ok;

         }

}
