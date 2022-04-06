
/*  interfaccia della tabella Cassac  */

import { LocalizedString } from "@angular/compiler";



export interface CassacInterface {
  id: number;
  idCommanda: number;
  idTaglia: number;
  tipoMov: string;
  qtaInc: number;
  valoreInc: number;
  qtaRes: number;
  valoreRes: number;
  key_utenti_operation: number;
  created_at:	Date;
  updated_at:	Date;
}
