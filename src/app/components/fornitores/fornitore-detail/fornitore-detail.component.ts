
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faPlusSquare, faSearch, faSave, faUserEdit, faMinus, faPlus, faWindowClose, faTrash, faReply } from '@fortawesome/free-solid-svg-icons';

import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
// component
import { Fornitore } from '../../../classes/Fornitore';
import { TstatoFornitore } from '../../../classes/T_stato_fornitore';
import { Tsettore } from '../../../classes/T_settore';
// service
import { FornitoreService } from './../../../services/fornitore.service';
import { TstatofornitoreService } from './../../../services/tstatofornitore.service';
import { TsettoreService } from './../../../services/tsettore.service';
import { UploadFilesService } from './../../../services/upload-files.service';

import { CtrfuncService } from '../../../services/ctrfunc.service';

// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-fornitore-detail',
  templateUrl: './fornitore-detail.component.html',
  styleUrls: ['./fornitore-detail.component.css']
})
export class FornitoreDetailComponent implements OnInit {

   // per upload image
   selectedFiles?: FileList;
   currentFile?: File;
   progress = 0;
   messageimage = '';
   fileInfos?: Observable<any>;
   messageupload = '';
   public folderImage = '';   // salvo la cartella in cui salvare immagine
 // per upload image -- fine

   fornitore: Fornitore;
   fornitori: Fornitore[] = [];
   stati: TstatoFornitore[] = [];

   settori: Tsettore[] = [];


   public title = "Gestione Fornitore";

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


   // ---------------------


   public statoModulo  = '?';
   public ricercaIniziale = '';

   closeResult = '';

   public level = 0;
   public nRecord = 0;
   public enabledFunc = false;
   public rotta = '';
   public rottaId = 0;
   public rottaFunz = '';


 // variabili per editazione messaggio

 public Message1 = '';
 public Message2 = '';
 public Message3 = '';
 public Message1err = 'Contattare il gestore dell applicazione.';

 public isValid = false;
 public idFornitore = 0;
 public functionSelected = '';

 public selectedTit = 0;
 public selectedRuo = 0;
 public selectedweb = 0;
 public selectedSta = 0;

 // per gestione abilitazione funzioni con service Moreno

 public functionUrl = '';


 public searchInqu = 'Inqu';
 public searchEdit = 'Edit';
 public searchEdits = 'Edits';
 public searchNew = 'New';

 public functionUrlUp = '';
 public functionUserUp = '';
 public selectedStato = 0;
 public selectedSettore = 0;

 constructor(public modalService: NgbModal,
             private fornitoreService: FornitoreService,
             private tstatofornitoreService: TstatofornitoreService,
             private tsettoreService: TsettoreService,
             private ctrfuncService: CtrfuncService,
             private uploadService: UploadFilesService,
             private datePipe: DatePipe,
             private route: ActivatedRoute,
             private router: Router,
             private notifier: NotifierService) {
               this.notifier = notifier;
             }




             ngOnInit(): void {

              //  console.log('prodotto-detail - sono in oninit - preparato messaggio ' + this.Message);

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

             // console.log('frontend - checkFunctionbylevel -- step_01');

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
                    // leggo le tabelle correlate
                    this.loadstatiprodotto();
                    this.loadsettori();
                    if(this.functionNew) {
                      this.fornitore = new Fornitore();
                      this.fornitore.key_utenti_operation = +localStorage.getItem('id');
                      this.title = 'Inserimento Fornitore';
                      this.fase = 'N';
                      this.Message = `Inserire i dati del fornitore`;
                    } else {
                        this.route.paramMap.subscribe(p => {
                          this.idFornitore = +p.get('id');
                          console.log('id recuperato: ' + this.idFornitore);
                          // -------  leggo i dati della giornata

                          this.loadFornitore(this.idFornitore);
                          if(this.functionEdit || this.functionEdits) {
                            this.title = 'Aggiornamento Fornitore';
                            this.fase = 'M';
                           } else {
                            this.title = 'Visualizzazione Fornitore';
                            this.fase = 'I';
                           }
                          this.Message = 'Situazione Attuale Fornitore';
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
                      this.Message = 'Errore cancellazione Fornitore' + '\n' + error.message;
                      this.showNotification(this.type, this.Message);
                      console.log(error);
                    });

             }




       async  loadstatiprodotto() {

       let rc = await this.tstatofornitoreService.getAll().subscribe(
           resp => {
                 console.log('statiprodotto: ' + JSON.stringify(resp['data']));
                 if(resp['rc'] === 'ok') {
                   this.stati = resp['data'];
                 }
              },
           error => {
                alert('sono in loadFornitore');
                this.isVisible = true;
                this.alertSuccess = false;
                console.log('loadFornitore - errore: ' + error);
                this.type = 'error';
                this.Message = error.message;
                this.alertSuccess = false;

              });
             }


                  async  loadsettori() {

                   let rc = await this.tsettoreService.getAll().subscribe(
                       resp => {
                             console.log('settori fornitore: ' + JSON.stringify(resp['data']));
                             if(resp['rc'] === 'ok') {
                               this.settori = resp['data'];
                             }
                          },
                       error => {
                            alert('sono in loadsettori');
                            this.isVisible = true;
                            this.alertSuccess = false;
                            console.log('loadsettori - errore: ' + error);
                            this.type = 'error';
                            this.Message = error.message;
                            this.alertSuccess = false;
                        });
                    }


        async     loadFornitore(id: number) {
           console.log(`loadFornitore - appena entrato`);
           let rc = await this.fornitoreService.getFornitore(id).subscribe(
                resp => {
                      console.log(`loadFornitore: ${resp['data']}`);
                      this.fornitore = resp['data'];
                      this.fornitore.key_utenti_operation = +localStorage.getItem('id');
                      this.selectedSettore = this.fornitore.settore;
                      this.selectedStato = this.fornitore.stato;

                      console.log('fatto lettura fornitore: ' + this.fornitore.id);
                      this.type = 'success';
                      this.Message = 'situazione attuale Fornitore';
                      this.alertSuccess = true;
                   },
                error => {
                     alert('sono in loadFornitore');
                     this.isVisible = true;
                     this.alertSuccess = false;
                     console.log('loadFornitore - errore: ' + error);
                     this.type = 'error';
                     this.Message = error.message;
                     this.alertSuccess = false;

                   });
              }

  async conferma() {
    console.log('conferma - fase: ' + this.fase);

    switch (this.fase)  {
        case 'N':
          let rc = await  this.fornitoreService.createFornitore(this.fornitore).subscribe(
          res => {
                this.fornitore = res['data'];
                this.type = 'success';
                this.Message =  res['message'];                               //'utente  creato con successo';
                this.alertSuccess = true;
                this.router.navigate(['/fornitore']);
             },
            error => {
               console.log(error);
               this.type = 'error';
               this.Message = error.message;
               this.alertSuccess = false;
            });
          break;
      case 'M':

      console.log(`Fornitore-detail -- conferma (upd) : ${JSON.stringify(this.fornitore)}`);


      let rc1 = await this.fornitoreService.updateFornitore(this.fornitore).subscribe(
          res => {
                this.fornitore = res['data'];
                this.type = 'success';
                this.Message = res['message'];          //'utente aggiornato con successo del cazzo';
                this.alertSuccess = true;
                this.router.navigate(['/fornitore']);
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

  reset() {
    switch (this.fase)  {
        case 'N':
        this.fornitore = new Fornitore();
        this.type = 'success';
        this.Message = 'Inserire i dati della Fornitore';
        this.alertSuccess = true;
        break;
      case 'M':
        this.fornitoreService.getFornitore(this.fornitore.id).subscribe(
        res => {
              this.fornitore = res['data'];
              this.type = 'success';
              this.Message = 'situazione attuale Fornitore';
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
    this.router.navigate(['fornitore']);
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
        this.cancellaUser(this.fornitore);
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


  cancellaUser(fornitore: Fornitore) {

    this.fornitoreService.deleteFornitore(fornitore).subscribe(
        response => {
          if(response['ok']) {
            this.isVisible = true;
            this.alertSuccess = true;
            this.type = 'success';
            this.Message = 'Fornitore cancellato correttamente';
            this.showNotification(this.type, this.Message);
          }
      },
      error =>
          {

         //  const test = 'Cannot delete or update a parent row: a foreign key constraint fails';

           const str = error.error.message;
           const substr = 'Cannot delete or update a parent row: a foreign key constraint fails';

         //  console.log(' controllo se errore contiene una string particolare :' + str.includes(substr));   da true o false

           if(str.includes(substr)) {
              console.log('trovato errore');
              this.isVisible = true;
              this.alertSuccess = false;
              this.type = 'error';
              this.Message = 'Fornitore non cancellabile - presenti legami con altre tabelle';
              this.showNotification(this.type, this.Message);
              //return;
          }  else {
                this.isVisible = true;
                this.alertSuccess = false;
                this.type = 'error';
                console.log('error.message: ' + error.message);
                console.log('error.error.message: ' + error.error.message);
                this.Message = 'Errore cancellazione prodotto' + '\n' + error.error.message;
                this.showNotification(this.type, this.Message);
                console.log(error);
          }
     });

   }

  onSelectedStato(selectedValue: number) {
   //  alert('selezionato: ' + selectedValue);
    if(selectedValue ===  0) {
      this.type = 'error';
      this.Message = 'selezione non corrette';
      this.showNotification(this.type, this.Message);
      this.alertSuccess = false;
      this.isVisible = true;
      return;
   } else {
    this.selectedStato = selectedValue;
   }

 }



 onSelectedSettore(selectedValue: number) {
   //  alert('selezionato: ' + selectedValue);
    if(selectedValue ===  0) {
      this.type = 'error';
      this.Message = 'selezione non corrette';
      this.showNotification(this.type, this.Message);
      this.alertSuccess = false;
      this.isVisible = true;
      return;
   } else {
    this.selectedSettore = selectedValue;
   }

 }


}

