import { CommandarigaInterface } from '../interfaces/commandariga';

export class Commandariga implements CommandarigaInterface {

  id: number;
  idCommanda: number;
  idProdotto: number;
  stato: number;
  prezzo: number;
  categoria: number;
  competenza: number;
  descrizione_prodotto: string;
  qta_ord: number;
  ora_inizio: Date;
  ora_lavorazione: string;
  flag_lavorazione: number;
  delayLavorazione: number;
  semaphoreLavorazione: string;
  ora_consegna: string;
  flag_consegna: number;
  delayConsegna: number;
  semaphoreConsegna: string;
  note_riga: string;
  key_utenti_operation: number;
  created_at:	Date;
  updated_at:	Date;
  // campo derivato dalle relazioni
  d_stato_riga_commanda: string;
  d_categoria: string;
  d_stato_lavorazione: string;
  d_stato_consegna: string;
  tipologia: number;

  constructor() {

    this.id = 0;
    this.idCommanda = 0;
    this.idProdotto = 0;
    this.stato = 0;
    this.prezzo = 0;
    this.categoria = 0;
    this.competenza = 0;
    this.descrizione_prodotto = '';
    this.qta_ord = 0;
    this.ora_inizio = new Date();
    this.ora_lavorazione = '';
    this.flag_lavorazione = 0;
    this.delayLavorazione = 0;
    this.semaphoreLavorazione = 'verde.jpg';
    this.ora_consegna = '';
    this.flag_consegna = 0;
    this.delayConsegna = 0;
    this.semaphoreConsegna = 'verde.jpg';
    this.note_riga = ' ';
    this.key_utenti_operation = 0;
    this.created_at = new Date();
    this.updated_at = new Date();
    // da relazioni
    this.d_stato_riga_commanda = '';
    this.d_categoria = '';
    this.d_stato_lavorazione = '';
    this.d_stato_consegna = '';
    this.tipologia = 0;
  }

}
