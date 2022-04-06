import { Component, OnInit } from '@angular/core';

import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faPlusSquare, faSearch, faSave, faUserEdit, faMinus, faPlus, faWindowClose, faTrash, faReply } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
// classe
import { Giornata } from '../../../classes/Giornata';
import { Manifestazione } from '../../../classes/Manifestazione';
import { Cassaw } from '../../../classes/Cassaw';
import { Cassa } from '../../../classes/Cassa';
import { TTaglia } from '../../../classes/T_taglia';
// services
import { ManifestazioneService } from './../../../services/manifestazione.service';
import { GiornataService } from './../../../services/giornata.service';
import { CtrfuncService } from './../../../services/ctrfunc.service';
import { CassawService } from '../../../services/cassaw.service';
import { CassaService } from '../../../services/cassa.service';
import { TtagliaService} from '../../../services/ttaglia.service';

// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-giornata-detail',
  templateUrl: './giornata-detail.component.html',
  styleUrls: ['./giornata-detail.component.css']
})
export class GiornataDetailComponent implements OnInit {


  public title = "Gestione Giornata";

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

  giornata: Giornata;
  giornate: Giornata[] = [];
  manif: Manifestazione;

 public cassaw: Cassaw;
 public cassew: Cassaw[] = [];

 public cassa: Cassa;
 public casse: Cassa[] = [];

 public taglie: TTaglia[] = [];
 public taglia: TTaglia;




  gior: Giornata;

  public tipoRic = '';
  public tipoGiornata = '';

  // ------------------   variabili per controllo data

  public datepipe: DatePipe = new DatePipe('en-US');
  public formattedDate: string;

  public date1: Date;
  public date2: Date;


  public date1n: number;
  public date2n: number;

  public date1s: string;
  public date2s: string;


  // contrData
  public dt1: any;
  public dt2: any;
  public diffDays1: any;
  public diffDays2: any;

  public foundLastday = false;
  public neverDay = '';
  public enabledDay = false;   // se stato manifestazione = 0 (non aperta) abilito il taso conferma per inserire giornate
  public prg = 0;

  constructor(public modalService: NgbModal,
              private ctrfuncService: CtrfuncService,
              private giornataService: GiornataService,
              private cassawService: CassawService,
              private cassaService: CassaService,
              private tagliaService: TtagliaService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private manifestazioneService: ManifestazioneService,
              private notifier: NotifierService) {
                  this.notifier = notifier;
              }


              ngOnInit(): void {

                console.log('giornata-detail - sono in oninit - preparato messaggio ' + this.Message);

                this.tipoGiornata = 'merda';

                this.checkFunctionbylevel();

              }


              checkFunctionbylevel() {
               //  ----- parte comune a tutti i moduli
              this.rotta = this.route.snapshot.url[0].path;
              this.level = parseInt(localStorage.getItem('user_ruolo'));
              this.functionUrl = this.route.snapshot.url[1].path;

              if(this.route.snapshot.url[1].path !== 'new') {
                this.rottaId =  parseInt(this.route.snapshot.url[2].path);
                this.rottaIdManif =  parseInt(this.route.snapshot.url[3].path);
               } else {
                this.rottaId =  0;
                this.rottaIdManif =  parseInt(this.route.snapshot.url[2].path);
               }



            //  console.log('Rotta: ' + JSON.stringify(this.route.url));
              console.log('Rotta: ' + this.route.url);


              console.log('frontend - checkFunctionbylevel -- step_01');
              console.log('frontend - checkFunctionbylevel -- functionUrl:  --> ' + this.functionUrl);
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
                            this.title = 'Aggiornamento Giornata Manifestazione';
                            this.fase = 'M';
                           } else {
                            this.title = 'Visualizzazione Giornata Manifestazione';
                            this.fase = 'I';
                           }
                          this.Message = 'Situazione Attuale Giornata';
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
                      if(this.manif.stato === 0) {
                        this.enabledDay = true;
                      } else {
                        this.enabledDay = false;
                      }
                      this.loadlastDay(this.idManif);
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

  async loadlastDay(id: number) {
    console.log(`loadlastDay - appena entrato`);
    let rc = await this.giornataService.getLastGiornataidbyManif(id).subscribe(
     resp => {

           console.log(`loadlastDay: ----------------------->  ${JSON.stringify(resp['data'])} `);
           if(resp['rc'] === 'ok') {
              this.foundLastday = true;
              this.gior = resp['data'];
            }
           if(resp['rc'] === 'nf') {
              this.foundLastday = false;
              this.neverDay = 'Nessuna data ancora inserita';
            }
           console.log('fatto lettura last giornata: ' + this.gior.id);
         //  this.type = 'success';
         //  this.Message = 'situazione attuale giornata';
         //  this.alertSuccess = true;
        },
     error => {
          alert('sono in loadlastDay');
          this.isVisible = true;
          this.alertSuccess = false;
          console.log('loadlastDay - errore: ' + error);
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
            this.foundLastday = true;
            this.giornata = resp['data'];
          }
         if(resp['rc'] === 'nf') {
            this.foundLastday = false;
            this.neverDay = 'Nessuna data ancora inserita';
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





  async conferma() {
    console.log('conferma - fase: ' + this.fase);

// controllo sulle date


    this.date1 = new Date(this.gior.dtGiornata);
    this.date2 = new Date(this.giornata.dtGiornata);

    console.log('la data1 lastdata :' + this.date1);

    console.log('la data2 gior.dtGiornata è:' + this.date2);

    if(this.date2 < this.date1) {
      this.type = 'error';
      this.Message = 'Selezionare una data maggiore dell ultima data inserita';
      this.showNotification(this.type, this.Message);
      return;
    }

    this.giornata.idManifestazione = this.manif.id;

    switch (this.fase)  {

        case 'N':
          let rc = await  this.giornataService.createGiornata(this.giornata).subscribe(
          res => {
                this.aggiornaDatafineManifestazione();
                this.loadlastGiornata(this.idManif);

                this.type = 'success';
                this.Message =  res['message'];                               //'utente  creato con successo';
                this.alertSuccess = true;
                this.router.navigate(['/manif/' + this.manif.id]);
             },
            error => {
               console.log(error);
               this.type = 'error';
               this.Message = error.message;
               this.alertSuccess = false;
            });
          break;
      case 'M':

      console.log(`Giornata-detail -- conferma (upd) : ${JSON.stringify(this.giornata)}`);


      let rc1 = this.giornataService.updateGiornata(this.giornata).subscribe(
          res => {
                this.giornata = res['data'];
                this.type = 'success';
                this.Message = res['message'];          //'utente aggiornato con successo del cazzo';
                this.alertSuccess = true;
                this.router.navigate(['/manif/' + this.manif.id]);
             },
            error => {
               console.log(error);
               this.type = 'error';
               this.Message = error.message;
               this.alertSuccess = false;
            });
          break;
      default:
        alert('nav - funzione non ancora attivata');
        break;
    }
    this.showNotification(this.type, this.Message);
  }


  async loadlastGiornata(id: number) {
   // console.log(`loadlastGiornata - appena entrato`);
    let rc = await this.giornataService.getLastGiornataidbyManif(id).subscribe(
     resp => {

      //     console.log(`loadlastGiornata: ----------------------->  ${JSON.stringify(resp['data'])} `);
           if(resp['rc'] === 'ok') {
              this.gior = resp['data'];
              this.creanewCassawGiornata(this.gior.id);
              this.creanewCassaGiornata(this.gior.id);
            }
         },
     error => {
          alert('sono in loadlastGiornata');
          this.isVisible = true;
          this.alertSuccess = false;
          console.log('loadlastGiornata - errore: ' + error);
          this.type = 'error';
          this.Message = error.message;
          this.alertSuccess = false;

        });

  }


  async creanewCassawGiornata(id: number) {
    console.log('creanewCassaw - appenza entrato ----   Giornata ' + id);

    let rc = await this.tagliaService.getAll().subscribe(
      resp => {

            if(resp['rc'] === 'ok') {
               console.log(`creanewCassawGiornata: ----------------------->  ${JSON.stringify(resp['data'])} `);
               this.taglie = resp['data'];
               this.prg = id * 100;
               for(let tagl of this.taglie) {
                  if(tagl.id > 0) {
                    this.cassaw = new Cassaw();
                    console.log(`creanewCassawGiornata: ------fatto istanza -------->  ${JSON.stringify(this.cassaw)} `);
                    this.prg = this.prg + 1;
                    this.cassaw.id = this.prg;
                    this.cassaw.idGiornata = id;
                    this.cassaw.idTaglia = tagl.id;

                    console.log(`creanewCassawGiornata: ------- pronto per inserire ---------------->  ${JSON.stringify(this.cassaw)} `);

                    this.registranewCassaw(this.cassaw);
                  }
               }
             }
         },
      error => {
           alert('sono in creanewCassawGiornata');
           this.isVisible = true;
           this.alertSuccess = false;
           console.log('creanewCassawGiornata - errore: ' + error);
           this.type = 'error';
           this.Message = error.message;
           this.alertSuccess = false;
           this.showNotification(this.type, this.Message);
         });

  }



  async creanewCassaGiornata(id: number) {
    console.log('------ Cassa -------------   creanewCassa - appenza entrato ----   Giornata ' + id);

    let rc = await this.tagliaService.getAll().subscribe(
      resp => {

            if(resp['rc'] === 'ok') {
               console.log(`creanewCassaGiornata: ----------------------->  ${JSON.stringify(resp['data'])} `);
               this.taglie = resp['data'];
               this.prg = id * 100;
               for(let tagl of this.taglie) {
                  if(tagl.id > 0) {
                    this.cassa = new Cassa();
                    console.log(`creanewCassaGiornata: ------fatto istanza -------->  ${JSON.stringify(this.cassa)} `);
                    this.prg = this.prg + 1;
                    this.cassa.id = this.prg;
                    this.cassa.idGiornata = id;
                    this.cassa.idTaglia = tagl.id;
                    this.cassa.key_utenti_operation = +localStorage.getItem('id');
                    console.log(`creanewCassaGiornata: ------- pronto per inserire ---------------->  ${JSON.stringify(this.cassa)} `);

                    this.registranewCassa(this.cassa);
                  }
               }
             }
         },
      error => {
           alert('sono in creanewCassaGiornata');
           this.isVisible = true;
           this.alertSuccess = false;
           console.log('creanewCassaGiornata - errore: ' + error);
           this.type = 'error';
           this.Message = error.message;
           this.alertSuccess = false;
           this.showNotification(this.type, this.Message);
         });

  }




  async registranewCassaw(cassaw: Cassaw) {


    console.log(`registranewCassaw appena entrato: ----------------------->  ${JSON.stringify(cassaw)} `);
    let rc = await this.cassawService.createCassa(cassaw).subscribe(
      resp => {
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

  async registranewCassa(cassa: Cassa) {
    console.log(`registranewCassa appena entrato: ----------------------->  ${JSON.stringify(cassa)} `);
    let rc = await this.cassaService.createCassa(cassa).subscribe(
      resp => {
            if(resp['rc'] !== 'ok') {
              this.isVisible = true;
              this.alertSuccess = false;
              console.log('registranewCassa - errore:creazione nuova taglia ');
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
           console.log('registranewCassa - errore: ' + error);
           this.type = 'error';
           this.Message = error.message;
           this.alertSuccess = false;
           this.showNotification(this.type, this.Message);
         });

  }


async aggiornaDatafineManifestazione() {
    this.manif.dtFine = this.giornata.dtGiornata;
    this.manif.key_utenti_operation = +localStorage.getItem('id');
    let rc = await this.manifestazioneService.updateManifestazione(this.manif).subscribe(
      resp => {
            console.log(`aggiornaDatafineManifestazione:  ${JSON.stringify(resp['data'])} `);
            this.manif = resp['data'];
         },
      error => {
           alert('sono in loadManif');
           this.isVisible = true;
           this.alertSuccess = false;
           console.log('loadManif - errore: ' + error);
           this.type = 'error';
           this.Message = error.message;
           this.alertSuccess = false;

         })

}








  reset() {
    switch (this.fase)  {
        case 'N':
        this.giornata = new Giornata();
        this.type = 'success';
        this.Message = 'Inserire i dati della giornata';
        this.alertSuccess = true;
        break;
      case 'M':
        this.giornataService.getGiornata(this.giornata.id).subscribe(
        res => {
              this.giornata = res['data'];
              this.type = 'success';
              this.Message = 'situazione attuale Giornata !!';
              this.alertSuccess = true;
           },
          error => {
             console.log(error);
             this.type = 'error';
             this.Message = error.message;
             this.alertSuccess = false;
          });
        break;
      default:
        alert('nav - funzione non ancora attivata');
        break;
    }
    this.showNotification(this.type, this.Message);
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



   open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      // alert('controllo la modalità di chiusura della popup - chiusura su tasto save: ' + result);
      if(result ===  'Cancel click') {
         this.cancellazioneAbort();
      }
      if(result ===  'Delete click') {
        // gestire uscita da popup
        this.cancellaUser(this.manif);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
   //   alert('controllo la modalità di chiusura della popup ------------------ chiusura su tasto close: ' + reason);
      this.cancellazioneAbort();
    });

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  cancellazioneAbort() {
    this.type = 'warning';
    this.Message = 'cancellazione abbandonata dall utente';
    this.showNotification(this.type, this.Message);
  }


  cancellaUser(manif: Manifestazione) {

    this.manifestazioneService.deleteManifestazione(manif).subscribe(
        response => {
          if(response['ok']) {
            this.isVisible = true;
            this.alertSuccess = true;
            this.type = 'success';
            this.Message = 'Manifestazione cancellata correttamente';
            this.showNotification(this.type, this.Message);
          }
      },
      error =>
          {
            this.isVisible = true;
            this.alertSuccess = false;
            this.type = 'error';
            this.Message = 'Errore cancellazione User' + '\n' + error.message;
            this.showNotification(this.type, this.Message);
            console.log(error);
          });
  }




}
