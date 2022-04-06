import { CassacInterface } from '../interfaces/cassac';

export class Cassac implements CassacInterface {

  id: number;
  idCommanda: number;
  idTaglia: number;
  tipoMov: string;
  qtaInc: number;
  valoreInc: number;
  qtaRes: number;
  valoreRes: number;
  key_utenti_operation: number;
  created_at:	Date;
  updated_at:	Date;

  constructor() {
    this.id = 0;
    this.idCommanda = 0;
    this.idTaglia = 0;
    this.tipoMov = '';
    this.qtaInc = 0;
    this.valoreInc = 0;
    this.qtaRes = 0;
    this.valoreRes = 0;
    this.key_utenti_operation = 0;
    this.created_at  = new Date();
    this.updated_at = new Date();
  }
}
