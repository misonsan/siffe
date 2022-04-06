import { CommandawrigaInterface } from '../interfaces/commandawriga';

export class Commandawriga implements CommandawrigaInterface {

  id: number;
  idCommanda: number;
  idProdotto: number;
  qta: number;
   // campi da Prodotto
  descrizione_prodotto: string;
  tipologia: number;
  categoria: number;
  competenza: number;
  disponibile_Day: number;
  scorta_minima: number;
  prezzo_day : number;
  photo: string;
    	// campo derivato dalle relazioni
  d_Categoria: string;

  constructor() {
    this.id  = 0;
    this.idCommanda = 0;
    this.idProdotto = 0;
    this.qta  = 0;
    this.descrizione_prodotto = '';
    this.tipologia = 0;
    this.categoria = 0;
    this.competenza = 0;
    this.disponibile_Day = 0;
    this.scorta_minima = 0;
    this.prezzo_day = 0;
    this.photo = '';
    this.d_Categoria = '';

  }
}
