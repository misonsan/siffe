import { TstatoProdottoInterface } from '../interfaces/t_stato_prodotto';


export class TstatoProdotto implements TstatoProdottoInterface {

  id: number;
  d_stato_prodotto: string;
  tappo: string;
  key_utenti_operation: number;
  created_at: Date;
  updated_at: Date;

  constructor()  {

    this.id = 0;
    this.d_stato_prodotto = '';
    this.tappo = 'N';
    this.key_utenti_operation  = 0;
    this.created_at  = new Date();
    this.updated_at = new Date();

  }

}








