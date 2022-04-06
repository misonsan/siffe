import { Component, Input, OnInit } from '@angular/core';

import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faPlusSquare, faSearch, faSave, faUserEdit, faMinus, faPlus, faWindowClose, faTrash, faReply, faUndo, faHandPointLeft, faTrashAlt, faInfoCircle, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
// classe
import { Giornata } from '../../../classes/Giornata';
import { Manifestazione } from '../../../classes/Manifestazione';
import { Cassaw } from '../../../classes/Cassaw';
import { Commanda } from '../../../classes/Commanda';
// services
import { ManifestazioneService } from './../../../services/manifestazione.service';
import { GiornataService } from './../../../services/giornata.service';
import { CtrfuncService } from './../../../services/ctrfunc.service';
import { CassawService } from './../../../services/cassaw.service';
import { CommandaService } from './../../../services/commanda.service';

// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-giornata-detail-cassa',
  templateUrl: './giornata-detail-cassa.component.html',
  styleUrls: ['./giornata-detail-cassa.component.css']
})
export class GiornataDetailCassaComponent implements OnInit {

  public title = 'situagione giornaliera Cassa -  giornata-detail-cassa works';

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

      public textMessage1 = '';
      public textMessage2 = '';
      public textUser = '';
      public headerPopup = '';


    public manif: Manifestazione;
    public cassaw: Cassaw;
    public commanda: Commanda;


    //public giornata: Giornata;
    //  campi calcolati per editazione
    // sbilancio
    public s100 = 0;
    public s050 = 0;
    public s020 = 0;
    public s010 = 0;
    public s005 = 0;
    public smoneta = 0;
    // valore iniziale
    public vi100 = 0;
    public vi050 = 0;
    public vi020 = 0;
    public vi010 = 0;
    public vi005 = 0;
    public vimoneta = 0;
    // valore attuale
    public va100 = 0;
    public va050 = 0;
    public va020 = 0;
    public va010 = 0;
    public va005 = 0;
    public vamoneta = 0;
    // valore finale
    public vf100 = 0;
    public vf050 = 0;
    public vf020 = 0;
    public vf010 = 0;
    public vf005 = 0;
    public vfmoneta = 0;
    // valore sbilancio
    public vs100 = 0;
    public vs050 = 0;
    public vs020 = 0;
    public vs010 = 0;
    public vs005 = 0;
    public vsmoneta = 0;
    // totali
    public tinizio = 0;
    public tattuale = 0;
    public tfinale = 0;
    public tsbilancio = 0;
    public enabledCassaFinale = false;
    public enabledCassaIniziale = false;
    public keyCassaw = 0;
    public CassaCaricata = false;

    public inibisciModCassa = false;

constructor(public modalService: NgbModal,
            private ctrfuncService: CtrfuncService,
            private giornataService: GiornataService,
            private manifestazioneService: ManifestazioneService,
            private commandaService: CommandaService,
            private cassawService: CassawService,
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

                    });
               }

               async loadGiornata(id: number) {

                console.log(`loadGiornata - appena entrato` + id);
                let rc = await this.giornataService.getGiornata(id).subscribe(
                 resp => {

                       console.log(`loadGiornata: ----------------------->  ${JSON.stringify(resp['data'])} `);
                       if(resp['rc'] === 'ok') {
                          this.giornata = resp['data'];
                          this.conteggiaValori();




                          /*  la visualizzazione del checkbox non funziona - sospendo questa visualizzazione
                          this.inibisciModCassa = true;
                          if(this.giornata.statoCassa === 1 ) {
                              this.inibisciModCassa = false;
                             }
                             */
                        }
                       if(resp['rc'] === 'nf') {


                        }
                       console.log('fatto lettura  giornata: ' + this.giornata.id);
                     //  this.type = 'success';
                     //  this.Message = 'situazione attuale giornata';
                     //  this.alertSuccess = true;
                    },
                 error => {
                      alert('sono in loadGiornata');
                      this.isVisible = true;
                      this.alertSuccess = false;
                      console.log('loadGiornata - errore: ' + error);
                      this.type = 'error';
                      this.Message = error.message;
                      this.alertSuccess = false;

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

             conteggiaValori() {

                     // valori iniziali
                     this.vi100 = this.giornata.i100 * 100;
                     this.vi050 = this.giornata.i050 * 50;
                     this.vi020 = this.giornata.i020 * 20;
                     this.vi010 = this.giornata.i010 * 10;
                     this.vi005 = this.giornata.i005 * 5;
                     this.vimoneta = this.giornata.icontante;
                     // valori attuali
                     this.va100 = this.giornata.a100 * 100;
                     this.va050 = this.giornata.a050 * 50;
                     this.va020 = this.giornata.a020 * 20;
                     this.va010 = this.giornata.a010 * 10;
                     this.va005 = this.giornata.a005 * 5;
                     this.vamoneta = this.giornata.acontante;

                    // valori finali
                     this.vf100 = this.giornata.f100 * 100;
                     this.vf050 = this.giornata.f050 * 50;
                     this.vf020 = this.giornata.f020 * 20;
                     this.vf010 = this.giornata.f010 * 10;
                     this.vf005 = this.giornata.f005 * 5;
                     this.vfmoneta = this.giornata.fcontante;

                    // sbilancio
                     if(this.giornata.f100 === 0  &&
                         this.giornata.f050 === 0  &&
                         this.giornata.f020 === 0  &&
                         this.giornata.f010 === 0  &&
                         this.giornata.f005 === 0  &&
                         this.giornata.fcontante === 0)  {
                           this.s100 = this.giornata.a100 - this.giornata.i100;
                           this.s050 = this.giornata.a050 - this.giornata.i050;
                           this.s020 = this.giornata.a020 - this.giornata.i020;
                           this.s010 = this.giornata.a010 - this.giornata.i010;
                           this.s005 = this.giornata.a005 - this.giornata.i005;
                           this.smoneta = this.giornata.acontante - this.giornata.icontante;
                         }   else {
                           this.s100 = this.giornata.f100 - this.giornata.i100;
                           this.s050 = this.giornata.f050 - this.giornata.i050;
                           this.s020 = this.giornata.f020 - this.giornata.i020;
                           this.s010 = this.giornata.f010 - this.giornata.i010;
                           this.s005 = this.giornata.f005 - this.giornata.i005;
                           this.smoneta = this.giornata.fcontante - this.giornata.icontante;
                         }

                     this.vs100 = this.s100 * 100;
                     this.vs050 = this.s050 * 50;
                     this.vs020 = this.s020 * 20;
                     this.vs010 = this.s010 * 10;
                     this.vs005 = this.s005 * 5;
                     this.vsmoneta = this.smoneta;
                     //  totali
                     this.tinizio = this.vi100 + this.vi050 + this.vi020 +
                                    this.vi010 + this.vi005 + (this.giornata.icontante * 1);

                     this.tattuale = this.va100 + this.va050 + this.va020 +
                                    this.va010 + this.va005 + (this.vamoneta * 1);
                     this.tfinale = this.vf100 + this.vf050 + this.vf020 +
                                    this.vf010 + this.vf005 + (this.vfmoneta * 1);
                     if(this.tfinale === 0)  {
                        this.tsbilancio = this.tattuale - this.tinizio;
                     } else {
                        this.tsbilancio = this.tfinale - this.tinizio;
                     }
                     /*
                     this.tsbilancio = this.s100 + this.s050 + this.s020 +
                                    this.s010 + this.s005 + (this.smoneta * 1);  */

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


              showPopupConfirm() {

                alert('--------   sostituire popup com maschera di gestione denari');

                /*
                this.textMessage1 = 'Confermi la registrazione';
                  this.eseguoConteggioValori();
                // verifico se ho emesso delle commande per impostare lo stato
                   this.aggiornaCassa();
                   */

                }

      registra() {
        this.router.navigate(['/giornata/ValoriCassa/Edits/' + this.giornata.id]);
      }

}
