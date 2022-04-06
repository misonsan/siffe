import { Injectable } from '@angular/core';
import { Commandariga } from './../classes/Commandariga';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommandarigaService {

  commandarighe: Commandariga[] = [];  // definisco i dati come array vuoto
  commandariga: Commandariga;

  private rotta = "/commandariga";
  private rottafunction = '';

  private rottaLast = "/commandarigalast";
  private rootCommandarigalastid  = '/lastid/';

  private rottaProdotti = "/commandarigaprodco/";
  private rootCommandaforStatoSettore  = '/getProdottiforStatoSettore/';
  private rootprodottidaLavorare = '/getProdottidaLavorare/';
  private rootprodottiCucinadaConsegnare = '/getProdottiCucinadaConsegnare/';
  private rootprodottiBevandedaConsegnare = '/getProdottiBevandedaConsegnare/';
  private rootprodottiConsegnati = '/getProdottiConsegnati/';
  private rootAllprodotti = '/getAllProdotti/';
  private rootAllprodottiAct = '/getAllProdottiAct/';

  private rootTruncate = '/commandarigadlt/truncate';

  private APIURL = environment.APIURL + this.rotta;  // definisco l'url su cui effettuare la lettura sul server


 private APIURLLAST = environment.APIURL + this.rottaLast;
 //private APIURLPRODC = environment.APIURL + this.rottaProdotti;

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
       });      // ok;      // ok


    }

       getCommandariga(id: number) {
         return this.http.get(this.APIURL + '/' + id,  {
           headers: this.getAuthHeader()
         });      // ok;
       }


       deleteCommandariga(id) {

        this.rottafunction = 'deletebyid';
        return this.http.delete(this.APIURL + '/' + this.rottafunction + '/' + id,  {
               headers: this.getAuthHeader()
         });      // ok;

       }


       updateCommandariga(commandariga: Commandariga) {

        this.rottafunction = 'updatebyid';
        return this.http.put(this.APIURL + '/' + this.rottafunction + '/' + commandariga.id, commandariga,  {
                headers: this.getAuthHeader()
              });      // ok;

      }


      createCommandariga(commandariga: Commandariga){
        this.rottafunction = 'create';
        return this.http.post(this.APIURL + '/' + this.rottafunction, commandariga,  {
               headers: this.getAuthHeader()
            });      // ok;
      }


      getrighebyCommanda(id: number) {
        this.rottafunction = 'commanda';
        return this.http.get(this.APIURL + '/' + this.rottafunction + '/' + id ,  {
              headers: this.getAuthHeader()
            });      // ok;

      }





// --------------------------  metodi da portare in backend (testare con postman)  2022/02/11

   getLastCommandarigaid() {

    return this.http.get(this.APIURLLAST + this.rootCommandarigalastid ,  {
      headers: this.getAuthHeader()
    });      // ok;

  }


  getProdottiforCommanda(id: number) {
    return this.http.get(this.APIURL + this.rottaProdotti + id ,  {
          headers: this.getAuthHeader()
        });      // ok;

  }


  getProdottiforStatoSettore(id: number, settore: number) {
    return this.http.get(this.APIURL + this.rootCommandaforStatoSettore + id + '/settore/' + settore,  {
          headers: this.getAuthHeader()
        });      // ok;

  }

  // ok provato e funziona
  getCommanderighedaLavorare(competenza: number, flagLav: number) {

    return this.http.get(this.APIURL + this.rootprodottidaLavorare + competenza + '/flagL/' + flagLav,  {
      headers: this.getAuthHeader()
    });      // ok;
  }

  // ok provato e funziona
  getProdottiCucinadaConsegnare(competenza: number, flagLav: number, flagCon: number ) {

    return this.http.get(this.APIURL + this.rootprodottiCucinadaConsegnare + competenza + '/flagL/' + flagLav + '/flagC/' + flagCon,  {
      headers: this.getAuthHeader()
    });      // ok;

  }

  // ok provato e funziona
  getProdottiBevandedaConsegnare(competenza: number, flagCon: number) {

    return this.http.get(this.APIURL + this.rootprodottiBevandedaConsegnare + competenza  + '/flagC/' + flagCon,  {
      headers: this.getAuthHeader()
    });      // ok;

  }

  getProdottiConsegnati(competenza: number, flagCon: number) {

    return this.http.get(this.APIURL + this.rootprodottiConsegnati + competenza  + '/flagC/' + flagCon,  {
      headers: this.getAuthHeader()
    });      // ok;

  }

  getAllCommanderighe(competenza: number) {

    return this.http.get(this.APIURL + this.rootAllprodotti + competenza,  {
      headers: this.getAuthHeader()
    });      // ok;

  }

  getAllCommanderigheAttive(competenza: number) {

    return this.http.get(this.APIURL + this.rootAllprodottiAct + competenza,  {
      headers: this.getAuthHeader()
    });      // ok;

  }

// truncate Table
// va cancellata separatamente la tabella figli
truncateTable() {

  this.APIURL = environment.APIURL;

  return this.http.post(this.APIURL + this.rootTruncate,  {
    headers: this.getAuthHeader()
  });      // ok;
 }

 getProdottibytipologiaeStato(tipologia: number, stato: number, order: string) {

  this.rottafunction = '/tipologiaeStato';
  return this.http.get(this.APIURL + this.rottafunction + '/' + tipologia + '/stato/' + stato + '/' + order,  {
        headers: this.getAuthHeader()
      });

}

getProdottibyprodottoeStato(id: number, stato: number) {
  this.rottafunction = '/prodottoeStato';
  return this.http.get(this.APIURL + this.rottafunction + '/' + id + '/stato/' + stato,  {
        headers: this.getAuthHeader()
      });

}

getAllProdottibytipologia(tipologia: number, order: string) {

  this.rottafunction = '/tipologia';
  return this.http.get(this.APIURL + this.rottafunction + '/' + tipologia + '/' + order ,  {
        headers: this.getAuthHeader()
      });

}

getAllProdottibyprodotto(idProdotto: number) {

  this.rottafunction = '/prodotto';
  return this.http.get(this.APIURL + this.rottafunction + '/' + idProdotto ,  {
        headers: this.getAuthHeader()
      });
}

getProdbyCommanda(id: number) {

  this.rottafunction = '/getProdbyCommanda';
  return this.http.get(this.APIURL + this.rottafunction + '/' + id ,  {
        headers: this.getAuthHeader()
      });
}

getCountbyprodotto(competenza: number, id: number) {

  this.rottafunction = '/count';
  return this.http.get(this.APIURL + this.rottafunction + '/' + competenza + '/' + id ,  {
        headers: this.getAuthHeader()
      });
}


}
