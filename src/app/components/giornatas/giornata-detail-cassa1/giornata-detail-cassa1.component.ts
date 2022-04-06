import { Component, Input, OnInit } from '@angular/core';

import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faPlusSquare, faSearch, faSave, faUserEdit, faMinus, faPlus, faWindowClose, faTrash, faReply, faUndo, faHandPointLeft, faTrashAlt, faInfoCircle, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
// classe
import { Giornata } from '../../../classes/Giornata';
import { Manifestazione } from '../../../classes/Manifestazione';
import { Cassa } from '../../../classes/Cassa';

// services
import { ManifestazioneService } from './../../../services/manifestazione.service';
import { GiornataService } from './../../../services/giornata.service';
import { CtrfuncService } from './../../../services/ctrfunc.service';
import { CassaService } from './../../../services/cassa.service';


// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-giornata-detail-cassa1',
  templateUrl: './giornata-detail-cassa1.component.html',
  styleUrls: ['./giornata-detail-cassa1.component.css']
})
export class GiornataDetailCassa1Component implements OnInit {

  public title = 'situagione giornaliera Cassa -  giornata-detail-cassa1 works';

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

    private giornatacopy;
    private __giornata;

    // per gestire il reset

   //  get - set
   @Input() set giornata(giornata: Giornata) {
    this.__giornata = giornata;
    this.giornatacopy = Object.assign({}, giornata);
  }

  get giornata() {
    return this.__giornata;
  }

    public giornatanull: Giornata;

      public textMessage1 = '';
      public textMessage2 = '';
      public textUser = '';
      public headerPopup = '';


    public manif: Manifestazione;
    public cassa: Cassa;
    public casse: Cassa[] = [];
    public cassenull: Cassa[] = [];

    public CassaCaricata = false;

    public tinizio = 0;
    public tattuale = 0;
    public tfinale = 0;
    public tsbilancio = 0;

    // per paginazone
p: number = 1;

constructor(public modalService: NgbModal,
            private ctrfuncService: CtrfuncService,
            private giornataService: GiornataService,
            private manifestazioneService: ManifestazioneService,
            private cassaService: CassaService,
            private route: ActivatedRoute,
            private router: Router,
            private datePipe: DatePipe,
            private notifier: NotifierService) {
                  this.notifier = notifier;
              }


              ngOnInit(): void {

                console.log('giornata-detail-Cassa1 - sono in oninit ');

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
                         this.route.paramMap.subscribe(p => {
                           this.idGiornata = +p.get('id');
                           console.log('id recuperato: ' + this.idGiornata);
                           // -------  leggo i dati della giornata
                           this.loadGiornata(this.idGiornata);
                           this.LoadCassa(this.idGiornata);
                           if(this.functionEdit || this.functionEdits) {
                             this.title = 'Situazione Cassa Giornaliera';
                             this.fase = 'M';
                            } else {
                             this.title = 'Visualizzazione Cassa Giornaliera';
                             this.fase = 'I';
                            }
                           this.Message = 'Situazione Attuale Cassa ';
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
                      this.showNotification(this.type, this.Message);
                    });
               }

               async loadGiornata(id: number) {

                console.log(`loadGiornata - appena entrato` + id);
                let rc = await this.giornataService.getGiornata(id).subscribe(
                 resp => {

                       console.log(`loadGiornata: ----------------------->  ${JSON.stringify(resp['data'])} `);
                       if(resp['rc'] === 'ok') {
                          this.giornata = resp['data'];
                              //  this.type = 'success';
                     //  this.Message = 'situazione attuale giornata';
                     //  this.alertSuccess = true;
                        }
                       if(resp['rc'] === 'nf') {
                        this.giornata = this.giornatanull;
                        this.type = 'error';
                        this.Message = 'giornata inesistente';
                        this.alertSuccess = true;
                        this.showNotification(this.type, this.Message);
                        }
                       console.log('fatto lettura  giornata: ' + this.giornata.id);
                    },
                 error => {
                      alert('sono in loadGiornata');
                      this.isVisible = true;
                      this.alertSuccess = false;
                      console.log('loadGiornata - errore: ' + error);
                      this.type = 'error';
                      this.Message = error.message;
                      this.alertSuccess = false;
                      this.showNotification(this.type, this.Message);
                    });
              }
               goback() {
                this.router.navigate(['/manif/' + this.manif.id]);
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

              backToGiornata(){
                // this.router.navigate(['users']); // rimandavo a elenco utenti
                 this.router.navigate(['manif/' + this.giornata.idManifestazione]);
              }

              resetForm(form) {
                alert('cassa-reset form  -  da fare');

                if (this.giornata.id === 0) {
                  this.giornata = new Giornata();
                } else {
                  this.giornata = this.giornatacopy;
                }

              }

              async LoadCassa(id: number) {

                console.log(`loadCassa - appena entrato` + id);
                let rc = await this.cassaService.getbyidGiornata(id).subscribe(
                 resp => {
                       console.log(`loadGCassa: ----------------------->  ${JSON.stringify(resp['data'])} `);
                       if(resp['rc'] === 'ok') {
                          this.casse = resp['data'];
                          this.loadTotali(id);
                        }
                       if(resp['rc'] === 'nf') {
                        this.casse = this.cassenull;
                        }
                    },
                 error => {
                      alert('sono in LoadCassa');
                      this.isVisible = true;
                      this.alertSuccess = false;
                      console.log('LoadCassa - errore: ' + error);
                      this.type = 'error';
                      this.Message = error.message;
                      this.alertSuccess = false;
                    });
              }


          async  loadTotali(id: number) {
                console.log(`loadCassa - appena entrato` + id);
                let rc = await this.cassaService.getTotaleCassa(id).subscribe(
                 resp => {
                       console.log(`loadGCassa: ----------------------->  ${JSON.stringify(resp['data'])} `);
                       if(resp['rc'] === 'ok') {
                          this.tinizio = resp['incassato'];
                          this.tattuale = resp['attuale'];
                          this.tfinale = resp['finale'];
                          this.tsbilancio = resp['sbilancio'];
                        }
                       if(resp['rc'] === 'nf') {
                        this.casse = this.cassenull;
                        }
                       console.log('fatto lettura  giornata: ' + this.giornata.id);
                     //  this.type = 'success';
                     //  this.Message = 'situazione attuale giornata';
                     //  this.alertSuccess = true;
                    },
                 error => {
                      alert('sono in loadTotali');
                      this.isVisible = true;
                      this.alertSuccess = false;
                      console.log('loadTotali - errore: ' + error);
                      this.type = 'error';
                      this.Message = error.message;
                      this.alertSuccess = false;

                    });
              }
              showPopupConfirm() {
                alert('da fare');
              }
}
