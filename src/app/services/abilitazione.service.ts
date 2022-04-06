import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Abilitazione } from '../classes/abilitazione';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AbilitazioneService {

  private rotta = '/abilitazione';

  private rottafunction = '';

  constructor(private http: HttpClient) { }

  // connessione tra backend e frontend

  apiUrl = environment.APIURL + this.rotta;

  abilitazione: Abilitazione;
  // lettura tutti gli utenti

  getAllbyUser(id:number):Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // inserimento nuovo utente
  createNew(data:any):Observable<any> {
    console.log(data,'abilitazioneService - CreateNew');
    return this.http.post(`${this.apiUrl}`, data);
  }

  // cancellazione utente
  delete(id:number):Observable<any>  {
    console.log('cancellazione richiesta reset: ' + id);
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


  update(data:any,id:number):Observable<any> {
    this.rottafunction = "updatebyid";
    console.log(`aggiornamento richiesta abilitazione ${id} `);
    return this.http.put(`${this.apiUrl}/${this.rottafunction}/${id}`, data);
  }

  getAbilUserbyId(id:number):Observable<any> {
    return this.http.get(`${this.apiUrl}/abil/${id}`);
  }


}
