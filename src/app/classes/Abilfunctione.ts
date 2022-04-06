import { AbilfunctioneInterface } from '../interfaces/abilfunctione';

export class Abilfunctione implements AbilfunctioneInterface {
  id: number;
  idmodulo: number;
  idlevel: number;
  enabledNull: string;
  enabledInqu: string;
  enabledEdit: string;
  key_utenti_operation: number;
  created_at:	Date;
  updated_at:	Date;
  // campi da join tabella userlevels
  UserLevelName: string;
  // campo derivato dalla relazione con tabella modulis
  modulo: string;
  route: string;

  constructor() {

    this.id  = 0;
    this.idmodulo = 0;
    this.idlevel = 0;
    this.enabledNull = 'Y';
    this.enabledInqu = 'N';
    this.enabledEdit = 'N';
    this.key_utenti_operation  = 0;
    this.created_at = new Date();
    this.updated_at = new Date();
    // campi da join tabella
    this.UserLevelName = '';
    // campi join
    this.modulo = '';
    this.route = '';
  }
}

