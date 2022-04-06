import { MoneypayInterface } from '../interfaces/moneypay';

export class Moneypay implements MoneypayInterface {

  id: number;
  idGiornata: number;
  idCommanda: number;
  idTaglia: number;
  movimento: string;
  nro_pezzi_entrata: number;
  nro_pezzi_uscita: number;
  imp_entrata: number;
  imp_uscita: number;
  key_utenti_operation: number;
  created_at: Date;
  updated_at: Date;
// da relazioni
  d_taglia: string;

  constructor()  {

    this.id = 0;
    this.idGiornata = 0;
    this.idCommanda = 0;
    this.idTaglia = 0;
    this.movimento = '';
    this.nro_pezzi_entrata = 0;
    this.nro_pezzi_uscita = 0;
    this.imp_entrata = 0;
    this.imp_uscita = 0;
    this.key_utenti_operation = 0;
    this.created_at = new Date();
    this.updated_at = new Date();
    this.d_taglia = '';
  }

}
