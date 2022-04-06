import { CommandaInterface } from './../interfaces/commanda';

export class Commanda implements CommandaInterface {

  id: number;
  idSanfra: number;
  idprenotazione: number;
  idpersona: number;
  anagrafica_cliente: string;
  idGiornata: number;
  dtCommanda: Date;
  stato: number;
  semaphore: string;
  delay: number;
  statoContabile: number;
  statoCucina: number;
  statoBevande: number;
  buonoPasto: number;
  numTavolo: number;
  numPersone: number;
  cassaAttuale: number;
  numProdotti: number;
  importoProdotti: number;
  importoCoperto: number;
  importodaPagare: number;
  importoPagato: number;
  resto: number;
  numProdottiCucina: number;
  numProdottiBevande: number;
  noteCommanda: string;
  stampaEseguita: string;
  key_utenti_operation: number;
  created_at:	Date;
  updated_at:	Date;
// campo derivato dalle relazioni
  d_stato_bevande: string;
  d_stato_commanda: string;
  d_stato_Contabile: string;
  d_stato_Cucina: string;

  constructor() {
        this.id  = 0;
        this.idSanfra = 0;
        this.idprenotazione = 0;
        this.idpersona = 0;
        this.anagrafica_cliente  = '';
        this.idGiornata = 0;
        this.dtCommanda  = new Date();
        this.stato  = 0;
        this.semaphore = 'verde.jpg';
        this.delay = 0;
        this.statoContabile  = 0;
        this.statoCucina  = 0;
        this.statoBevande  = 0;
        this.buonoPasto = 0;
        this.numTavolo  = 0;
        this.numPersone  = 0;
        this.cassaAttuale  = 0;
        this.numProdotti  = 0;
        this.importoProdotti  = 0;
        this.importoCoperto  = 0;
        this.importodaPagare = 0;
        this.importoPagato  = 0;
        this.resto  = 0;
        this.numProdottiCucina = 0;
        this.numProdottiBevande = 0;
        this.noteCommanda  = '';
        this.stampaEseguita  = 'N';
        this.key_utenti_operation  = 0;
        this.created_at = new Date();
        this.updated_at = new Date();

    // campo derivato dalle relazioni
        this.d_stato_bevande = '';
        this.d_stato_commanda = '';
        this.d_stato_Contabile = '';
        this.d_stato_Cucina = '';



  }
}


