
/*  interfaccia della tabella CommandaRiga  */



export interface CommandarigaInterface {

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

}




