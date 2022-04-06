import { Injectable } from '@angular/core';
import { Tsettore } from '../classes/T_settore';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class TsettoreService {

  private rotta = "/tsettore";
  private rottalast = "/settorelast/lastid";
  private rottafunction = '';

  // vecchia versione senza environment
  //  private APIURL = 'http://localhost:8000/users';  // definisco l'url su cui effettuare la lettura sul server

  private APIURL = environment.APIURL + this.rotta;  // definisco l'url su cui effettuare la lettura sul server
  private APIURLLAST = environment.APIURL + this.rottalast;

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
    return this.http.get(this.APIURL,  {
    headers: this.getAuthHeader()
    });      // ok      // ok      // ok

}

getSettore(id: number) {
    return this.http.get(this.APIURL + '/' + id,  {
    headers: this.getAuthHeader()
    });      // ok      // ok
}

deleteSettore(settore: Tsettore) {
this.rottafunction = 'deletebyid';
return this.http.delete(this.APIURL + '/' + this.rottafunction + '/' + settore.id,  {
headers: this.getAuthHeader()
});      // ok      // ok

}



updateSettore(settore: Tsettore) {
    this.rottafunction = 'updatebyid';
    return this.http.put(this.APIURL + '/' + this.rottafunction + '/' + settore.id, settore,  {
    headers: this.getAuthHeader()
    });      // ok      // ok

}


createSettore(settore: Tsettore){
    this.rottafunction = 'create';
    return this.http.post(this.APIURL + '/' + this.rottafunction, settore,  {
    headers: this.getAuthHeader()
    });      // ok      // ok
}



}


