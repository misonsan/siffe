import { Component, OnInit } from '@angular/core';

// model Class
import { Commanda } from '../../../classes/Commanda';
import { Commandariga } from '../../../classes/Commandariga';
import { Giornata } from '../../../classes/Giornata';
import { ActivatedRoute, Router } from '@angular/router';
import { Cassac } from '../../../classes/cassac';


// Services
import { CassacService } from '../../../services/cassac.service';
import { CommandaService } from './../../../services/commanda.service';
import { CtrfuncService } from './../../../services/ctrfunc.service';
import { CommandarigaService} from './../../../services/commandariga.service';
import { GiornataService} from './../../../services/giornata.service';

// other
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faUndo, faSave, faHandPointLeft, faTrashAlt, faInfoCircle, faThumbsUp, faThumbsDown, faSearch,
          faPlusSquare, faTrash, faUserEdit, faWindowClose, faMinus, faPlus, faReply, faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import {formatDate} from '@angular/common';
// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {

  public title = 'Situazione Commande - commande Works';

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
    faAlignLeft = faAlignLeft;

    // variabili per editazione messaggio
    public alertSuccess = false;
    public savechange = false;
    public isVisible = false;

    public nRecMan = 0;
    public nRec = 0;
    public nRecPr = 0;
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

    public functionValid = false;
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
  public tipoSelected = '';

  public testDate = '';
  public testDateD: Date;
  public lavorazione = '';
    // ---------------------  personalizzazioni componente

    public routenavigate = '';

      options = [
      'Tutte',
      'da Evadere',
      'Parzialmente Evase',
      'Evase',
      ];


      optionsOrd = [
          'Commanda',
          'Cliente',
        ];

   public textMessage1 = '';
   public textMessage2 = '';
   public textUser = '';

   public commandaw: Commanda;

   public commanda: Commanda;
   public commande: Commanda[] = [];
   public commandenull: Commanda[] = [];
   public cassac: Cassac;
   public cassec: Cassac[] = [];
   public cassecnull: Cassac[] = [];
   public giornata: Giornata;
   public commandariga: Commandariga;
   public commandarighe: Commandariga[] = [];

   public tipoRichiesta = '?';
   public ricManif = 0;
   public validSearch = false;
   private textMessage = '';
   public nDay = 0;
   public statoRic = 0;
   public registrata = false;


   public tipologia = 0;
   public stato = 0;
   public idLevel = 0;
   public selectSelettiva = false;


   public searchText = '';
   // per paginazone
   p: number = 1;
   p_prod: number = 1;
   p_cassa: number = 1;

   public idlogged = 0;
   public competenza = 0;
   public enabledCucina = false;
   public enabledBevande = false;
   public trovatoRecRighe = false;
   public enabledRighe = false;
   public orderby = '';
   public VisibleProdottiCommanda = false;
   public VisibleCassaCommanda = false;

   constructor(public modalService: NgbModal,
               private ctrfuncService: CtrfuncService,
               private commandaService: CommandaService,
               private commandarigaService: CommandarigaService,
               private giornataService: GiornataService,
               private cassacService: CassacService,
               private route: ActivatedRoute,
               private router: Router,
               private datePipe: DatePipe,
               private notifier: NotifierService) {
                       this.notifier = notifier;
                   }

                   ngOnInit(): void {


                    console.log('Commanda-registrazione-Cassa - sono in oninit ');

                    this.checkFunctionbylevel();

                    }

               async  checkFunctionbylevel() {


                      this.rotta = this.route.snapshot.url[0].path;
                      this.level = parseInt(localStorage.getItem('user_ruolo'));

                      console.log('checkFunctiobylevel - inizio: -- rotta ' + this.rotta + ' level:' + this.level);

                      let rc =  await this.ctrfuncService.getfuncbyProfilo(this.level, this.rotta).subscribe(
                        res =>{
                         console.log(res,'res-->');
                         if(res['rc'] === 'ko')  {
                          this.type = 'error';
                          this.Message = res['message'];
                          this.showNotification(this.type, this.Message);
                          return;
                         }
                         if(res['rc'] === 'ok') {
                            if(res['number'] !== 1) {
                              this.type = 'error';
                              this.Message = 'Modulo non ancona abilitation';
                              this.showNotification(this.type, this.Message);
                            }  else {
                              this.functionUser = res['data'];
                              //   parte pubblica   --  fine
                              console.log('checkFunctionbylevel - funzione determinata: ' + this.functionUser);
                              // parte personalizzata

                              this.idGiornata = +localStorage.getItem('idGiornata');
                              this.idlogged = +localStorage.getItem('id');
                              this.idLevel = +localStorage.getItem('user_ruolo');
                              this.loadGiornata(this.idGiornata);

                              this.orderby = '*';
                              this.getAllCommande(this.orderby);

                              this.commandaw = new Commanda();

                              this.VisibleProdottiCommanda = false;
                              this.VisibleCassaCommanda = false;

                              this.isVisible = true;
                              this.alertSuccess = true;
                              this.Message = 'Situazione Attuale Commande ';
                              //  fine parte personalizzabile
                              this.type = 'success';
                              this.showNotification(this.type, this.Message);

                             }
                            }
                          },
                             error => {
                                alert('Manifestazioni  -- loadManifestazioni - errore: ' + error.message);
                                console.log(error);
                                this.Message = error.message;
                                this.alertSuccess = false;
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


                async loadGiornata(id: number) {
                  let res = await this.giornataService.getGiornata(id).subscribe(
                  response => {
                    console.log(`----------------->     loadGiornata - fatto lettura --- ${response['data']}`);
                    this.giornata = response['data'];
                    this.giornata.key_utenti_operation = +localStorage.getItem('id');
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

            onSelectionChangeOrder(tipo: string) {
              //  alert('ordinamento per:  ' + tipo);
                switch (tipo) {
                 case 'Commanda':
                     this.orderby = '*';
                     break;
                 case 'Cliente':
                    this.orderby = 'A';
                    break;
                 default:
                 alert('Scelta errata' + '\n' + 'ordinamento non possibile');
                 break;
                }

                if(this.selectSelettiva === true) {
                  this.getAllCommandebyStato(this.stato, this.orderby);
                  } else {
                  this.getAllCommande(this.orderby);
              }
            }



               resetoptionfinalCommanda() {
                var ele = document.getElementsByName('radiogroup1');
                for(var i=0;i<ele.length;i++) {
                  var element = ele[i] as HTMLInputElement;
                  element.checked = false;
                 }
               }

               onSelectionChangeComm(tipo: string) {
                alert('da fare');
                this.selectSelettiva = false;
                this.orderby = '*';    // imposto ordinamento per commanda
                this.trovatoRecRighe = false;
                switch (tipo) {
                              case 'Tutte':
                                 break;
                              case 'da Evadere':
                                 this.stato = 2;
                                 this.selectSelettiva = true;
                                 break;
                              case 'Parzialmente Evase':
                                  this.stato = 3;
                                  this.selectSelettiva = true;
                                  break;
                              case 'Evase':
                                  this.stato = 4;
                                  this.selectSelettiva = true;
                                  break;
                              default:
                              alert('Scelta errata' + '\n' + 'ricerca non possibile');
                              break;
                     }
                if(this.selectSelettiva === true) {
                      this.getAllCommandebyStato(this.stato, this.orderby);
                      } else {
                      this.getAllCommande(this.orderby);
                  }
              }



        async   getAllCommandebyStato(stato: number, order: string) {

         console.log(`getAllCommandebyStato - appena entrato --  stato ${stato} ----- order: ${order}` );

         if(this.enabledCucina === true) {
           this.competenza = 1;
          }
         if(this.enabledBevande === true) {
           this.competenza = 2;
          }


         let rc = await this.commandaService.getCommandeforGiornataeCompetenzaestato(this.idGiornata, this.competenza, stato, order).subscribe(
         resp => {
             if(resp['rc'] === 'ok') {
               console.log('getAllCommandebyStato .... result ' + JSON.stringify(resp['data']) + ' record: ' + resp['number']);
               this.commande = resp['data'];
               this.trovatoRecRighe = true;
               this.nRec = resp['number'];
             }
             if(resp['rc'] === 'nf') {
               this.commande = this.commandenull;
               this.trovatoRecRighe = true;
               this.nRec = 0;
             }
           },
         error => {
             alert('sono in getAllCommandebyStato - error');
             this.isVisible = true;
             this.alertSuccess = false;
             console.log('getAllCommandebyStato - errore: ' + error);
             this.type = 'error';
             this.Message = error.message;
             this.alertSuccess = false;
             this.showNotification(this.type, this.Message);
         });
     }


//*   metodo correto funzionante con subscribe ----------------   funziona
/*
      async  getAllCommande(order: string) {

         console.log(`getAllCommande - appena entrato --  ---- order: ${order}` );
         if(order === '') {
           order = '*';
          }
         let rc = await this.commandaService.getCommandeforGiornata(this.idGiornata, order).subscribe(
         resp => {
             if(resp['rc'] === 'ok') {
               console.log('getAllCommande .... result ' + JSON.stringify(resp['data']) + ' record: ' + resp['number']);
               this.commande = resp['data'];
               this.trovatoRecRighe = true;
               this.nRec = resp['number'];
             }
             if(resp['rc'] === 'nf') {
               this.commande = this.commandenull;
               this.trovatoRecRighe = true;
               this.nRec = 0;
             }
           },
         error => {
             alert('sono in getAllCommande- error');
             this.isVisible = true;
             this.alertSuccess = false;
             console.log('getAllCommande - errore: ' + error);
             this.type = 'error';
             this.Message = error.message;
             this.alertSuccess = false;
             this.showNotification(this.type, this.Message);
         });
     }
*/

//         new version


async  getAllCommande(order: string) {

  try {
        if(order === '') {
          order = '*';
         }
        const rc: any = await this.commandaService.getCommandeforGiornata(this.idGiornata, order).toPromise();
        if(rc['rc'] === 'ok') {
          this.commande = rc['data'];
          this.trovatoRecRighe = true;
          this.nRec = rc['number'];
        }
      } catch (error) {
            this.isVisible = true;
            this.alertSuccess = false;
            console.log('loadCommandaSelect - errore: ' + error);
            this.type = 'error';
            this.Message = error.message;
            this.alertSuccess = false;
            this.showNotification(this.type, this.Message);
      }
  }






     async onSelectProdotti(commanda: Commanda) {



      let rc = await this.commandarigaService.getProdbyCommanda(commanda.id).subscribe(
       resp => {
           if(resp['rc'] === 'ok') {
             console.log('onSelectProdotti --- commandariga ---- recuperata da figlio ' + JSON.stringify(resp['data']));
             this.commandarighe = resp['data'];
             this.VisibleProdottiCommanda = true;
             this.VisibleCassaCommanda = false;
             this.loadCommandaSelect(commanda);
            }
          },
       error => {
           alert('sono in onSelectProdotti - error');
           this.isVisible = true;
           this.alertSuccess = false;
           console.log('onSelectProdotti - errore: ' + error);
           this.type = 'error';
           this.Message = error.message;
           this.alertSuccess = false;
           this.showNotification(this.type, this.Message);
       });
     }


     async onSelectCassa(commanda: Commanda) {

      console.log('il valore di p appena selazionato ' + this.p);
      let rc = await this.cassacService.getbyidCommanda(commanda.id).subscribe(
       resp => {
           if(resp['rc'] === 'ok') {
             console.log('onSelectCassa --- commandariga ---- recuperata da figlio ' + JSON.stringify(resp['data']));
             this.cassec = resp['data'];
             this.VisibleCassaCommanda = true;
             this.VisibleProdottiCommanda = false;
             console.log('il valore di p dopo lettura cassec ------------------------------------ ' + this.p);
            }
          },
       error => {
           alert('sono in onSelectProdotti - error');
           this.isVisible = true;
           this.alertSuccess = false;
           console.log('onSelectProdotti - errore: ' + error);
           this.type = 'error';
           this.Message = error.message;
           this.alertSuccess = false;
           this.showNotification(this.type, this.Message);
       });
     }



 async    loadCommandaSelect(commanda: Commanda) {

  let rc = await this.commandaService.getCommanda(commanda.id).subscribe(
    resp => {
        if(resp['rc'] === 'ok') {
          console.log('loadCommandaSelect --- commandaw ' + JSON.stringify(resp['data']));
          this.commandaw = resp['data'];
         }
       },
    error => {
        alert('sono in loadCommandaSelect - error');
        this.isVisible = true;
        this.alertSuccess = false;
        console.log('loadCommandaSelect - errore: ' + error);
        this.type = 'error';
        this.Message = error.message;
        this.alertSuccess = false;
        this.showNotification(this.type, this.Message);
    });

     }



}

/*      metodo FUNZIONANTE

async  getAllCommande(order: string) {

  try {
        console.log(`getAllCommande - appena entrato --  ---- order: ${order}` );
        if(order === '') {
          order = '*';
         }
        const rc: any = await this.commandaService.getCommandeforGiornata(this.idGiornata, order).toPromise();


        console.log(`getAllCommande --------------------------------------  dopo lettura  con promise--  ---- order:` + JSON.stringify(this.commande));
        console.log(`getAllCommande ------ nRec -------------------------------  dopo lettura  con promise--  ` + this.nRec);

        if(rc['rc'] === 'ok') {
          console.log(`getAllCommande ------ rc ---   ok ----------------------------  dopo lettura  con promise--  ` + rc['rc']);
          this.commande = rc['data'];
          this.trovatoRecRighe = true;
          this.nRec = rc['number'];
        }




      } catch (error) {
            this.isVisible = true;
            this.alertSuccess = false;
            console.log('loadCommandaSelect - errore: ' + error);
            this.type = 'error';
            this.Message = error.message;
            this.alertSuccess = false;
            this.showNotification(this.type, this.Message);
      }

  }














*/



/*    esempio async await

async getConditionalDataUsingAsync() {
    let data = await this.httpClient.get<Employee>(this.url).toPromise();
    if (data.id > 5) {
      let anotherUrl = 'http://dummy.restapiexample.com/api/v1/employee/23';
      this.conditionalAsyncResult = await this.httpClient.get<Employee>(anotherUrl).toPromise();
    }
    console.log('No issues, I will wait until promise is resolved..');
  }


  async  getAllCommandePromise(order: string) {

      console.log(`getAllCommande - appena entrato --  ---- order: ${order}` );
      if(order === '') {
        order = '*';
       }
      let rc: any = await this.commandaService.getCommandeforGiornata(this.idGiornata, order).toPromise();
      this.commande = rc['data'];



/*
      if(rc['rc'] === 'ok') {
            console.log('getAllCommande .... result ' + JSON.stringify(resp['data']) + ' record: ' + resp['number']);

            this.trovatoRecRighe = true;
            this.nRec = resp['number'];

   //         console.log('getAllCommande ------------------------ il valore di p dopo load' + this.p);

          }
          if(resp['rc'] === 'nf') {
            this.commande = this.commandenull;
            this.trovatoRecRighe = true;
            this.nRec = 0;
          }
        },
      error => {
          alert('sono in getAllCommande- error');
          this.isVisible = true;
          this.alertSuccess = false;
          console.log('getAllCommande - errore: ' + error);
          this.type = 'error';
          this.Message = error.message;
          this.alertSuccess = false;
          this.showNotification(this.type, this.Message);
      });
  }





*/



/*
  if(rc['rc'] === 'ok') {
        console.log('getAllCommande .... result ' + JSON.stringify(resp['data']) + ' record: ' + resp['number']);

        this.trovatoRecRighe = true;
        this.nRec = resp['number'];

//         console.log('getAllCommande ------------------------ il valore di p dopo load' + this.p);

      }
      if(resp['rc'] === 'nf') {
        this.commande = this.commandenull;
        this.trovatoRecRighe = true;
        this.nRec = 0;
      }
    },
  error => {
      alert('sono in getAllCommande- error');
      this.isVisible = true;
      this.alertSuccess = false;
      console.log('getAllCommande - errore: ' + error);
      this.type = 'error';
      this.Message = error.message;
      this.alertSuccess = false;
      this.showNotification(this.type, this.Message);
  });
}
*/
