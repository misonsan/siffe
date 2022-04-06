import { PersonaInterface } from '../interfaces/persona';


export class Persona implements PersonaInterface  {

  id: number;
  cognome: string;
  nome: string;
  photo: string;
  titolo: number;
  idStato: number;
  email: string;
  userLevel: number;
  idRuolo: number;
  idRuolo_Day: number;
  inServizio: string;
  utilizzatoCommanda: string;
  noteUtente: string;
  key_utenti_operation: number;
  created_at: Date;
  updated_at: Date;
// campo derivato dalle relazioni
  d_ruolo: string;
  d_ruolo_day: string;
  d_Titolo: string;
  UserLevelName: string;
  d_Stato_Persona: string;

  constructor()  {

    this.id = 0;
    this.cognome = '';
    this.nome = '';
    this.photo = '0.jpg';
    this.titolo = 0;
    this.idStato = 0;
    this.email = '';
    this.userLevel = 0;
    this.idRuolo = 0;
    this.idRuolo_Day = 0;
    this.inServizio = 'N';
    this.utilizzatoCommanda = 'N';
    this.noteUtente = '';
    this.key_utenti_operation = 0;
    this.created_at = new Date();
    this.updated_at = new Date();
  // campo derivato dalle relazioni
    this.d_ruolo = '';
    this.d_ruolo_day = '';
    this.d_Titolo = '';
    this.UserLevelName = '';
    this.d_Stato_Persona = '';

  }
}
