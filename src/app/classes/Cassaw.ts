import { CassawInterface } from '../interfaces/cassaw';

export class Cassaw implements CassawInterface {

  id: number;
  idGiornata: number;
  idTaglia: number;
  qtaInc: number;
  valoreInc: number;
  qtaRes: number;
  valoreRes: number;
  created_at:	Date;
  updated_at:	Date;

  constructor() {
    this.id = 0;
    this.idGiornata = 0;
    this.idTaglia = 0;
    this.qtaInc = 0;
    this.valoreInc = 0;
    this.qtaRes = 0;
    this.valoreRes = 0;
    this.created_at  = new Date();
    this.updated_at = new Date();


  }
}

