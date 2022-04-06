
import { ProdottoInterface } from '../interfaces/prodotto';


export class Prodotto implements ProdottoInterface  {

  id: number;
  descrizione: string;
  stato: number;
  tipologia: number;
  categoria: number;
  competenza: number;
  disponibile: number;
  disponibile_Day: number;
  scorta_minima: number;
  aMenu: string;
  prezzo: number;
  prezzo_day: number;
  qta_vendute: number;
  residuo: number;
  photo: string;
  selectedDay: string;
  key_utenti_operation: number;
  created_at: Date;
  updated_at: Date;
	// campo derivato dalle relazioni
  d_stato_prodotto: string;
  d_Competenza: string;
  d_categoria: string;
  d_tipologia: string;

  constructor()  {

    this.id = 0;
    this.descrizione = '';
    this.stato = 0;
    this.tipologia = 0;
    this.categoria = 0;
    this.competenza = 0;
    this.disponibile = 0;
    this.disponibile_Day = 0;
    this.scorta_minima = 0;
    this.aMenu = 'N';
    this.prezzo = 0;
    this.prezzo_day = 0;
    this.qta_vendute = 0;
    this.residuo = 0;
    this.photo = '0.jpg';
    this.selectedDay = 'N';
    this.key_utenti_operation = 0;
    this.created_at = new Date();
    this.updated_at = new Date();
    // relazioni
    this.d_stato_prodotto = '';
    this.d_Competenza = '';
    this.d_categoria	 = '';
    this.d_tipologia = '';
  }
}
