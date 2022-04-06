/* interfaccia tabella Spese  */

export class SpesaInterface {

  id: number;
  idFornitore: number;
  stato: number;
  documento: string;
  importo: number;
  motivo: string;
  key_utenti_operation: number;
  created_at: Date;
  updated_at: Date;
	// campo derivato dalle relazioni
  d_stato_spesa: string;
  ragsociale: string;

}
