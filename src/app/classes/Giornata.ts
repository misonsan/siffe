import { GiornataInterface } from '../interfaces/giornata';


export class Giornata implements GiornataInterface {

  id: number;
  dtGiornata: Date;
  idManifestazione: number;
  stato: number;
  statoMagazzino: number;
  statoCassa: number;
  statoUtenti: number;
  operationCassa: string;
  i100: number;
  i100Valore: number;
  i050: number;
  i050Valore: number;
  i020: number;
  i020Valore: number;
  i010: number;
  i010Valore: number;
  i005: number;
  i005Valore: number;
  icontante: number;
  a100: number;
  a100Valore: number;
  a050: number;
  a050Valore: number;
  a020: number;
  a020Valore: number;
  a010: number;
  a010Valore: number;
  a005: number;
  a005Valore: number;
  acontante: number;
  f100: number;
  f100Valore: number;
  f050: number;
  f050Valore: number;
  f020: number;
  f020Valore: number;
  f010: number;
  f010Valore: number;
  f005: number;
  f005Valore: number;
  fcontante: number;
  cassaInizio: number;
  cassaAttuale: number;
  cassaFinale: number;
  numTavoli: number;
  numUtenti: number;
  numCommande: number;
  impCommande: number;
  impCoperti: number;
  note: string;
  key_utenti_operation: number;
  created_at:	Date;
  updated_at:	Date;
   // da relazioni
  d_stato_cassa: string;
  d_stato_giornata: string;
  d_stato_magazzino: string;
  d_stato_utenti: string;
  d_operation_cassa: string;

  constructor()  {

    this.id = 0;
    this.dtGiornata = new Date();
    this.idManifestazione = 0;
    this.stato = 0;
    this.statoMagazzino = 0;
    this.statoCassa = 0;
    this.statoUtenti = 0;
    this.operationCassa = 'N';
    this.i100 = 0;
    this.i050 = 0;
    this.i020 = 0;
    this.i010 = 0;
    this.i005 = 0;
    this.i100Valore = 0;
    this.i050Valore = 0;
    this.i020Valore = 0;
    this.i010Valore = 0;
    this.i005Valore = 0;
    this.icontante = 0;
    this.a100 = 0;
    this.a050 = 0;
    this.a020 = 0;
    this.a010 = 0;
    this.a005 = 0;
    this.a100Valore = 0;
    this.a050Valore = 0;
    this.a020Valore = 0;
    this.a010Valore = 0;
    this.a005Valore = 0;
    this.acontante = 0;
    this.f100 = 0;
    this.f050 = 0;
    this.f020 = 0;
    this.f010 = 0;
    this.f005 = 0;
    this.f100Valore = 0;
    this.f050Valore = 0;
    this.f020Valore = 0;
    this.f010Valore = 0;
    this.f005Valore = 0;
    this.fcontante = 0;
    this.cassaInizio = 0;
    this.cassaAttuale = 0;
    this.cassaFinale = 0;
    this.numTavoli = 0;
    this.numUtenti = 0;
    this.numCommande = 0;
    this.impCommande = 0;
    this.impCoperti = 0;
    this.note = ' ';
    this.key_utenti_operation  = 0;
    this.created_at  = new Date();
    this.updated_at = new Date();
  // da relazioni
    this.d_stato_cassa = ' ';
    this.d_stato_giornata = ' ';
    this.d_stato_magazzino = ' ';
    this.d_stato_utenti = ' ';
    this.d_operation_cassa = ' ';

  }
}
