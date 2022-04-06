import { TruolodayInterface } from '../interfaces/t_ruolo_day';


export class Truoloday implements TruolodayInterface {

  id: number;
  d_ruolo_day: string;
  tappo: string;
  key_utenti_operation: number;
  created_at:	Date;
  updated_at:	Date;

  constructor()  {

    this.id = 0;
    this.d_ruolo_day = '';
    this.tappo = 'N';
    this.key_utenti_operation  = 0;
    this.created_at  = new Date();
    this.updated_at = new Date();

  }
}
