import { AbilitazioneInterface } from '../interfaces/abilitazione';

export class Abilitazione implements AbilitazioneInterface {
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

  constructor() {
    this.id  = 0;
    this.idUtente = 0;
    this.funzione  = '';
    this.enabledNull = 'N';
    this.enabledInqu = 'N';
    this.enabledEdit = 'N';
    this.presentNote = 'N';
    this.noteEnabled  = '';
    this.key_utenti_operation  = 0;
    this.created_at = new Date();
    this.updated_at = new Date();

  }
}




