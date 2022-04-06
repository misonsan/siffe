/*  interfaccia per manifestazione  */


export interface ManifestazioneInterface {

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
  // campo derivato dalla relazione con tabella t_stato_manifestazione
  d_stato_manifestazione: string;

}
