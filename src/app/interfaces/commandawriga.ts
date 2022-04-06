/*  interfaccia della tabella Commandawriga  */


export interface CommandawrigaInterface {

  id: number;
  idCommanda: number;
  idProdotto: number;
  qta: number;
  // campi da Prodotto
  descrizione_prodotto: string;
  tipologia: number;
  categoria: number;
  competenza: number;
  disponibile_Day: number;
  scorta_minima: number;
  prezzo_day: number;
  photo: string;

    // campo derivato dalle relazioni
  d_Categoria: string;

}
