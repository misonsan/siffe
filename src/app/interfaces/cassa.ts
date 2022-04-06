
/*  interfaccia della tabella Cassa  */



export interface CassaInterface {
  id: number;
  idGiornata: number;
  idTaglia: number;
  qtaIn: number;
  valoreIn: number;
  qtaAc: number;
  valoreAc: number;
  qtaFi: number;
  valoreFi: number;
  qtaSb: number;
  valoreSb: number;
  key_utenti_operation: number;
  created_at:	Date;
  updated_at:	Date;
  // campo derivato dalle relazioni
  valore_taglia: number;
}


