import { SpesaInterface } from '../interfaces/spesa';


export class Spesa implements SpesaInterface {

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

  constructor()  {

    this.id = 0;
    this.idFornitore = 0;
    this.stato = 0;
    this.documento = '';
    this.importo = 0;
    this.motivo = '';
    this.key_utenti_operation  = 0;
    this.created_at  = new Date();
    this.updated_at = new Date();
    	// campo derivato dalle relazioni
    this.d_stato_spesa = '';
    this.ragsociale = '';

  }

}
