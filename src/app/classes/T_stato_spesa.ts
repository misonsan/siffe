
import { TstatospesaInterface } from '../interfaces/t_stato_spesa';


export class Tstatospesa implements TstatospesaInterface {

  id: number;
  tipo: string;
  d_stato_spesa: string;
  tappo: string;
  key_utenti_operation: number;
  created_at: Date;
  updated_at: Date;

  constructor()  {

    this.id = 0;
    this.tipo = '';
    this.d_stato_spesa = '';
    this.tappo = 'N';
    this.key_utenti_operation  = 0;
    this.created_at  = new Date();
    this.updated_at = new Date();

  }

}























