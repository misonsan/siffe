
import { Component, Input, OnInit } from '@angular/core';

import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faPlusSquare, faSearch, faSave, faUserEdit, faMinus, faPlus, faWindowClose, faTrash, faReply, faUndo, faHandPointLeft,
         faTrashAlt, faInfoCircle, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
// classe
import { Giornata } from '../../../classes/Giornata';
import { Manifestazione } from '../../../classes/Manifestazione';
import { Spesa } from '../../../classes/Spesa';
// services
import { ManifestazioneService } from './../../../services/manifestazione.service';
import { GiornataService } from './../../../services/giornata.service';
import { CtrfuncService } from './../../../services/ctrfunc.service';
import { SpesaService } from './../../../services/spesa.service';

// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-manifestazione-detail-bilancio',
  templateUrl: './manifestazione-detail-bilancio.component.html',
  styleUrls: ['./manifestazione-detail-bilancio.component.css']
})
export class ManifestazioneDetailBilancioComponent implements OnInit {

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

  public spese: Spesa[] = [];
  public spesenull: Spesa[] = [];
  public giornate: Giornata[] = [];
  public giornatenull: Giornata[] = [];

  public title = '';
  public tinizio = 0;
  public tattuale = 0;
  public tfinale = 0;
  public tsbilancio = 0;
  public tentrate = 0;
  public tspese = 0;

  public speseTotale = 0;
  public spesePagate = 0;
  public spesedaPagare = 0;


  // per paginazone
p: number = 1;
p_spesa: number = 1;

constructor(public modalService: NgbModal,
            private ctrfuncService: CtrfuncService,
            private giornataService: GiornataService,
            private manifestazioneService: ManifestazioneService,
            private spesaService: SpesaService ,
            private route: ActivatedRoute,
            private router: Router,
            private datePipe: DatePipe,
            private notifier: NotifierService) {
                this.notifier = notifier;
            }


            ngOnInit(): void {

              console.log('giornata-detail-Bilancio - sono in oninit ');

              this.checkFunctionbylevel();

            }

            checkFunctionbylevel() {
              //  ----- parte comune a tutti i moduli
             this.rotta = this.route.snapshot.url[0].path;
             this.level = parseInt(localStorage.getItem('user_ruolo'));
             this.functionUrl = this.route.snapshot.url[1].path;

             if(this.route.snapshot.url[1].path !== 'new') {
               this.rottaId =  parseInt(this.route.snapshot.url[2].path);
              } else {
               this.rottaId =  0;
              }

             console.log('frontend ----------------  checkFunctionbylevel -- step_01 rotta ' + this.rotta + ' rottaId ' + this.rottaId + ' functionUrl ' + this.functionUrl);

             // variante rispetto allo standard di modello

             if(this.functionUrl === 'bilancio') {
               this.loadManif(this.rottaId);
               this.functionUser = this.searchEdits;  // forzo la funzione per la gestione dei record sul figlio
               this.loadEntrate(this.rottaId);
               this.LoadSpese();  // mettere idmanifestazione in spese
               this.title = 'Situazione Bilancio Manifestazione - manifestazione-detail-bilancio works!';
               this.fase = 'M';
               this.type = 'success';
               this.showNotification(this.type, this.Message);
               return;
             }
/*
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

                   if(this.functionNew) {
                     this.manif = new Manifestazione();
                     this.manif.key_utenti_operation = +localStorage.getItem('id');
                     this.title = 'Inserimento Manifestazione';
                     this.fase = 'N';
                     this.Message = `Inserire i dati del fornitore`;
                   } else {
                       this.route.paramMap.subscribe(p => {
                         this.idManif = +p.get('id');
                         console.log('id recuperato: ' + this.idManif);
                         // -------  leggo i dati della giornata

                         this.loadManif(this.idManif);
                         this.loadEntrate(this.idManif);
                         this.LoadSpese(this.idManif);
                         if(this.functionEdit || this.functionEdits) {
                           this.title = 'Aggiornamento Spese Fornitore';
                           this.fase = 'M';
                          } else {
                           this.title = 'Visualizzazione Spese Fornitore';
                           this.fase = 'I';
                          }
                         this.Message = 'Situazione Attuale Spese Fornitore';
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
                     this.Message = 'Errore cancellazione Spese Fornitore' + '\n' + error.message;
                     this.showNotification(this.type, this.Message);
                     console.log(error);
                   });

            }
*/

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

         async loadEntrate(id: number) {
              this.tentrate = 0;
              let rc = await this.giornataService.getGiornatebyManif(id).subscribe(
                resp => {
                       console.log(`loadGiornate:  ${JSON.stringify(resp['data'])} `);
                       if(resp['rc'] === 'ok') {
                        this.giornate = resp['data'];
                        for(let giorno of this.giornate) {
                          this.tentrate = this.tentrate + (giorno.cassaFinale - giorno.cassaAttuale);
                        }
                      }
                       if(resp['rc'] === 'nf') {
                        this.giornate = this.giornatenull;
                      }
                },
                error => {
                     alert('sono in loadEntrate');
                     this.isVisible = true;
                     this.alertSuccess = false;
                     console.log('loadEntrate - errore: ' + error);
                     this.type = 'error';
                     this.Message = error.message;
                     this.alertSuccess = false;
                     this.showNotification(this.type, this.Message);
                   });
             }

         async  LoadSpese() {
              this.speseTotale = 0;
              this.spesePagate = 0;
              this.spesedaPagare = 0;
              let rc = await this.spesaService.getTotalibyspese().subscribe(
                resp => {
                       console.log(`LoadSpese:  ${JSON.stringify(resp['data'])} `);
                       if(resp['rc'] === 'ok') {
                        this.spese = resp['data'];
                      }
                       if(resp['rc'] === 'nf') {
                        this.spese = this.spesenull;
                      }
                },
                error => {
                     alert('sono in LoadSpese');
                     this.isVisible = true;
                     this.alertSuccess = false;
                     console.log('LoadSpese - errore: ' + error);
                     this.type = 'error';
                     this.Message = error.message;
                     this.alertSuccess = false;
                     this.showNotification(this.type, this.Message);
                   });
             }


             onSpesaTotale(importo: number) { // aggiorno i totali con i valori passati dal figlio

              console.log('onSpesaTotale ----- ' + importo );

              if(importo > 0 ) {  // valore impostato dal figlio in fase di cancellazione
                this.speseTotale = this.speseTotale = + importo;
                }
              }

              onSpesadapagare(importo: number) { // aggiorno i totali con i valori passati dal figlio

                console.log('onSpesadapagare ----- ' + importo );

                if(importo > 0 ) {  // valore impostato dal figlio in fase di cancellazione
                  this.spesedaPagare = this.spesedaPagare = + importo;
                  }
                }

                onSpesapagata(importo: number) { // aggiorno i totali con i valori passati dal figlio

                  console.log('onSpesapagata ----- ' + importo );

                  if(importo > 0 ) {  // valore impostato dal figlio in fase di cancellazione
                    this.spesePagate = this.spesePagate = + importo;
                    }
                  }


             /*
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

            /*
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
            */
}

