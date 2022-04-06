import { Injectable } from '@angular/core';
import { Cassawc } from './../classes/Cassawc';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CassawcService {

     // lettura dati da server Sifapi
     cassawc: Cassawc;

     private rotta = "/cassawc";
     private rottafunction = '';

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

      getAllTaglie() {
        return this.http.get(this.APIURL,  {
         headers: this.getAuthHeader()
       });
     }


    getAllTagliebyCommanda(idCommanda: number) {
      this.rottafunction = 'commandataglie';
      return this.http.get(this.APIURL + '/' + this.rottafunction + '/' + idCommanda,  {
             headers: this.getAuthHeader()
           });
         }

    getTagliabyCommanda(idCommanda: number, id: number) {
      this.rottafunction = 'commandataglia';
      return this.http.get(this.APIURL + '/' + this.rottafunction +  '/' + idCommanda + '/' + id,  {
              headers: this.getAuthHeader()
            });      // ok;
          }

      deleteTaglia(cassawc: Cassawc) {
            this.rottafunction = 'deletebyid';
            return this.http.delete(this.APIURL + '/' + this.rottafunction + '/' + cassawc.id,  {
              headers: this.getAuthHeader()
            });      // ok;
          }

          deletebyidCommanda(id: number) {
            this.rottafunction = 'deletebyidCommanda';
            return this.http.delete(this.APIURL + '/' + this.rottafunction + '/' + id,  {
              headers: this.getAuthHeader()
            });      // ok;
          }

      updateCassa(cassawc: Cassawc, idCommanda: number) {
console.log('cassawcService - update ' + JSON.stringify(cassawc) + ' Commanda: ' + idCommanda);

        this.rottafunction = 'updatebyid';
        return this.http.put(this.APIURL + '/' + this.rottafunction + '/' + cassawc.idTaglia + '/' + idCommanda, cassawc,  {
           headers: this.getAuthHeader()
        });      // ok;
      }

      createCassa(cassawc: Cassawc){
        this.rottafunction = 'create';
        return this.http.post(this.APIURL + '/' + this.rottafunction , cassawc,  {
          headers: this.getAuthHeader()
        });      // ok;
      }

      azzeraCassaFull(idCommanda: number) {

       this.rottafunction = 'azzerabyidCommandaFull';
       return this.http.put(this.APIURL + '/' + this.rottafunction + '/' + idCommanda,  {
         headers: this.getAuthHeader()
       });      // ok;
     }

     azzeraCassaResto(idCommanda: number) {

      this.rottafunction = 'azzerabyidCommandaResto';
      return this.http.put(this.APIURL + '/' + this.rottafunction + '/' + idCommanda,  {
        headers: this.getAuthHeader()
      });      // ok;
    }


     getTotaleCassa(idCommanda: number) {

       this.rottafunction = 'totaliidCommanda';
       return this.http.get(this.APIURL + '/' + this.rottafunction + '/' + idCommanda,  {
         headers: this.getAuthHeader()
       });      // ok;
     }



     updateCassaTest(cassawc: Cassawc) {
              console.log('cassawcService - updateCassaTest ' + JSON.stringify(cassawc) + ' Commanda: ' + cassawc.idCommanda);
              this.rottafunction = 'updatebyidTest';
              return this.http.put(this.APIURL + '/' + this.rottafunction + '/' + cassawc.idTaglia + '/' + cassawc.idCommanda, {cassawc: Cassawc } ,  {
                 headers: this.getAuthHeader()
              });      // ok;
            }

           deleteTagliabyCommanda(cassawc: Cassawc) {
              this.rottafunction = 'deleteTagliaByidCommanda';
              return this.http.delete(this.APIURL + '/' + this.rottafunction +  '/' + cassawc.idTaglia + '/' + cassawc.idCommanda,  {
                      headers: this.getAuthHeader()
                    });      // ok;
                  }


          updateCassaResto(cassawc: Cassawc) {
                    console.log('cassawcService - updateCassaResto ' + JSON.stringify(cassawc) + ' Commanda: ' + cassawc.idCommanda);
                    this.rottafunction = 'updateRestobyid';
                    return this.http.put(this.APIURL + '/' + this.rottafunction + '/' + cassawc.idTaglia + '/' + cassawc.idCommanda,
                    cassawc ,  {
                       headers: this.getAuthHeader()
                    });      // ok;
                  }


          getAllTaglieNoMoneybyCommanda(idCommanda: number) {
                    this.rottafunction = 'commandataglieNoMoney';
                    return this.http.get(this.APIURL + '/' + this.rottafunction + '/' + idCommanda,  {
                           headers: this.getAuthHeader()
                         });
                 }


}

