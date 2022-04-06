

export interface FornitoreInterface {

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


}

