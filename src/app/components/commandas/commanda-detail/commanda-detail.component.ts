import { Component, OnInit } from '@angular/core';// classe model
import { Commanda } from '../../../classes/Commanda';
import { Commandariga } from '../../../classes/Commandariga';

import { faPlusSquare, faSearch, faSave, faUserEdit, faMinus, faPlus, faWindowClose, faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
// services

import { CommandaService } from './../../../services/commanda.service';
// finire commandarigaservice e testare i metodi con postman
import { CommandarigaService } from './../../../services/commandariga.service';
import { CtrfuncService } from './../../../services/ctrfunc.service';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-commanda-detail',
  templateUrl: './commanda-detail.component.html',
  styleUrls: ['./commanda-detail.component.css']
})
export class CommandaDetailComponent implements OnInit {

  public title = 'gestione Commanda - commanda-detail works';
  public titleIncasso = 'Incasso';
  public titleResto = 'Resto';
  // icone
    faPlusSquare = faPlusSquare;
    faSearch = faSearch;
    faSave = faSave;
    faUserEdit = faUserEdit;
    faMinus = faMinus;
    faPlus = faPlus;
    faWindowClose = faWindowClose;
    faHandPointLeft = faHandPointLeft;


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


 public commanda: Commanda;
 public commandarighe: Commandariga[] = [];
 public commandarighenull: Commandariga[] = [];

 // mettere commandarighe
 public idCommanda = 0;
 public commandanull = new Commanda();

// per paginazone
p: number = 1;


 constructor(private ctrfuncService: CtrfuncService,
             private commandarigaService: CommandarigaService,
             private commandaService: CommandaService,
             private route: ActivatedRoute,
             private router: Router,
             private datePipe: DatePipe,
             private notifier: NotifierService) {
                     this.notifier = notifier;
                 }

                 ngOnInit(): void {

                  console.log('commanda-detail - sono in oninit');

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


                       if(this.functionNew) {
                         // non ci sarà mai
                         this.commanda = new Commanda();
                         this.commanda.key_utenti_operation = +localStorage.getItem('id');
                         this.title = 'Inserimento Commanda';
                         this.fase = 'N';
                         this.Message = `Inserire i dati della Commanda`;
                       } else {
                           this.route.paramMap.subscribe(p => {
                             this.idCommanda = +p.get('id');
                             this.loadCommanda(this.idCommanda);
                             this.loadCommandarighe(this.idCommanda);
                             // modello modificato - possibile solo aggiornamento della cassa
                             /*
                             if(this.functionEdit || this.functionEdits) {
                               this.title = 'Situazione Cassa Giornaliera';
                               this.fase = 'M';
                              } else {
                               this.title = 'Visualizzazione Cassa Giornaliera';
                               this.fase = 'I';
                              }  */
                             this.Message = 'Situazione Attuale Persona ';
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
                         this.Message = 'Errore checkFunctionbylevel' + '\n' + error.message;
                         this.showNotification(this.type, this.Message);
                         console.log(error);
                       });

                }


          async  loadCommanda(id: number) {
                 console.log(`loadCommanda - appena entrato`);
                 let rc = await this.commandaService.getCommanda(id).subscribe(
                  resp => {

                        console.log(`loadCommanda:  ${JSON.stringify(resp['data'])} `);
                        if(resp['rc'] === 'ok') {
                          this.commanda = resp['data'];
                          this.commanda.key_utenti_operation = +localStorage.getItem('id');
                        }
                        if(resp['rc'] === 'nf') {
                          this.commanda = this.commandanull;
                        }

                     },
                  error => {
                       alert('sono in loadCommanda');
                       this.isVisible = true;
                       this.alertSuccess = false;
                       console.log('loadCommanda - errore: ' + error);
                       this.type = 'error';
                       this.Message = error.message;
                       this.alertSuccess = false;
                     });
                }

                async  loadCommandarighe(id: number) {
                  console.log(`loadCommandarighe - appena entrato`);
                  let rc = await this.commandarigaService.getrighebyCommanda(id).subscribe(
                   resp => {

                         console.log(`loadCommandarighe:  ${JSON.stringify(resp['data'])} `);
                         if(resp['rc'] === 'ok') {
                           this.commandarighe = resp['data'];
                    //       this.commandarighe.key_utenti_operation = +localStorage.getItem('id');
                         }
                         if(resp['rc'] === 'nf') {
                           this.commandarighe = this.commandarighenull;

                         }

                      },
                   error => {
                        alert('sono in loadCommanda');
                        this.isVisible = true;
                        this.alertSuccess = false;
                        console.log('loadCommanda - errore: ' + error);
                        this.type = 'error';
                        this.Message = error.message;
                        this.alertSuccess = false;
                      });
                 }









    goback() {
      alert('da fare');
      // this.router.navigate(['/manif/' + this.manif.id]);
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






/*     codice da analizzare

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
                  this.giornata = res['data'];
                  this.aggiornaDatafineManifestazione();
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


*/


}
