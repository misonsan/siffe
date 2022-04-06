
/*  interfaccia della tabella Cassawc  */



export interface CassawcInterface {
  id: number;
  idCommanda: number;
  idTaglia: number;
  tipoMov: string;
  qtaInc: number;
  valoreInc: number;
  qtaRes: number;
  valoreRes: number;
  created_at:	Date;
  updated_at:	Date;
  // campo derivato dalle relazioni
  valore_taglia: number;
}
