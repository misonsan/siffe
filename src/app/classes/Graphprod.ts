import { GraphprodInterface } from '../interfaces/graphprod';


export class Graphprod implements GraphprodInterface {

  id: number;
  descrizione: string;
  ntot: number;
  ndacuc: number;
  ndacons: number;
  nevasi: number;

  constructor()  {

    this.id = 0;
    this.descrizione = '';
    this.ntot = 0;
    this.ndacuc = 0;
    this.ndacons = 0;
    this.nevasi = 0;

  }
}
