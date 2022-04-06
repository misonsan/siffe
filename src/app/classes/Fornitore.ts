import { FornitoreInterface } from '../interfaces/fornitore';


export class Fornitore implements FornitoreInterface  {

  id: number;
  ragsociale: string;
  indirizzo: string;
  cap: string;
  localita: string;
  stato: number;
  settore: number;
  telefono: string;
  email: string;
  importo: number;
  notefornitore: string;
  key_utenti_operation: number;
  created_at: Date;
  updated_at: Date;
// campo derivato dalle relazioni
  d_settore: string;
  d_Stato_fornitore: string;
  constructor()  {

    this.id = 0;
    this.ragsociale = '';
    this.indirizzo = '';
    this.cap = '';
    this.localita = '';
    this.stato = 0;
    this.settore = 0;
    this.telefono = '';
    this.email = '';
    this.importo = 0;
    this.notefornitore = '';
    this.key_utenti_operation = 0;
    this.created_at = new Date();
    this.updated_at = new Date();
  // campo derivato dalle relazioni
    this.d_settore = '';
    this.d_Stato_fornitore = '';

  }
}
