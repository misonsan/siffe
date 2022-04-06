/* interfaccia tabella MoneyPayment  */

export class MoneypaymentInterface  {

  id: number;
  idGiornata: number;
  idCommanda: number;
  taglia: number;
  nro_pezzi_entrata: number;
  nro_pezzi_uscita: number;
  imp_entrata: number;
  imp_uscita: number;
  key_utenti_operation: number;
  created_at:	Date;
  updated_at:	Date;
  // da relazioni
  d_taglia: string;

}
