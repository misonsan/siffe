import { TruolowebInterface } from '../interfaces/t_ruolo_web';


export class Truoloweb implements TruolowebInterface {

  id: number;
  d_ruolo_web: string;
  tappo: string;
  key_utenti_operation: number;
  created_at:	Date;
  updated_at:	Date;

  constructor()  {

    this.id = 0;
    this.d_ruolo_web = '';
    this.tappo = 'N';
    this.key_utenti_operation  = 0;
    this.created_at  = new Date();
    this.updated_at = new Date();

  }
}
