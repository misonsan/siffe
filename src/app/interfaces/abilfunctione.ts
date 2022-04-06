/*  interfaccia della tabella Abilfunctions  */


export interface AbilfunctioneInterface {
  id: number;
  idmodulo: number;
  idlevel: number;
  enabledNull: string;
  enabledInqu: string;
  enabledEdit: string;
  key_utenti_operation: number;
  created_at:	Date;
  updated_at:	Date;
  // campi da join tabella
  UserLevelName: string;
  // campo derivato dalla relazione con tabella t_stato_manifestazione
  modulo: string;
  route: string;
}
