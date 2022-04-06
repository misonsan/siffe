import { Component, OnInit } from '@angular/core';

import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faPlusSquare, faSearch, faSave, faUserEdit, faMinus, faPlus, faWindowClose, faTrash, faReply, faUndo, faHandPointLeft, faTrashAlt, faInfoCircle, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
// classe
import { Giornata } from '../../../classes/Giornata';
import { Manifestazione } from '../../../classes/Manifestazione';
import { Prodotto } from '../../../classes/Prodotto';
import { Ttipologia } from '../../../classes/T_tipologia';

// services
import { ManifestazioneService } from './../../../services/manifestazione.service';
import { GiornataService } from './../../../services/giornata.service';
import { CtrfuncService } from './../../../services/ctrfunc.service';
import { ProdottoService } from './../../../services/prodotto.service';
import { TtipologiaService } from './../../../services/ttipologia.service';

// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-giornata-detail-prodotti',
  templateUrl: './giornata-detail-prodotti.component.html',
  styleUrls: ['./giornata-detail-prodotti.component.css']
})
export class GiornataDetailProdottiComponent implements OnInit {

  public title = 'situagione giornaliera Prodotti -  giornata-detail-prodotti works';

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
   public headerPopup = '';

   public nrecanoSelect = 0;

   public tipoRichiesta = '?';
   public validSearch = false;
   public flagMenu = '';
   public EnabledRilascia = false;
 // -------------------

  public manif: Manifestazione;
  public giornata: Giornata;
  public prodotti: Prodotto[] = [];
  public prodotto: Prodotto;
  public tipologie: Ttipologia[] = [];
  public tipologia: Ttipologia;

  public prodottinull: Prodotto[] = [];

  options = [
   'Tutte',
   'Da Selezionare',
   'Non a Menù',
   'A Menù'
 ];

 // per paginazone
 p: number = 1;

 public selectedTip = 0;


 constructor(public modalService: NgbModal,
             private ctrfuncService: CtrfuncService,
             private giornataService: GiornataService,
             private manifestazioneService: ManifestazioneService,
             private prodottoService: ProdottoService,
             private ttipologiaService: TtipologiaService,
             private route: ActivatedRoute,
             private router: Router,
             private datePipe: DatePipe,
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

                       this.tipologieMenu();


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
                           this.calcolaProdottiaMenu();
                           this.route.paramMap.subscribe(p => {
                             this.idGiornata = +p.get('id');
                             console.log('id recuperato: ' + this.idGiornata);
                             // -------  leggo i dati della giornata
                             this.loadGiornata(this.idGiornata);
                             this.tipoRichiesta = 'D';
                             this.onSelectionChange(this.tipoRichiesta);
                             if(this.nrecanoSelect === 0) {
                              this.EnabledRilascia =  true;
                              } else {
                              this.EnabledRilascia =  false;
                              }
                             if(this.functionEdit || this.functionEdits) {
                               this.title = 'Situazione Giornaliera Prodotti';
                               this.fase = 'M';
                              } else {
                               this.title = 'Visualizzazione Giornaliera Prodotti';
                               this.fase = 'I';
                              }
                             this.Message = 'Situazione Attuale Prodotti ';
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
                         this.Message = 'Errore cancellazione Manifestazione' + '\n' + error.message;
                         this.showNotification(this.type, this.Message);
                         console.log(error);
                       });

                }


                async loadGiornata(id: number) {
                  //   alert('loadGiornata - id:' + id);
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
                  }
                )

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
                        alert('sono in loadManif');
                        this.isVisible = true;
                        this.alertSuccess = false;
                        console.log('loadManif - errore: ' + error);
                        this.type = 'error';
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
        // alert('sono in showNot - ' + message);
         this.notifier.notify( type, message );
         console.log(`sono in showNotification  ${type}`);
      //   alert('sono in notifier' + message);
       }

       prodottoSelected: Prodotto;
       updateProdotto(prodotto: Prodotto){
         this.prodottoSelected = prodotto;
       }


       tipologieMenu() {
          this.ttipologiaService.getAllMenu().subscribe(
            res => {
                this.tipologie = res['data'];
             },
            error => {
               alert('giornata-detail-Prodotti  -- tipologieMenu - errore: ' + error.message);
               console.log(error);
               this.Message = error.message;
               this.alertSuccess = false;
            });
       }



       selectedtipologia(selectedValue: number) {
        //  alert('selezionato: ' + selectedValue);
          if(selectedValue ===  999) {
            this.type = 'error';
            this.Message = 'selezione non corrette';
            this.showNotification(this.type, this.Message);
            this.alertSuccess = false;
            this.isVisible = true;
            return;
         } else {
          this.selectedTip = selectedValue;
          console.log('tipologia selezionata: ' + this.selectedTip);
          this.loadProdottiforTipologia(this.selectedTip);
         }

     }

    async loadProdottiforTipologia(tipologia: number) {

      this.trovatoRec = false;
      this.nRec = 0;
      this.isVisible = true;
      let resp = await  this.prodottoService.getProdottiforTipologia(tipologia).subscribe(
          res => {
            if(res['rc'] === 'ok') {
              this.prodotti = res['data'];
              this.nRec = res['number'];
              this.trovatoRec = true;
              this.Message = 'Situazione Attuale';
              this.alertSuccess = true;
             }
            if(res['rc'] === 'nf') {
              this.prodotti = this.prodottinull;
              this.nRec = 0;
              this.trovatoRec = false;
              this.Message = 'Nessun prodotto con la selezione impostata';
              this.alertSuccess = false;
             }
           },
          error => {
             alert('Prodotti  -- loadPersone - errore: ' + error.message);
             console.log(error);
             this.isVisible = true;
             this.Message = error.message;
             this.alertSuccess = false;
             this.type = 'error';
             this.showNotification(this.type, this.Message);
          });

     }






       async loadProdotti() {

         //alert('Manifestazioni   -- loadManifestazioni :  inizio ');
         this.trovatoRec = false;
         this.nRec = 0;
         this.isVisible = true;
         let resp = await  this.prodottoService.getAll().subscribe(
           // sentire hidran per lettura particolare
          // this.fedeleService.getFedeliforMessa(id).subscribe(
             res => {
                 this.prodotti = res['data'];
                 this.nRec = res['number'];
                 this.trovatoRec = true;
                 this.Message = 'Situazione Attuale -- globale';
                 this.alertSuccess = true;
            //     alert('Manifestazioni   -- loadManifestazioni :  fine ok ');
              },
             error => {
                alert('Prodotti  -- loadPersone - errore: ' + error.message);
                console.log(error);
                this.Message = error.message;
                this.alertSuccess = false;
             });
       }


       async loadProdottibyMenu(menu: string) {

         console.log('loadProdottibyMenu ' + menu);
         this.trovatoRec = false;
         this.nRec = 0;
         this.isVisible = true;
         let resp =  await  this.prodottoService.getProdottiforMenu(menu).subscribe(
           // sentire hidran per lettura particolare
          // this.fedeleService.getFedeliforMessa(id).subscribe(
             res => {

                 console.log('loadProdottibyMenu  +++++++ record trovati: ' +  res['number'] +  ' r.c. : -------> ' + res['rc']);

                 if(res['rc'] === 'ok') {
                  this.prodotti = res['data'];
                  this.nRec = res['number'];
                  this.trovatoRec = true;
                  this.Message = 'Situazione Attuale  filtrato';
                  this.alertSuccess = true;
                 }
                 if(res['rc'] === 'nf') {
                  this.prodotti = this.prodottinull;
                  this.nRec = 0;
                  this.trovatoRec = false;
                  this.Message = 'Nessun prodotto con la selezione impostato';
                  this.alertSuccess = false;
                 }
            //     alert('Manifestazioni   -- loadManifestazioni :  fine ok ');
              },
             error => {
                alert('Prodotti  -- loadProdottibyMenu - errore: ' + error.message);
                console.log(error);
                this.Message = error.message;
                this.alertSuccess = false;
             }
           )
       }

     // imposto il filtro di ricerca dei fedeli
     onSelectionChange(menu: string)   {

       const menu1 = menu.substring(0,1);
       this.tipoRichiesta = menu1;
       if(this.tipoRichiesta === 'A') {
         this.tipoRichiesta = 'S';
       }
       if(this.tipoRichiesta === 'D') {
         this.tipoRichiesta = '*';
       }
       this.validSearch = true;

       switch (this.tipoRichiesta) {
         case 'T':
         this.loadProdotti();
      //   this.router.navigate(['getpersoneforMessa', this.messa.id]);
         break;
         case 'N':
         case 'S':
         case '*':
           this.flagMenu = this.tipoRichiesta;
           this.loadProdottibyMenu(this.tipoRichiesta);
           break;
         default:
         alert('Scelta errata \n ricerca non possibile');
         break;
       }
   }

  async calcolaProdottiaMenu() {

             this.flagMenu = '*';
             this.trovatoRec = false;
             this.nrecanoSelect = 0;
             let resp =  await  this.prodottoService.getProdottiforMenu(this.flagMenu).subscribe(
               // sentire hidran per lettura particolare
              // this.fedeleService.getFedeliforMessa(id).subscribe(
                 res => {
                     this.nrecanoSelect = res['number'];
                   },
                 error => {
                    alert('Prodotti  -- calcolaProdottiaMenu - errore: ' + error.message);
                    this.isVisible = true;
                    console.log(error);
                    this.Message = error.message;
                    this.alertSuccess = false;
                 }
               );
   }

   eeguirilascio()  {
    console.log('esegui rilascio');

    // aggiorno lo stato della giornata
    this.giornata.stato = 1;
    this.giornata.statoMagazzino = 1;
    if(this.giornata.statoCassa === 1 && this.giornata.statoUtenti === 1  && this.giornata.statoMagazzino === 1) {
       this.giornata.stato = 2;
    }
    this.giornataService.updateGiornata(this.giornata).subscribe(
       response => {
            if(response['rc'] === 'ok') {
              this.isVisible = true;
              this.alertSuccess = true;
              this.type = 'success';
              this.Message = response['message'];
              this.showNotification(this.type, this.Message);
           } else {
             alert(response['message']);
             this.Message = response['message'];
             this.alertSuccess = false;
             this.type = 'error';
             this.Message = 'rilascia - ' + this.Message;
             this.showNotification(this.type, this.Message);
           }
       },
       error =>
       {
         console.log(error);
         this.Message = error.message;
         this.alertSuccess = false;
         this.type = 'error';
         this.Message = 'rilascia - ' + this.Message;
         this.showNotification(this.type, this.Message);
       });
   }

 async rilasciaProdottiMenu() {
    const menu = '*';
    const resp =  await  this.prodottoService.getProdottiforMenu(menu).subscribe(
          res => {
            if(res['rc'] === 'ok') {
             this.nRec = res['number'];
             this.isVisible = true;
             this.alertSuccess = false;
             this.type = 'error';
             this.Message = 'Presenti ancora ' + this.nRec + ' prodotti non selezionati + rilascio non possibile';
             this.showNotification(this.type, this.Message);
            }
            if(res['rc'] === 'nf') {
               this.eeguirilascio();
            }
          },
           error =>
           {
             console.log(error);
             this.Message = error.message;
             this.alertSuccess = false;
             this.type = 'error';
             this.Message = 'rilascia - ' + this.Message;
             this.showNotification(this.type, this.Message);
           });
}







   backToGiornata(){

    alert('da sistemare');

    // this.router.navigate(['manif/' + this.giornata.idManifestazione]);

    }



}
