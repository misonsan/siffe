import { TstatofornitoreInterface } from '../interfaces/t_stato_fornitore';


export class TstatoFornitore implements TstatofornitoreInterface {

  id: number;
  d_stato_fornitore: string;
  tappo: string;
  key_utenti_operation: number;
  created_at: Date;
  updated_at: Date;

  constructor()  {

    this.id = 0;
    this.d_stato_fornitore = '';
    this.tappo = 'N';
    this.key_utenti_operation  = 0;
    this.created_at  = new Date();
    this.updated_at = new Date();

  }

}
