/* interfaccia della tabella Giornata */

export interface GiornataInterface {

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
  // campo derivato dalla relazione con tabella t_stato_manifestazione
  d_stato_giornata: string;
  d_stato_cassa: string;
  d_stato_magazzino: string;
  d_stato_utenti: string;
  d_operation_cassa: string;

}
