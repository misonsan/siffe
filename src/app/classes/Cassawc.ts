import { CassawcInterface } from '../interfaces/cassawc';

export class Cassawc implements CassawcInterface {

  id: number;
  idCommanda: number;
  idTaglia: number;
  tipoMov: string;
  qtaInc: number;
  valoreInc: number;
  qtaRes: number;
  valoreRes: number;
  created_at:	Date;
  updated_at:	Date;
  // campo derivato dalle relazioni
  valore_taglia: number;

  constructor() {
    this.id = 0;
    this.idCommanda = 0;
    this.idTaglia = 0;
    this.tipoMov = '';
    this.qtaInc = 0;
    this.valoreInc = 0;
    this.qtaRes = 0;
    this.valoreRes = 0;
    this.created_at  = new Date();
    this.updated_at = new Date();
    // campo derivato dalle relazioni
    this.valore_taglia = 0;
  }
}

