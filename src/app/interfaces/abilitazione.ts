/*  interfaccia della tabella Abilitazioni  */


export interface AbilitazioneInterface {
  id: number;
  idUtente: number;
  funzione: string;
  enabledNull: string;
  enabledInqu: string;
  enabledEdit: string;
  presentNote: string;
  noteEnabled: string;
  key_utenti_operation: number;
  created_at:	Date;
  updated_at:	Date;
}

