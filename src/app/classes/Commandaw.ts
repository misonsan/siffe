import { CommandawInterface } from './../interfaces/commandaw';

export class Commandaw implements CommandawInterface {

  id: number;
  idGiornata: number;
  idSanfra: number;
  idprenotazione: number;
  idpersona: number;
  anagrafica_cliente: string;
  stato: number;
  buonoPasto: number;
  numTavolo: number;
  numPersone: number;
  numProdotti: number;
  importoProdotti: number;
  importoCoperto: number;
  importodaPagare: number;
  dtCommanda: Date;
  importoPagato: number;
  resto: number;
  noteCommanda: string;
  stampaEseguita: string;
  created_at:	Date;
  updated_at:	Date;
// campo derivato dalle relazioni
  d_stato_commanda: string;

  constructor() {
    this.id  = 0;
    this.idGiornata = 0;
    this.idSanfra = 0;
    this.idprenotazione = 0;
    this.idpersona = 0;
    this.anagrafica_cliente  = '';
    this.stato = 0;
    this.buonoPasto = 0;
    this.numTavolo  = 0;
    this.numPersone  = 0;
    this.numProdotti  = 0;
    this.importoProdotti  = 0;
    this.importoCoperto  = 0;
    this.importodaPagare = 0;
    this.dtCommanda  = new Date();
    this.importoPagato  = 0;
    this.resto  = 0;
    this.noteCommanda  = '';
    this.stampaEseguita = 'N';
    this.created_at = new Date();
    this.updated_at = new Date();
    // campo derivato dalle relazioni
    this.d_stato_commanda = '';

  }
}
