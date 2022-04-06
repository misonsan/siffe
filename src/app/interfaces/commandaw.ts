/*  interfaccia della tabella Commandaw  */

export interface CommandawInterface {
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
}

