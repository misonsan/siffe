import { ManifestazioneInterface } from './../interfaces/manifestazione';

export class Manifestazione implements ManifestazioneInterface {


  id: number;
  descManif: string;
  anno: number;
  dtInizio: Date;
  dtFine: Date;
  buonoPastoCommanda: number;
  impCoperto: number;
  numTavoli: number;
  numCommandeTot: number;
  numUtentiTot: number;
  nettoSerataTot: number;
  impCommandeTot: number;
  impCopertoTot: number;
  noteManifestazione: string;
  stato: number;
  key_utenti_operation: number;
  stampeBackOffice: string;
  created_at: Date;
  updated_at: Date;
  // da relazione con t_stato_manifestazione
  d_stato_manifestazione: string;

  constructor() {
    this.id = 0;
    this.descManif = '';
    this.anno = 0;
    this.dtInizio = new Date();
    this.dtFine = new Date();
    this.buonoPastoCommanda = 0;
    this.impCoperto = 0;
    this.numTavoli = 0;
    this.numCommandeTot = 0;
    this.numUtentiTot = 0;
    this.nettoSerataTot = 0;
    this.impCommandeTot = 0;
    this.impCopertoTot = 0;
    this.noteManifestazione = '';
    this.stato = 0;
    this.key_utenti_operation = 0;
    this.stampeBackOffice = 'N';
    this.created_at = new Date();
    this.updated_at = new Date();
    this.d_stato_manifestazione = '';

  }
}
