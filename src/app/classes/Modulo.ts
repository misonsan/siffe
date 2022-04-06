import { ModuloInterface } from '../interfaces/modulo';


export class Modulo implements ModuloInterface {

  id: number;
  modulo: string;
  route: string;
  key_utenti_operation: number;
  created_at: Date;
  updated_at: Date;

  constructor() {

    this.id 	= 0;
    this.modulo = '';
    this.route = '';
    this.key_utenti_operation = 0;
    this.created_at = new Date();
    this.updated_at = new Date();

  }

}


