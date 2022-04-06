import { Component, OnInit } from '@angular/core';
import { faPlusSquare, faSearch, faInfoCircle, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { ManifestazioneService} from './../../../services/manifestazione.service';
import { GiornataService } from './../../../services/giornata.service';
import { Manifestazione} from '../../../classes/Manifestazione';
import { Giornata} from '../../../classes/Giornata';
import { ActivatedRoute, Router } from '@angular/router';
// per gestire inserimento/Modifica con popup
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CtrfuncService } from '../../../services/ctrfunc.service';

// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';
import { JsonpClientBackend } from '@angular/common/http';

@Component({
  selector: 'app-manifestazione-days',
  templateUrl: './manifestazione-days.component.html',
  styleUrls: ['./manifestazione-days.component.css']
})
export class ManifestazioneDaysComponent implements OnInit {

  public d_manifestazione: string;
  public data_inizio = new Date();
  public data_fine = new Date();
  public title = "elenco giornate Manifestazione - Manif-data";
  // icone
  faPlusSquare = faPlusSquare;
  faSearch = faSearch;
  faInfoCircle = faInfoCircle;
  faUserEdit = faUserEdit;

  public giornate: Giornata[] = [];
  public giornata: Giornata;
  public manif: Manifestazione;
  public giornatenull: Giornata[] = [];

  public tipoRichiesta = '?';
  public ricManif = 0;
  public validSearch = false;
  private textMessage = '';

  options = [
    'Tutte',
    'Aperta',
    'Non Aperta',
    'Chiusa',
    'Estinta'
  ];

   // per paginazone
p: number = 1;

// -----------------------------    da detail1



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
public rottaFunz = '';


// variabili per editazione messaggio

public Message1 = '';
public Message2 = '';
public Message3 = '';
public Message1err = 'Contattare il gestore dell applicazione.';

public isValid = false;
public idManif = 0;
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



constructor(private manifestazioneService: ManifestazioneService,
            private giornataService: GiornataService,
            private ctrfuncService: CtrfuncService,
            private route: ActivatedRoute,
            private router: Router,
            private modalService: NgbModal,
            private notifier: NotifierService) {
              this.notifier = notifier;
            }




  ngOnInit(): void {
    console.log('manifestazione-day - sono in oninit  ');

    this.checkFunctionbylevel();

    console.log('manifestazione-day - ----------------------->    finito  ');


  }

  checkFunctionbylevel() {
    //  ----- parte comune a tutti i moduli
    /*    filtro di recupero dati normale

   this.rotta = this.route.snapshot.url[0].path;
   this.level = parseInt(localStorage.getItem('user_ruolo'));
   this.functionUrl = this.route.snapshot.url[1].path;

   if(this.route.snapshot.url[1].path !== 'new') {
     this.rottaId =  parseInt(this.route.snapshot.url[2].path);
    } else {
     this.rottaId =  0;
    }
*/

//    filtro di recupero dati per questa gestione
    this.rotta = this.route.snapshot.url[0].path;
    this.level = parseInt(localStorage.getItem('user_ruolo'));
    this.rottaId = parseInt(this.route.snapshot.url[1].path);
    this.functionUrl = 'Edits';  // <------   forzatura. permesso solo a -1

    console.log('checkFunctionbylevel --------------------   step_01  ');
  // console.log('frontend - checkFunctionbylevel -- step_01');

    this.ctrfuncService.checkFunctionbylevelDetail(this.rotta, this.level, this.functionUrl).subscribe(
     response =>{
            if(response['rc'] === 'ko') {
              this.isVisible = true;
              this.alertSuccess = false;
              this.type = 'error';
              this.Message = response['message'];
              this.showNotification(this.type, this.Message);
              return;
            }
            console.log('checkFunctionbylevel --------------------   step_02  ');
            if (response['rc'] === 'ok') {
              this.functionUser = response['data'];
              //  ----- fine parte comune a tutti i moduli

                //  parte personalizzabile
                   //   console.log('frontend - checkFunctionbylevelDetail - funzione determinata: ' + this.functionUser);
                   //   console.log('messaggio: ' + response['message']);
              this.functionInqu =  false;
              this.functionEdit = false;
              this.functionEdits = false;
              this.functionNew = false;

              if (this.level === -1) {
                if (this.functionUser === this.searchEdit) {
                  this.functionEdit = true;
                }
                if (this.functionUser === this.searchEdits) {
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
              this.isVisible = true;
              this.alertSuccess = true;
              console.log('checkFunctionbylevel --------------------   step_03  ');
              this.route.paramMap.subscribe(p => {
                this.idpassed = +p.get('id');
                console.log('id recuperato: ' + this.idpassed);
                // -------  leggo i dati della giornata
                this.loadManifestazione(this.idpassed);
                console.log('checkFunctionbylevel --------------------   step_04  ');
                this.tipoRichiesta = "T";
                this.loadGiornatefromManif(this.idpassed, this.tipoRichiesta);
                console.log('checkFunctionbylevel --------------------   step_05  ');
                if(this.functionEdit || this.functionEdits) {
                  this.title = 'Situazione Manifestazione';
                  this.fase = 'M';
                 } else {
                  this.title = 'Visualizzazione User';
                  this.fase = 'I';
                 }
                this.Message = 'Situazione Attuale utente';
              //  fine parte personalizzabile
            });
            console.log('checkFunctionbylevel --------------------   step_99  ');
              this.type = 'success';
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

// recupero i dati della messa
async loadManifestazione(id: number) {
 console.log('frontend - loadManifestazione: ' + id);
 let rc = await  this.manifestazioneService.getManifestazione(id).subscribe(


   response => {
       this.manif = response['data'];
   },
   error => {
      alert('Manif-Data  --loadManifestazione: ' + error.message);
      console.log(error);
   });

}

// metodo fatto da Moreno per selezionare le giornate della manifestazione

async loadGiornatefromManif(id: number, tipoRic: string) {
   console.log('frontend - loadGiornatefromManif: ' + id);
   this.trovatoRec = false;
   this.isVisible = true;
   let rc = await  this.giornataService.getGiornateforManif(id,tipoRic).subscribe(
    // sentire hidran per lettura particolare
   // this.fedeleService.getFedeliforMessa(id).subscribe(
      response => {
          this.giornate = response['data'];
          this.nRec = response['number'];
          this.textMessage = response['message'];
          this.trovatoRec = true;
          this.alertSuccess = true;
          this.Message = 'Situazione Attuale - Nessuna giornata presente per il tipo di richiesta';
          if(this.nRec > 0){
            this.Message = 'Situazione Attuale';
          }

       //   alert('loadGiornateFromManif - dovrei aver letto le giornate' + this.nRec + ' Messaggio: ' + this.textMessage);
       //   console.log('loadGiornateFromManif - dovrei aver letto le giornate' + this.nRec + ' Messaggio: ' + this.textMessage);
      },
      error => {
         alert('Manifestazione-Data  -- loadGiornatefromManif: ' + error.message);
         console.log(error);
         this.alertSuccess = false;
         this.Message = error.message;
      });

    }



  checkFunctionbylevelxxx() {
    /*
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

         if(this.functionNew) {
           this.manif = new Manifestazione();
           this.manif.key_utenti_operation = +localStorage.getItem('id');
           this.title = 'Inserimento Manifestazione';
           this.fase = 'N';
           this.Message = `Inserire i dati della manifestazione`;
         } else {
             this.route.paramMap.subscribe(p => {
               this.idManif = +p.get('id');
               console.log('id recuperato: ' + this.idManif);
               // -------  leggo i dati della giornata

               this.loadManifestazione(this.idManif);
               // -------  leggo tutte le giornate per la manifestazione selezionata
               this.tipoRichiesta = "T";
               this.loadGiornatefromManif(this.idManif), this.tipoRichiesta);  // versi
             if(this.functionEdit || this.functionEdits) {
                 this.title = 'Aggiornamento Manifestazione';
                 this.fase = 'M';
                } else {
                 this.title = 'Visualizzazione Manifestazione';
                 this.fase = 'I';
                }
               this.Message = 'Situazione Attuale Manifestazione';
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


      */
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

registra() {

  this.router.navigate(['giornata/new/' + this.manif.id]);

}


onSelectionChange(tipo: string)   {

 // alert('onSelectionChange - Tipo Richiesta: ' + tipo);

  this.tipoRichiesta = tipo.substring(0, 1);


  this.trovatoRec = false;
  this.isVisible = true;
  this.giornataService.getGiornateforManif(this.idpassed, this.tipoRichiesta).subscribe(
    // sentire hidran per lettura particolare
   // this.fedeleService.getFedeliforMessa(id).subscribe(
      response => {
          console.log('dopo ricerca per tipo ' + this.tipoRichiesta + ' esito: ' + response['rc'] + ' dati: ' + JSON.stringify(response['data']) + ' record: ' + response['number']) ;
          if(response['rc'] === 'ok') {
            this.giornate = response['data'];
            this.nRec = response['number'];
            this.textMessage = response['message'];
            this.trovatoRec = true;
            this.alertSuccess = true;
            this.Message = 'Situazione Attuale';
          }
          if(response['rc'] === 'nf') {
            this.giornate = this.giornatenull;
            this.nRec = response['number'];
            this.textMessage = response['message'];
            this.trovatoRec = false;
            this.alertSuccess = false;
            this.Message = 'Situazione Attuale - Nessuna giornata presente per il tipo di richiesta';
          }


       //   alert('loadGiornateFromManif - dovrei aver letto le giornate' + this.nRec + ' Messaggio: ' + this.textMessage);
       //   console.log('loadGiornateFromManif - dovrei aver letto le giornate' + this.nRec + ' Messaggio: ' + this.textMessage);
      },
      error => {
         alert('Manifestazione-day  -- onSelectionChange: ' + error.message);
         console.log(error);
         this.alertSuccess = false;
         this.Message = error.message;
      });




  }


}
