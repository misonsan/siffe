import { Component, OnInit } from '@angular/core';

import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faPlusSquare, faSearch, faSave, faUserEdit, faMinus, faPlus, faWindowClose, faTrash, faReply, faUndo, faHandPointLeft, faTrashAlt, faInfoCircle, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
// classe
import { Giornata } from '../../../classes/Giornata';
import { Cassaw } from '../../../classes/Cassaw';
import { TTaglia } from '../../../classes/T_taglia';
// services
import { GiornataService } from './../../../services/giornata.service';
import { CtrfuncService } from './../../../services/ctrfunc.service';
import { CassawService } from '../../../services/cassaw.service';
import { TtagliaService} from '../../../services/ttaglia.service';

// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-giornata-cassa',
  templateUrl: './giornata-cassa.component.html',
  styleUrls: ['./giornata-cassa.component.css']
})
export class GiornataCassaComponent implements OnInit {

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
  public functionUserUp = ''


 // ---------------------  personalizzazioni componente


 public cassaw: Cassaw;
 public cassew: Cassaw[] = [];
 public taglie: TTaglia[] = [];
 public taglia: TTaglia;
 public giornata: Giornata;


 //public giornata: Giornata;
 //  campi calcolati per editazione

 // valore iniziale
 public vi100 = 0;
 public vi050 = 0;
 public vi020 = 0;
 public vi010 = 0;
 public vi005 = 0;
 public vimoneta = 0;

 // totali
 public tinizio = 0;
 public tattuale = 0;
 public tfinale = 0;
 public tsbilancio = 0;
 public enabledCassaFinale = false;
 public enabledCassaIniziale = false;
 public keyCassaw = 0;
 public CassaCaricata = false;

 public valore = 0;

  public totaleCassa = 0;
  public totaleCassaBefore = 0;
  public enabledSalva = false;
  public idTaglia = 0;
  public numidCassa = 0;
  public uno = 1;

  public isloadedCassa = false;

  // per paginazone
p: number = 1;

constructor(public modalService: NgbModal,
            private ctrfuncService: CtrfuncService,
            private giornataService: GiornataService,
            private cassawService: CassawService,
            private tagliaService: TtagliaService,
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
// 'giornata/ValoriCassa/Edits/:id',
              checkFunctionbylevel() {
                //  ----- parte comune a tutti i moduli
               this.rotta = this.route.snapshot.url[0].path;
               this.level = parseInt(localStorage.getItem('user_ruolo'));
               this.functionUrl = this.route.snapshot.url[2].path;
               this.rottaTipo = this.route.snapshot.url[1].path;

               if(this.route.snapshot.url[1].path !== 'new') {
                 this.rottaId =  parseInt(this.route.snapshot.url[3].path);
               } else {
                 this.rottaId =  0;
               }


             //  console.log('Rotta: ' + JSON.stringify(this.route.url));
               console.log('Rotta: ' + this.route.url);

               console.log('frontend - checkFunctionbylevel -- step_01');
               console.log('frontend - checkFunctionbylevel -- functionUrl:  --> ' + this.functionUrl);
               console.log('frontend - checkFunctionbylevel -- functionUrl:  --> ' + this.rottaTipo);
               console.log('frontend - checkFunctionbylevel -- rottaId ' + this.rottaId);




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
            //  leggo la giornata




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
                           this.cassaw = new Cassaw();
                           this.loadGiornata(this.idGiornata);
                           console.log('-------------------   ho letto la giornata ---   imposto cassaw e title ' );

                           // modello modificato - possibile solo aggiornamento della cassa
                           /*
                           if(this.functionEdit || this.functionEdits) {
                             this.title = 'Situazione Cassa Giornaliera';
                             this.fase = 'M';
                            } else {
                             this.title = 'Visualizzazione Cassa Giornaliera';
                             this.fase = 'I';
                            }  */
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


               async loadGiornata(id: number) {

                console.log(`loadGiornata - appena entrato` + id);
                let rc = await this.giornataService.getGiornata(id).subscribe(
                 resp => {

                       console.log(`loadGiornata: ----------------------->  ${JSON.stringify(resp['data'])} `);
                       if(resp['rc'] === 'ok') {
                        this.giornata = resp['data'];
                  //        this.conteggiaValori();
                        if(this.giornata.cassaInizio === this.giornata.cassaAttuale && this.giornata.cassaInizio === 0){
                          this.title = 'Apertura Cassa';
                          console.log('------------------>             devo fare la creazione di cassaw');
                          } else {
                            if(this.giornata.cassaInizio === this.giornata.cassaAttuale && this.giornata.cassaInizio > 0) {
                              this.title = 'Modifica Cassa Iniziale';
                             } else {
                              this.azzeroCassaw(id);
                              this.title = 'Chiusura Cassa';
                             }
                         }
                        this.loadCassaw(id);
                        this.type = 'success';
                        this.Message = 'situazione attuale Cassa giornata';
                        this.alertSuccess = true;
                       }

                       if(resp['rc'] === 'nf') {
                            this.isVisible = true;
                            this.type = 'error';
                            this.Message = 'inesistente giornata';
                            this.alertSuccess = false;
                            this.showNotification(this.type, this.Message);
                        }
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


       async   azzeroCassaw(id: number) {
              let rc = await this.cassawService.azzeraCassa(id).subscribe(
                resp => {
                      if(resp['rc'] !== 'ok') {
                         this.type = 'error';
                         this.Message = 'errore in azzeramento cassa';
                         this.alertSuccess = true;
                         this.isVisible = true;
                         this.showNotification(this.type, this.Message);
                       }
                   },
                error => {
                     alert('azzeroCassaw');
                     this.isVisible = true;
                     this.alertSuccess = false;
                     console.log('Salva - errore: ' + error);
                     this.type = 'error';
                     this.Message = error.message;
                     this.alertSuccess = false;
                     this.showNotification(this.type, this.Message);
                   });
             }





async Salva() {
  // sto registrando la cassa iniziale ( o anche aggiornamento cassa iniziale)

  // leggo tutte le taglie della cassa






  if(this.giornata.statoCassa === 0 || this.giornata.statoCassa === 1) {

    this.salvoCassaIniziale();

  }
  if(this.giornata.statoCassa > 1  ) {

    this.salvoCassaFinale();

    if(this.giornata.statoUtenti === 1  &&
       this.giornata.statoMagazzino === 1 &&
       this.giornata.statoCassa === 1) {
          this.giornata.stato = 2;
       }
    if(this.giornata.statoUtenti === 1  &&
        this.giornata.statoMagazzino === 1 &&
        this.giornata.statoCassa === 3) {
           this.giornata.stato = 3;
        }
  }

  console.log('salva - pronto per fare aggiornamento cassa ' + JSON.stringify(this.giornata));

  this.aggiornacassaGiorno(this.giornata);

}

async aggiornacassaGiorno(giornata: Giornata) {

  let rc = await this.giornataService.updateGiornata(giornata).subscribe(
    resp => {

          console.log(`salva: ----------------------->  ${JSON.stringify(resp['data'])} `);
          if(resp['rc'] === 'ok') {
             this.type = 'success';
             this.Message = 'Cassa Aggiornata correttamente';
             this.alertSuccess = true;
             this.router.navigate(['/giornata/Cassa/Edits/' + this.giornata.id + '/' + this.giornata.idManifestazione]);
           }
       },
    error => {
         alert('sono in Salva');
         this.isVisible = true;
         this.alertSuccess = false;
         console.log('Salva - errore: ' + error);
         this.type = 'error';
         this.Message = error.message;
         this.alertSuccess = false;
         this.showNotification(this.type, this.Message);
       });

}

async creanewCassawGiornata(id: number) {
  console.log('creanewCassaw - appenza entrato ----   Giornata ' + id);
  let prg = 0;
  let rc = await this.tagliaService.getAll().subscribe(
    resp => {

          if(resp['rc'] === 'ok') {
             console.log(`creanewCassawGiornata: ----------------------->  ${JSON.stringify(resp['data'])} `);
             this.taglie = resp['data'];
             prg = this.idGiornata * 100;
             for(let tagl of this.taglie) {
                if(tagl.id > 0) {
                  this.cassaw = new Cassaw();
                  prg = prg + 1;
                  this.cassaw.id = prg;
                  this.cassaw.idGiornata = id;
                  this.cassaw.idTaglia = tagl.id;
                  this.registranewCassaw(this.cassaw);
                }
             }
           }
       },
    error => {
         alert('creanewCassawGiornata in Salva');
         this.isVisible = true;
         this.alertSuccess = false;
         console.log('Salva - errore: ' + error);
         this.type = 'error';
         this.Message = error.message;
         this.alertSuccess = false;
         this.showNotification(this.type, this.Message);
       });

}


async registranewCassaw(taglia: Cassaw) {

  let rc = await this.cassawService.createCassa(taglia).subscribe(
    resp => {

      //    console.log(`salva: ----------------------->  ${JSON.stringify(resp['data'])} `);
          if(resp['rc'] !== 'ok') {
            this.isVisible = true;
            this.alertSuccess = false;
            console.log('registranewCassaw - errore:creazione nuova taglia ');
            this.type = 'error';
            this.Message = 'errore in creazione nuove taglie';
            this.alertSuccess = false;
            this.showNotification(this.type, this.Message);
            return;
           }
       },
    error => {

         this.isVisible = true;
         this.alertSuccess = false;
         console.log('registranewCassaw - errore: ' + error);
         this.type = 'error';
         this.Message = error.message;
         this.alertSuccess = false;
         this.showNotification(this.type, this.Message);
       });

}



async salvoCassaIniziale() {

  console.log('salvoCassaIniziale - sono appena dentro');
  this.giornata.statoCassa = 1;
  this.giornata.operationCassa = 'I';

  let rc = await this.cassawService.getbyidGiornata(this.idGiornata).subscribe(
    resp => {
          if(resp['rc'] === 'ok') {
            this.cassew = resp['data'];
            console.log('SalvoCassaIniziale ----------------------- cassaw ' + JSON.stringify(this.cassew));
            for(let cassa of this.cassew) {

              if(cassa.qtaInc > 0) {
                if(cassa.idTaglia === 5) {
                  this.giornata.i100 = cassa.qtaInc;
                  this.giornata.i100Valore = cassa.valoreInc;
                  this.giornata.a100 = cassa.qtaInc;
                  this.giornata.a100Valore = cassa.valoreInc;
                  }
                if(cassa.idTaglia === 4) {
                    this.giornata.i050 = cassa.qtaInc;
                    this.giornata.i050Valore = cassa.valoreInc;
                    this.giornata.a050 = cassa.qtaInc;
                    this.giornata.a050Valore = cassa.valoreInc;
                  }
                if(cassa.idTaglia === 3) {
                    this.giornata.i020 = cassa.qtaInc;
                    this.giornata.i020Valore = cassa.valoreInc;
                    this.giornata.a020 = cassa.qtaInc;
                    this.giornata.a020Valore = cassa.valoreInc;
                   }
                if(cassa.idTaglia === 2) {
                    this.giornata.i010 = cassa.qtaInc;
                    this.giornata.i010Valore = cassa.valoreInc;
                    this.giornata.a010 = cassa.qtaInc;
                    this.giornata.a010Valore = cassa.valoreInc;
                   }
                if(cassa.idTaglia === 1) {
                    this.giornata.i005 = cassa.qtaInc;
                    this.giornata.i005Valore = cassa.valoreInc;
                    this.giornata.a005 = cassa.qtaInc;
                    this.giornata.a005Valore = cassa.valoreInc;
                   }
                if(cassa.idTaglia === 6) {
                    this.giornata.icontante = cassa.valoreInc;
                    this.giornata.acontante = cassa.valoreInc;
                   }
              }
            }

            this.giornata.cassaInizio =  this.giornata.i100Valore  +
                                          this.giornata.i050Valore +
                                          this.giornata.i020Valore +
                                          this.giornata.i010Valore +
                                          this.giornata.i005Valore +
                                          this.giornata.icontante;

            this.giornata.cassaAttuale = this.giornata.cassaInizio;

            console.log(' finito caricamento cassa iniziale ---------------------' + this.giornata.cassaInizio);
            this.aggiornacassaGiorno(this.giornata);
          }
       },
    error => {
         alert('sono in salvoCassaIniziale');
         this.isVisible = true;
         this.alertSuccess = false;
         console.log('salvoCassaIniziale - errore: ' + error);
         this.type = 'error';
         this.Message = error.message;
         this.alertSuccess = false;
         this.showNotification(this.type, this.Message);
       });
}


/*
async salvoCassaIniziale() {

  this.giornata.statoCassa = 1;
  this.giornata.operationCassa = 'I';

  let rc = await this.cassawService.getbyidGiornata(this.idGiornata).subscribe(
    resp => {
      if(resp['rc'] === 'ok') {
        console.log(`creanewCassawGiornata: ----------------------->  ${JSON.stringify(resp['data'])} `);
        this.cassew = resp['data'];
        for(let tagl of this.cassew) {
           if(tagl.qtaInc > 0) {
             this.aggiornaTaglia(tagl.idTaglia, tagl.qtaInc, tagl.valoreInc);
             }
           }
          }
       },
    error => {
         alert('sono in salvoCassaIniziale');
         this.isVisible = true;
         this.alertSuccess = false;
         console.log('salvoCassaIniziale - errore: ' + error);
         this.type = 'error';
         this.Message = error.message;
         this.alertSuccess = false;
         this.showNotification(this.type, this.Message);
       });
}


aggiornaTaglia(idTaglia: number, qtaInc: number, valoreInc: number) {

}

*/



async salvoCassaFinale() {

  this.giornata.statoCassa = 3;
  this.giornata.operationCassa = 'C';

  let rc = await this.cassawService.getbyidGiornata(this.idGiornata).subscribe(
    resp => {
          if(resp['rc'] === 'ok') {
            this.cassew = resp['data'];
            for(let cassa of this.cassew) {
              if(cassa.idTaglia === 5) {
                this.giornata.f100 = cassa.qtaInc;
                this.giornata.f100Valore = cassa.valoreInc;
                }
              if(cassa.idTaglia === 4) {
                  this.giornata.f050 = cassa.qtaInc;
                  this.giornata.f050Valore = cassa.valoreInc;
                }
              if(cassa.idTaglia === 3) {
                  this.giornata.f020 = cassa.qtaInc;
                  this.giornata.f020Valore = cassa.valoreInc;
                 }
              if(cassa.idTaglia === 2) {
                  this.giornata.f010 = cassa.qtaInc;
                  this.giornata.f010Valore = cassa.valoreInc;
                 }
              if(cassa.idTaglia === 1) {
                  this.giornata.f005 = cassa.qtaInc;
                  this.giornata.f005Valore = cassa.valoreInc;
                 }
              if(cassa.idTaglia === 6) {
                  this.giornata.fcontante = cassa.valoreInc;
                 }
            }
            this.giornata.cassaFinale =  this.giornata.f100Valore  +
                                          this.giornata.f050Valore +
                                          this.giornata.f020Valore +
                                          this.giornata.f010Valore +
                                          this.giornata.f005Valore +
                                          this.giornata.fcontante;

            }
       },
    error => {
         alert('sono in salvoCassaFinale');
         this.isVisible = true;
         this.alertSuccess = false;
         console.log('salvoCassaFinale - errore: ' + error);
         this.type = 'error';
         this.Message = error.message;
         this.alertSuccess = false;
         this.showNotification(this.type, this.Message);
       });
}




async caricaCassawGiornata(id: number) {

  let rc = await this.cassawService.deleteidGiornata(id).subscribe(
    resp => {
              if(resp['rc'] === 'ok') {
                this.idTaglia = 5;
                this.numidCassa = id + 1;
                this.caricaCassaw(id, this.numidCassa, this.idTaglia, this.giornata.a100, this.giornata.a100Valore);
                this.idTaglia = 4;
                this.numidCassa = this.numidCassa + 1;
                this.caricaCassaw(id, this.numidCassa, this.idTaglia, this.giornata.a050, this.giornata.a050Valore);
                this.idTaglia = 3;
                this.numidCassa = this.numidCassa + 1;
                this.caricaCassaw(id, this.numidCassa, this.idTaglia, this.giornata.a020, this.giornata.a020Valore);
                this.idTaglia = 2;
                this.numidCassa = this.numidCassa + 1;
                this.caricaCassaw(id, this.numidCassa, this.idTaglia, this.giornata.a010, this.giornata.a010Valore);
                this.idTaglia = 1;
                this.numidCassa = this.numidCassa + 1;
                this.caricaCassaw(id, this.numidCassa, this.idTaglia, this.giornata.a005, this.giornata.a005Valore);
                this.idTaglia = 6;
                this.numidCassa = this.numidCassa + 1;
                this.caricaCassaw(id, this.numidCassa, this.idTaglia, this.uno, this.giornata.acontante);
              }
       },
    error => {
         alert('sono in cancellaCassaw');
         this.isVisible = true;
         this.alertSuccess = false;
         console.log('cancellaCassaw - errore: ' + error);
         this.type = 'error';
         this.Message = error.message;
         this.alertSuccess = false;
         this.showNotification(this.type, this.Message);
       });
}


async caricaCassawChiusura(id: number) {

  let rc = await this.cassawService.deleteidGiornata(id).subscribe(
    resp => {
          if(resp['rc'] === 'ok') {
            this.idTaglia = 5;
            this.numidCassa = id + 1;
            this.caricaCassaw(id, this.numidCassa, this.idTaglia, this.giornata.f100, this.giornata.f100Valore);
            this.idTaglia = 4;
            this.numidCassa = this.numidCassa + 1;
            this.caricaCassaw(id, this.numidCassa, this.idTaglia, this.giornata.f050, this.giornata.f050Valore);
            this.idTaglia = 3;
            this.numidCassa = this.numidCassa + 1;
            this.caricaCassaw(id, this.numidCassa, this.idTaglia, this.giornata.f020, this.giornata.f020Valore);
            this.idTaglia = 2;
            this.numidCassa = this.numidCassa + 1;
            this.caricaCassaw(id, this.numidCassa, this.idTaglia, this.giornata.f010, this.giornata.f010Valore);
            this.idTaglia = 1;
            this.numidCassa = this.numidCassa + 1;
            this.caricaCassaw(id, this.numidCassa, this.idTaglia, this.giornata.f005, this.giornata.f005Valore);
            this.idTaglia = 6;
            this.numidCassa = this.numidCassa + 1;
            this.caricaCassaw(id, this.numidCassa, this.idTaglia, this.uno, this.giornata.fcontante);

           }
       },
    error => {
         alert('sono in caricaCassawChiusura');
         this.isVisible = true;
         this.alertSuccess = false;
         console.log('caricaCassawChiusura - errore: ' + error);
         this.type = 'error';
         this.Message = error.message;
         this.alertSuccess = false;
         this.showNotification(this.type, this.Message);
       });
}


async loadCassaw(id: number) {
  let rc = await this.cassawService.getbyidGiornata(id).subscribe(
    resp => {
          if(resp['rc'] === 'ok') {
            this.cassew = resp['data'];
            this.isloadedCassa = true;
            this.loadTotaliCassa(id);
            console.log('-------------------------    loadCassaw - letto la cassaw ' + JSON.stringify(this.cassew));
            }
          if(resp['rc'] === 'nf') {
            console.log('--------------------    loadCassaw - NON ESISTE CASSA - LA CREO ');
              this.isloadedCassa = false;
            }
       },
    error => {
         alert('sono in loadCassaw');
         this.isVisible = true;
         this.alertSuccess = false;
         console.log('loadCassaw - errore: ' + error);
         this.type = 'error';
         this.Message = error.message;
         this.showNotification(this.type, this.Message);
       });
}



async   loadTotaliCassa(id: number)  {
      let rc = await this.cassawService.getTotaleCassa(id).subscribe(
        resp => {
              if(resp['rc'] === 'ok') {
                this.totaleCassa = resp['incassato'];
                }
           },
        error => {
             alert('sono in loadTotaliCassa');
             this.isVisible = true;
             this.alertSuccess = false;
             console.log('loadTotaliCassa - errore: ' + error);
             this.type = 'error';
             this.Message = error.message;
             this.showNotification(this.type, this.Message);
           });
    }




async caricaCassaw(id: number, prog: number, idTaglia: number, numpezzi: number, valore: number) {

    this.cassaw = new Cassaw();
    this.cassaw.id = prog;
    this.cassaw.idGiornata = id;
    this.cassaw.idTaglia = idTaglia;
    this.cassaw.qtaInc = numpezzi;
    this.cassaw.valoreInc = valore;
    this.cassaw.qtaRes = 0;
    this.cassaw.valoreRes = 0;

    let rc = await this.cassawService.createCassa(this.cassaw).subscribe(
      resp => {
            if(resp['rc'] !== 'ok') {
              this.isVisible = true;
              this.alertSuccess = false;
              this.type = 'error';
              this.Message = 'errore caricamento cassaw - taglia: ' + idTaglia;
              this.showNotification(this.type, this.Message);
              return;
             }
         },
      error => {
           alert('sono in caricaCassaw');
           this.isVisible = true;
           this.alertSuccess = false;
           console.log('caricaCassawa - errore: ' + error);
           this.type = 'error';
           this.Message = error.message;
           this.showNotification(this.type, this.Message);
         });
}



backToGiornata() {
  alert('backToGiornata - da fare');
}

resetForm() {
  this.azzeroCassaw(this.giornata.id);
  this.loadCassaw(this.giornata.id);
  this.type = 'success';
  this.Message = 'Cassa resettata';
  this.alertSuccess = true;
}

totaleIncassato(totInc: number) {
 // alert('passato da figlio a padre: ' + totInc);
  console.log('totaleIncassato: -  passato da figlio: ' + totInc);
  this.totaleCassa = totInc;
  this.loadCassaw(this.giornata.id);
}


}

