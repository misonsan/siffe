

export interface MoneypayInterface {

  id: number;
  idGiornata: number;
  idCommanda: number;
  idTaglia: number;
  movimento: string;
  nro_pezzi_entrata: number;
  nro_pezzi_uscita: number;
  imp_entrata: number;
  imp_uscita: number;
  key_utenti_operation: number;
  created_at: Date;
  updated_at: Date;
  // da relazioni
  d_taglia: string;
  }
