

import { TcategoriaProdottoiInterface } from './../interfaces/t_categoria_prodotto';


export class TcategoriaProdotto implements TcategoriaProdottoiInterface  {

  id: number;
  d_categoria: string;
  tappo: string;
  key_utenti_operation: number;
  created_at: Date;
  updated_at: Date;

  constructor()  {

    this.id = 0;
    this.d_categoria = '';
    this.tappo = 'N';
    this.key_utenti_operation = 0;
    this.created_at = new Date();
    this.updated_at = new Date();

  }

}
