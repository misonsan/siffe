import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faPlusSquare, faSearch, faSave, faUserEdit, faMinus, faPlus, faWindowClose, faTrash, faReply, faUndo, faHandPointLeft,
         faTrashAlt, faInfoCircle, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
//import { CommonModule, CurrencyPipe} from '@angular/common';

import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
// classe
import { Giornata } from '../../../classes/Giornata';
import { Manifestazione } from '../../../classes/Manifestazione';
import { Commanda } from '../../../classes/Commanda';
import { Commandariga } from '../../../classes//Commandariga';
// services
import { ManifestazioneService } from './../../../services/manifestazione.service';
import { GiornataService } from './../../../services/giornata.service';
import { CtrfuncService } from './../../../services/ctrfunc.service';
import { CommandaService } from './../../../services/commanda.service';
import { CommandarigaService } from './../../../services/commandariga.service';
// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-giornata-detail-commande',
  templateUrl: './giornata-detail-commande.component.html',
  styleUrls: ['./giornata-detail-commande.component.css']
})
export class GiornataDetailCommandeComponent implements OnInit {


  public title = 'situagione giornaliera Commande  -  giornata-detail-commande works!';

  // icone
    faPlusSquare = faPlusSquare;
    faSearch = faSearch;
    faSave = faSave;
    faUserEdit = faUserEdit;
    faMinus = faMinus;
    faPlus = faPlus;
    faWindowClose = faWindowClose;
    faTrash = faTrash;
    faReply = faReply;

    faUndo = faUndo;
    faHandPointLeft = faHandPointLeft;
    faTrashAlt = faTrashAlt;
    faInfoCircle = faInfoCircle;
    faThumbsUp = faThumbsUp;
    faThumbsDown = faThumbsDown;

    // variabili per editazione messaggio
    public alertSuccess = false;
    public savechange = false;
    public isVisible = false;

    public nRecMan = 0;
    public nRec = 0;
    public trovatoRec = false;
    public Message = '';
    public isSelected = false;

    public saveValueStd: boolean;
    public lastNumber = 0;
    public fase = '';


    public isLoading = false;
    public fieldVisible = false;
    public messageTest1  = 'Operazione conclusa correttamente ';

    // variabili per visualizzazione messaggio di esito con notifier
    public type = '';
    public message = '';

    public statoStampa = '';

  // parametri per interfaccia a ghost
    // Parametri obbligatori:
    // - routeApp
    // parametri facoltativi
    // keyn ---->  se numerico trasformarlo in stringa
    // tipo
    //     S--> campo string
    //     N--> campo Numerico
    //     *--> non serve key

    // se impostato tipo = '*'  va impostato anche key a '*'

    public routeApp = '';
    public keyn = 0;
    public keys = '';
    public tipo = '';


    public href = '';
    public idpassed = 0;

    public functionInqu =  false;
    public functionEdit = false;
    public functionEdits = false;
    public functionNew = false;

    // funzioni di navigazione
    public navigateNew = 'new';
    public navigateInqu = 'inqu';
    public navigateEdit = 'edit';
    public navigateEdits = 'edits';

    public functionUser = '';

    public statoModulo  = '?';
    public ricercaIniziale = '';

    closeResult = '';

    public level = 0;
    public nRecord = 0;
    public enabledFunc = false;
    public rotta = '';
    public rottaId = 0;
    public rottaIdManif = 0;
    public rottaFunz = '';
    public rottaTipo = '';

  // variabili per editazione messaggio

  public Message1 = '';
  public Message2 = '';
  public Message3 = '';
  public Message1err = 'Contattare il gestore dell applicazione.';

  public isValid = false;
  public idManif = 0;
  public idGiornata = 0;

  // per gestione abilitazione funzioni con service Moreno

  public functionUrl = '';

  public searchInqu = 'Inqu';
  public searchEdit = 'Edit';
  public searchEdits = 'Edits';
  public searchNew = 'New';

  public functionUrlUp = '';
  public functionUserUp = '';


    // ---------------------  personalizzazioni componente



public textMessage1 = '';
public textMessage2 = '';
public textUser = '';



public manif: Manifestazione;
public giornata: Giornata;
public commande: Commanda[] = [];
public commandenull: Commanda[] = [];
public commandarighe: Commandariga[] = [];
public commandarighenull: Commandariga[] = [];

public tipoRichiesta = '?';
public ricManif = 0;
public validSearch = false;
private textMessage = '';
public nDay = 0;
public statoRic = 0;

public searchText = '';

public Tnumero = 0;
public Tnumpersone = 0;
public Tcoperto = 0;
public Tpagato = 0;

public TcopertoStr = '';
public TpagatoStr = '';


options = [
  'Tutte',
  'Evase',
  'Gestione',
 ];

 options1 = [
  'Cucina',
  'Bevande',
  ];

  options2 = [
    'Lavorazione',
    'Consegna',
    ];

    options3 = [
      'Commanda',
      'Prodotto',
      'Tempo',
      ];

// per paginazone
p: number = 1;

public visibleGestione = false;
public visibleNormale = false;
public visibleCucina = false;
public visibleInSceltaGestione = false;
public competenza = 0;

public messaggiotest = 'Test - da completare quando pronti dati significativi di commande registrate';

constructor(public modalService: NgbModal,
            private ctrfuncService: CtrfuncService,
            private giornataService: GiornataService,
            private manifestazioneService: ManifestazioneService,
            private commandaService: CommandaService,
            private commandarigaService: CommandarigaService,
            private route: ActivatedRoute,
            private router: Router,
            private datePipe: DatePipe,
       //     private currencyPipe: CurrencyPipe,
            private notifier: NotifierService) {
                   this.notifier = notifier;
               }

     ngOnInit(): void {

      console.log('giornata-detail-Cassa - sono in oninit ');

      this.checkFunctionbylevel();

    }

    checkFunctionbylevel() {
      //  ----- parte comune a tutti i moduli
     this.rotta = this.route.snapshot.url[0].path;
     this.level = parseInt(localStorage.getItem('user_ruolo'));
     this.functionUrl = this.route.snapshot.url[2].path;
     this.rottaTipo = this.route.snapshot.url[1].path;

     if(this.route.snapshot.url[1].path !== 'new') {
       this.rottaId =  parseInt(this.route.snapshot.url[3].path);
       this.rottaIdManif =  parseInt(this.route.snapshot.url[4].path);
      } else {
       this.rottaId =  0;
       this.rottaIdManif =  parseInt(this.route.snapshot.url[4].path);
      }


   //  console.log('Rotta: ' + JSON.stringify(this.route.url));
     console.log('Rotta: ' + this.route.url);

     console.log('frontend - checkFunctionbylevel -- step_01');
     console.log('frontend - checkFunctionbylevel -- functionUrl:  --> ' + this.functionUrl);
     console.log('frontend - checkFunctionbylevel -- functionUrl:  --> ' + this.rottaTipo);
     console.log('frontend - checkFunctionbylevel -- rottaId ' + this.rottaId);
     console.log('frontend - checkFunctionbylevel -- rottaIdManif ' + this.rottaIdManif);


  //    path: 'giornata/new/:idManif',
  //    path: 'giornata/inqu/:id/:idManif',


     this.ctrfuncService.checkFunctionbylevelDetail(this.rotta, this.level, this.functionUrl).subscribe(
       response =>{

         console.log('frontend - checkFunctionbylevel -- step_02 ' + response['rc']);

         if(response['rc'] === 'ko') {
           this.isVisible = true;
           this.alertSuccess = false;
           this.type = 'error';
           this.Message = response['message'];
           this.showNotification(this.type, this.Message);
           return;
         }
         if(response['rc'] === 'ok') {
           this.functionUser = response['data'];
   //  ----- fine parte comune a tutti i moduli

      // caricamento di eventuali tabelle per select

     //  parte personalizzabile
           console.log('frontend - checkFunctionbylevelDetail - funzione determinata: ' + this.functionUser);
        //   console.log('messaggio: ' + response['message']);

           this.functionInqu =  false;
           this.functionEdit = false;
           this.functionEdits = false;
           this.functionNew = false;

           if(this.level === -1) {
            if(this.functionUser === this.searchEdit) {
              this.functionEdit = true;
            }
            if(this.functionUser === this.searchEdits) {
              this.functionEdits = true;
            }
            if(this.functionUser === this.searchNew) {
              this.functionNew = true;
            }
           } else {
            if(this.functionUser === this.searchInqu) {
              this.functionInqu = true;
            }
           }

           console.log('dopo test su funzione determinata - functionUser ' + this.functionUser);
           console.log('functionInqu ' + this.functionInqu);
           console.log('functionNew ' + this.functionNew);
           console.log('functionEdit ' + this.functionEdit);
           console.log('functionEdits' + this.functionEdits);


           this.isVisible = true;
           this.alertSuccess = true;

                //  leggo la manifestazione
           this.route.paramMap.subscribe(x => {
           this.idManif = +x.get('idManif');
           this.loadManif(this.idManif);
           });

           if(this.functionNew) {
             this.giornata = new Giornata();
             this.giornata.key_utenti_operation = +localStorage.getItem('id');
             this.title = 'Inserimento Giornata Manifestazione';
             this.fase = 'N';
             this.Message = `Inserire i dati della Giornata`;
           } else {
   //            this.calcolaProdottiaMenu();
               this.route.paramMap.subscribe(p => {
                 this.idGiornata = +p.get('id');
                 console.log('id recuperato: ' + this.idGiornata);
                 // -------  leggo i dati della giornata
                 this.loadGiornata(this.idGiornata);
                 this.loadTotali(this.idGiornata);
                 this.loadCommande();
                 this.tipoRichiesta = 'Tutte';
                 this.onSelectionChange(this.tipoRichiesta);
// da personalizzare i prodotti

                /*

                 if(this.nrecanoSelect === 0) {
                  this.EnabledRilascia =  true;
                  } else {
                  this.EnabledRilascia =  false;
                  }
                  */
                 if(this.functionEdit || this.functionEdits) {
                  // this.title = 'Situazione Giornaliera Commande';  il titolo è già preinpostato
                   this.fase = 'M';
                  } else {
                   this.title = 'Visualizzazione Giornaliera Commande';
                   this.fase = 'I';
                  }
                 this.Message = 'Situazione Attuale Commande ';
              });

               //  fine parte personalizzabile
         }
           this.type = 'success';
           this.showNotification(this.type, this.Message);
        }
       },
       error =>
           {
             this.isVisible = true;
             this.alertSuccess = false;
             this.type = 'error';
             this.Message = 'Errore controllo Modulo' + '\n' + error.message;
             this.showNotification(this.type, this.Message);
             console.log(error);
           });

    }


  async loadGiornata(id: number) {
      let res = await this.giornataService.getGiornata(id).subscribe(
      response => {
          this.giornata = response['data'];
          this.giornata.key_utenti_operation = +localStorage.getItem('id');
          localStorage.removeItem('idGiornata');
          localStorage.setItem('idGiornata', JSON.stringify(this.giornata.id));

          console.log(`----------------->     loadGiornata - fatto lettura`);
      },
      error => {
      alert('giornata-detail-prodotti  --loadGiornata: ' + error.message);
      console.log(error);
      this.isVisible = true;
      this.alertSuccess = false;
      this.type = 'error';
      this.Message = 'Errore loadGiornata' + '\n' + error.message;
      this.showNotification(this.type, this.Message);
      });

}

  async  loadManif(id: number) {
      console.log(`loadManif - appena entrato`);
      let rc = await this.manifestazioneService.getManifestazione(id).subscribe(
       resp => {
             console.log(`loadManif:  ${JSON.stringify(resp['data'])} `);
             this.manif = resp['data'];
             this.manif.key_utenti_operation = +localStorage.getItem('id');

         //    this.loadlastDay(this.idManif);
             console.log('fatto lettura manif: ' + this.manif.id);
           //  this.type = 'success';
          //   this.Message = 'situazione attuale Manifestazione';
          //   this.alertSuccess = true;
          },
       error => {
            alert('sono in loadManif - error');
            this.isVisible = true;
            this.alertSuccess = false;
            console.log('loadManif - errore: ' + error);
            this.type = 'error';
            this.Message = error.message;
            this.alertSuccess = false;
            this.showNotification(this.type, this.Message);
          });
     }

    async loadTotali(id: number) {

      console.log(`loadTotali - appena entrato`);
      let rc = await this.commandaService.getConteggiByGiornataId(id).subscribe(
       resp => {
             console.log(`loadTotali:  ${JSON.stringify(resp['data'])} `);
             this.Tnumero = resp['numero'];
             this.Tnumpersone = resp['numpersone'];
             this.Tcoperto = resp['coperto'];
             this.Tpagato = resp['pagato'];
         //    this.loadlastDay(this.idManif);
             console.log('fatto lettura totali: ');
           //  this.type = 'success';
          //   this.Message = 'situazione attuale Manifestazione';
          //   this.alertSuccess = true;
          },
       error => {
            alert('sono in loadTotali - error');
            this.isVisible = true;
            this.alertSuccess = false;
            console.log('loadTotali - errore: ' + error);
            this.type = 'error';
            this.Message = error.message;
            this.alertSuccess = false;
            this.showNotification(this.type, this.Message);
          });
     }







/**
 * Show a notification
 *
 * @param {string} type    Notification type
 * @param {string} message Notification message
 */

showNotification( type: string, message: string ): void {

this.notifier.notify( type, message );
console.log(`sono in showNotification  ${type}`);

}


backToGiornata() {
alert('da fare');
}

rilasciaPersone() {
alert('da fare');
}


async loadCommande() {


this.trovatoRec = false;
this.nRec = 0;
this.isVisible = true;
await  this.commandaService.getCommande().subscribe(
 res => {
     if(res['rc'] === 'ok') {
      console.log('--------------------------------------------->      loadCommande - trovato commande ' + JSON.stringify(res['data']));
      this.commande = res['data'];
      this.nRec = res['number'];
      this.trovatoRec = true;
      this.Message = 'Situazione Attuale';
      this.alertSuccess = true;
      this.isVisible = true;
     }
     if(res['rc'] === 'nf') {
      this.commande = this.commandenull;
      this.nRec = 0;
      this.trovatoRec = true;
      this.Message = 'Nessuna Commanda presente';
      this.alertSuccess = false;
      this.isVisible = true;
     }

//     alert('Manifestazioni   -- loadManifestazioni :  fine ok ');
 },
error => {
   alert('Persone  -- loadCommande - errore: ' + error.message);
   console.log(error);
   this.Message = error.message;
   this.isVisible = true;
   this.alertSuccess = false;
   this.type = 'error';
   this.Message = 'Errore in loadCommande' + '\n' + error.message;
   this.showNotification(this.type, this.Message);
});
}




onSelectionChange(tipo: string)   {

      switch (tipo) {
            case 'Tutte':
                this.visibleGestione = false;
                this.visibleNormale = true;
                this.visibleCucina = false;
                this.loadCommande();
                break;
            case 'Evase':
                this.visibleGestione = false;
                this.visibleNormale = true;
                this.visibleCucina = false;
                this.loadCommandeEvase();
                break;
            case 'Gestione':
                // impostare il flag per gestione visibilità  alternativa
                // this.RicercaTipo1(tipo);
                this.visibleGestione = true;
                this.visibleNormale = false;
                this.visibleCucina = false;
                break;
            default:
            alert('Scelta errata' + '\n' + 'ricerca non possibile');

            break;
      }

}


onSelectionChange1(tipo: string)   {

  switch (tipo) {
        case 'Cucina':

            this.visibleCucina = true;
            this.competenza = 1;
        /*   da correggere
            this.visibleGestione = false;
            this.visibleNormale = true;
            this.loadCommande();  */
            break;
        case 'Bevande':

            this.visibleCucina = false;
            this.competenza = 2;
        /*
            this.visibleGestione = false;
            this.visibleNormale = true;
            this.loadCommandeEvase();  */
            break;
        default:
        alert('Scelta errata' + '\n' + 'ricerca non possibile');

        break;
  }

}


onSelectionChange2(tipo: string)   {
  this.loadCommandarighebyStato(this.competenza, tipo);

}


onSelectionChange3(ordinamento: string)   {

  switch (ordinamento) {
        case 'Commanda':

       alert('imposto ordinamento per ------------------------>  N.ro Commanda');
        /*   da correggere
            this.visibleGestione = false;
            this.visibleNormale = true;
            this.loadCommande();  */
            break;
        case 'Prodotto':
        alert('imposto ordinamento per ----------------->  Descrizione Prodotto');

        /*
            this.visibleGestione = false;
            this.visibleNormale = true;
            this.loadCommandeEvase();  */
            break;
        case 'Tempo':
            alert('imposto ordinamento per ----------------->  Tempo attesa');

            /*
                this.visibleGestione = false;
                this.visibleNormale = true;
                this.loadCommandeEvase();  */
                break;
        default:
        alert('Scelta errata' + '\n' + 'ricerca non possibile');

        break;
  }

}


loadCommandarighebyStato(competenza: number, tipo: string) {

let flagl = 0;
let flagc = 0;
switch (competenza) {
  // cucina
  case 1:
      if(tipo === 'Lavorazione') {
        flagl = 0;
        this.getProdottidaLavorare(competenza, flagl);
      }
      if(tipo === 'Consegna') {
        flagl = 1;
        flagc = 0;
        this.getProdottiCucinadaConsegnare(competenza, flagl, flagc);
      }
      break;
  // bevande
  case 2:
      flagc = 0;
      this.getProdottiBevandedaConsegnare(competenza, flagc);
      break;
  }

 }



  async getProdottidaLavorare(competenza: number, flagl: number) {
    console.log(`getProdottidaLavorare - appena entrato`);
    let rc = await this.commandarigaService.getCommanderighedaLavorare(competenza, flagl).subscribe(
     resp => {
           console.log(`getProdottidaLavorare:  ${JSON.stringify(resp['data'])} `);
           if(resp['rc'] === 'ok') {
            console.log('--------------------------------------------->      getProdottidaLavorare - trovato righecommande ' + JSON.stringify(resp['data']));
            this.commandarighe = resp['data'];
            this.nRec = resp['number'];
            this.trovatoRec = true;
            this.Message = 'Situazione Attuale';
            this.alertSuccess = true;
            this.isVisible = true;
           }
           if(resp['rc'] === 'nf') {
            this.commandarighe = this.commandarighenull;
            this.nRec = 0;
            this.trovatoRec = true;
            this.Message = 'Nessun prodotto presente';
            this.alertSuccess = false;
            this.isVisible = true;
           }
        },
     error => {
          alert('getProdottidaLavorare - errore');
          this.isVisible = true;
          this.alertSuccess = false;
          console.log('getProdottidaLavorare - errore: ' + error);
          this.type = 'error';
          this.Message = error.message;
          this.alertSuccess = false;
          this.showNotification(this.type, this.Message);
        });

    }

    async getProdottiCucinadaConsegnare(competenza: number, flagl: number, flagc: number) {
    console.log(`getProdottiCucinadaConsegnare - appena entrato`);
    let rc = await this.commandarigaService.getProdottiCucinadaConsegnare(competenza, flagl, flagc).subscribe(
     resp => {
           console.log(`getProdottiCucinadaConsegnare:  ${JSON.stringify(resp['data'])} `);
           if(resp['rc'] === 'ok') {
            console.log('--------------------------------------------->      getProdottiCucinadaConsegnare - trovato righecommande ' + JSON.stringify(resp['data']));
            this.commandarighe = resp['data'];
            this.nRec = resp['number'];
            this.trovatoRec = true;
            this.Message = 'Situazione Attuale';
            this.alertSuccess = true;
            this.isVisible = true;
           }
           if(resp['rc'] === 'nf') {
            this.commandarighe = this.commandarighenull;
            this.nRec = 0;
            this.trovatoRec = true;
            this.Message = 'Nessun prodotto presente';
            this.alertSuccess = false;
            this.isVisible = true;
           }
        },
     error => {
          alert('getProdottiCucinadaConsegnare - errore');
          this.isVisible = true;
          this.alertSuccess = false;
          console.log('getProdottiCucinadaConsegnare - errore: ' + error);
          this.type = 'error';
          this.Message = error.message;
          this.alertSuccess = false;
          this.showNotification(this.type, this.Message);
        });


  }

  async getProdottiBevandedaConsegnare(competenza: number, flagc: number) {
    console.log(`getProdottiBevandedaConsegnare - appena entrato`);
    let rc = await this.commandarigaService.getProdottiBevandedaConsegnare(competenza, flagc).subscribe(
     resp => {
           console.log(`getProdottidaLavorare:  ${JSON.stringify(resp['data'])} `);
           if(resp['rc'] === 'ok') {
            console.log('--------------------------------------------->      getProdottiBevandedaConsegnare - trovato righecommande ' + JSON.stringify(resp['data']));
            this.commandarighe = resp['data'];
            this.nRec = resp['number'];
            this.trovatoRec = true;
            this.Message = 'Situazione Attuale';
            this.alertSuccess = true;
            this.isVisible = true;
           }
           if(resp['rc'] === 'nf') {
            this.commandarighe = this.commandarighenull;
            this.nRec = 0;
            this.trovatoRec = true;
            this.Message = 'Nessun prodotto presente';
            this.alertSuccess = false;
            this.isVisible = true;
           }
        },
     error => {
          alert('getProdottiBevandedaConsegnaree - errore');
          this.isVisible = true;
          this.alertSuccess = false;
          console.log('getProdottiBevandedaConsegnare - errore: ' + error);
          this.type = 'error';
          this.Message = error.message;
          this.alertSuccess = false;
          this.showNotification(this.type, this.Message);
        });

    }


loadCommandeEvase() {

  alert('da fare');
}


registra() {
  alert(' da fare');
}

/*

https://stackblitz.com/edit/angular-qprls8?file=src%2Fapp%2Fapp.component.html    esempio

transformTcoperto(element){
  this.TcopertoStr = this.Tcoperto.toString();
  this.TcopertoStr = this.currencyPipe.transform(this.Tcoperto, '$');

  element.target.value = this.TcopertoStr;
}
*/

}
