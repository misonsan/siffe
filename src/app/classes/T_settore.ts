import { TsettoreInterface } from '../interfaces/t_settore';


export class Tsettore implements TsettoreInterface {

  id: number;
  d_settore: string;
  tappo: string;
  key_utenti_operation: number;
  created_at:	Date;
  updated_at:	Date;

  constructor()  {

    this.id = 0;
    this.d_settore = '';
    this.tappo = 'N';
    this.key_utenti_operation  = 0;
    this.created_at  = new Date();
    this.updated_at = new Date();

  }

}
