import { CassaInterface } from '../interfaces/cassa';

export class Cassa implements CassaInterface {

  id: number;
  idGiornata: number;
  idTaglia: number;
  qtaIn: number;
  valoreIn: number;
  qtaAc: number;
  valoreAc: number;
  qtaFi: number;
  valoreFi: number;
  qtaSb: number;
  valoreSb: number;
  key_utenti_operation: number;
  created_at:	Date;
  updated_at:	Date;
 // campo derivato dalle relazioni
  valore_taglia: number;

  constructor() {
    this.id = 0;
    this.idGiornata = 0;
    this.idTaglia = 0;
    this.qtaIn = 0;
    this.valoreIn = 0;
    this.qtaAc = 0;
    this.valoreAc = 0;
    this.qtaFi = 0;
    this.valoreFi = 0;
    this.qtaSb = 0;
    this.valoreSb = 0;
    this.key_utenti_operation = 0;
    this.created_at  = new Date();
    this.updated_at = new Date();
     // campo derivato dalle relazioni
    this.valore_taglia = 0;
  }
}
