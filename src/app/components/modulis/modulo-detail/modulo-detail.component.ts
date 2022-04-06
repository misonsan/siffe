

import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
// component
import { Modulo } from '../../../classes/Modulo';
import { Abilfunctione} from '../../../classes/Abilfunctione';
import { Userlevel} from '../../../classes/UserLevel';

// service
import { ModuloService } from './../../../services/modulo.service';
import { AbilfunctioneService } from '../../../services/abilfunctione.service';
import { UserlevelService } from '../../../services/userlevel.service';

// service da fare

import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import { faPlusSquare, faSearch, faSave, faUserEdit, faMinus, faPlus, faWindowClose, faTrash, faTimes, faReply } from '@fortawesome/free-solid-svg-icons';

import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
// seconda soluzione con popup component
// import { UploadpopComponent } from './../../../components/popups/uploadpop/uploadpop.component';
import { environment } from '../../../../environments/environment';

// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';
import { NgForm } from '@angular/forms';





@Component({
  selector: 'app-modulo-detail',
  templateUrl: './modulo-detail.component.html',
  styleUrls: ['./modulo-detail.component.css']
})
export class ModuloDetailComponent implements OnInit {


  public modul: Modulo;
  public modul1: Modulo;
  public abilf: Abilfunctione;
  public userlevels: Userlevel[] = [];
  public userlevel: Userlevel;

  public title = "Gestione Moduli clonatooooooooo";

 // icone
  faPlusSquare = faPlusSquare;
  faSearch = faSearch;
  faSave = faSave;
  faUserEdit = faUserEdit;
  faMinus = faMinus;
  faPlus = faPlus;
  faWindowClose = faWindowClose;
  faTrash = faTrash;
  faTimes = faTimes;
  faReply = faReply;

  // variabili per editazione messaggio
  public alertSuccess = false;
  public savechange = false;
  public isVisible = false;

  public nRecMan = 0;
  public nRec = 0;
  public trovatoRec = false;


  public type = '';
  public Message = '';

  public fase = '';


  public statoModulo  = '?';
  public ricercaIniziale = '';
  public href = '';
  public idpassed = 0;

  public functionInqu =  false;
  public functionEdit = false;
  public functionEdits = false;
  public functionNew = false;



  closeResult = '';

  public level = 0;
  public nRecord = 0;
  public enabledFunc = false;
  public functionUser = '';
  public rotta = '';
  public rottaId = 0;
  public rottaFunz = '';

 // funzioni di navigazione
  public navigateNew = 'new';
  public navigateInqu = 'inqu';
  public navigateEdit = 'edit';
  public navigateEdits = 'edits';

  public lastId = 0;

  constructor(  private modalService: NgbModal,
                private moduloService: ModuloService,
                private abilfunctioneService: AbilfunctioneService,
                private userlevelService: UserlevelService,
                private router: Router,
                private route: ActivatedRoute,
                private notifier: NotifierService) {
                   this.notifier = notifier;
                 }


  ngOnInit(): void {

    this.modul = new Modulo();
    this.modul1 = new Modulo();

    this.isVisible = false;
    this.alertSuccess = false;

    this.functionInqu =  false;
    this.functionEdit = false;
    this.functionEdits = false;
    this.functionNew = false;
    this.statoModulo = '?';

    this.href = this.router.url;

    console.log('user-edit - url: ' + this.href);

    console.log('route - 1 ' + this.route.snapshot.url[0].path);
    console.log('route - 2 ' + this.route.snapshot.url[1].path);

    if(this.route.snapshot.url[1].path !== 'new') {

      console.log('route - 3 ' + this.route.snapshot.url[2].path);
    }


    this.checkFunctionbylevel();
/*

    if (this.router.url.indexOf('edits') > -1) {
    this.functionSelected = this.searchEdits;
    this.functionEdits = true;
    } else {
      if (this.router.url.indexOf('edit') > -1) {
       this.functionSelected = this.searchEdit;
       this.functionEdit = true;
      } else {
      if (this.router.url.indexOf('INTU') > -1) {
         this.functionSelected = this.searchInqu;
         this.functionInqu =  true;
      } else {
        if (this.router.url.indexOf('new') > -1) {
           this.functionSelected = this.searchNew;
           this.functionNew = true;
          }
         }
      }
    }

   */



}

checkFunctionbylevel() {
  this.enabledFunc = false;
  this.functionUser = this.route.snapshot.url[1].path;
  this.rotta = this.route.snapshot.url[0].path;

  this.level = parseInt(localStorage.getItem('user_ruolo'));

  if(this.level === -1){
    console.log('checkFunctiobylevel - vado a gestisciControllo per administrator');
    this.gestisciDati();
   } else {
     this.effettuaControllo();
   }

}





gestisciDati()  {


  this.loadLevel();

  this.Message = 'Situazione Attuale Modulo';
  this.isVisible = true;
  this.alertSuccess = true;

  if(this.functionUser === 'new') {
    this.functionNew = true;
    this.functionUser = this.navigateNew;
    this.modul = new Modulo();
    this.modul.key_utenti_operation = +localStorage.getItem('id');
    this.title = 'Inserimento Modulo';    // funziona non gestita in questa fase - gli inserimenti si fanno con registra
    this.fase = 'N';
    this.Message = `Inserire i dati del Modulo`;
  } else {
 //   this.functionUser = this.route.snapshot.url[2].path;
    if(this.functionUser === 'edit'   &&  this.level === -1) {
      this.functionUser = this.navigateEdits;
      this.functionEdit = false;
      this.functionEdits = true;
    } else {
      this.functionEdit = true;
    }
    if(this.functionUser === 'inqu') {
       this.functionInqu =  true;
    }

    this.route.paramMap.subscribe(p => {
    this.idpassed = +p.get('id');
                                               console.log('id recuperato: ' + this.idpassed);
      // -------  leggo i dati della giornata
    this.loadModulo(this.idpassed);
    if(this.functionEdit || this.functionEdits) {
        this.title = 'Aggiornamento Modulo';
        this.fase = 'M';
       } else {
        this.title = 'Visualizzazione Modulo';
        this.fase = 'I';
       }
    });
  }



}


async loadLevel() {
    // alert('loadManifestazione - id:' + id + ' --  da giornata' + this.giornata.idManifestazione);
    let rc = await  this.userlevelService.getAlls().subscribe(
      response => {
      this.userlevels = response['data'];
      },
      error => {
        this.isVisible  = true;
        this.Message = error.message;
        this.alertSuccess = false;
      alert('Modulo-Detail  --loadLevel: ' + error.message);
      console.log(error);
      }
    )
}





effettuaControllo() {

}






loadModulo(id: number) {
  this.moduloService.getbyId(id).subscribe(
    resp => {
          console.log(`loadModulo: ${JSON.stringify(resp['data'])}`);
          this.modul = resp['data'];
          this.modul.key_utenti_operation = +localStorage.getItem('id');
       },
    error => {
         alert('sono in loadModulo');
         this.isVisible = true;
         this.alertSuccess = false;
         console.log(error);
         this.type = 'error';
         this.Message = 'Errore loadModulo' + '\n' + error.message;
         this.showNotification(this.type, this.Message);

       });

}




/*
* Show a notification
*
* @param {string} type    Notification type
* @param {string} message Notification message
*/

showNotification( type: string, message: string ): void {
  //   alert('sono in showNot - ' + message);
     this.notifier.notify( type, message );
   }

/*
  async conferma() {
      this.conferma1();
      if(this.fase === 'N') {
        // rileggo l'ultimo record inserito
        console.log(' dovrei aver fatto fonferma1 e ora vado a fare loadLastModule');
        this.loadLastModule();
  //      this.creaabil2level(this.modul.id);
      }
  }


  */


async createnewModul() {
  let rc = await  this.moduloService.createNew(this.modul).subscribe(
    res => {
            console.log('fatto creazione modulo - Conferma1');
            this.creaabil2level(this.lastId);
            this.isVisible = true;
            this.alertSuccess = true;
            this.type = 'success';
            this.Message = 'Modulo creato correttamente';
            this.showNotification(this.type, this.Message);
       },
      error => {
         console.log(error);
         this.type = 'error';
         this.Message = error.message;
         this.alertSuccess = false;
      });
}



async conferma() {
    console.log('conferma - fase: ' + this.fase);
    switch (this.fase)  {
        case 'N':
           this.loadLastModule();
           break;
      case 'M':
          let rc1 = await this.moduloService.update(this.modul, this.modul.id).subscribe(
          res => {
                this.modul = res['data'];
                this.type = 'success';
                this.Message = res['message'];          //'utente aggiornato con successo del cazzo';
                this.alertSuccess = true;
                this.router.navigate(['/modulis']);
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
        this.modul = new Modulo();
        this.type = 'success';
        this.Message = 'Inserire i dati Utente';
        this.alertSuccess = true;
        break;
      case 'M':
        this.moduloService.getbyId(this.modul.id).subscribe(
        res => {
              this.modul = res['data'];
              this.type = 'success';
              this.Message = 'situazione attuale utente';
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

async loadLastModule() {

      let rc = await  this.moduloService.getlastId().subscribe(
      res => {
        this.modul1 = res['data'];
        console.log(`loadLastModule: ${JSON.stringify(res['data'])}`);
        this.lastId = this.modul1.id + 1;
        this.createnewModul();
         },
      error => {
       console.log(error);
       this.type = 'error';
       this.Message = error.message;
       this.alertSuccess = false;
    });

    }



goback() {
    this.router.navigate(['modulis']);
    }


onSelectionChange(tiric: string)   {
      this.statoModulo = tiric.substring(0,1);
   //   alert('ho premuto ' + this.statoModulo);
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
                this.cancella(this.modul);
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


cancella(modulo: Modulo) {

        this.moduloService.delete(modulo.id).subscribe(
            response => {
              if(response['ok']) {
                this.isVisible = true;
                this.alertSuccess = true;
                this.type = 'success';
                this.Message = 'Modulo cancellato correttamente';
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


async creaabil2level(id: number) {

          //  alert('commandaW - creaarigheCommanda');

            console.log('creaabli2level - id passato: ' + id);


            for(const userlvl of this.userlevels) {
              this.abilf = new Abilfunctione();
              this.abilf.key_utenti_operation = +localStorage.getItem('id');
              this.abilf.idmodulo = id;       //this.modul.id;
              this.abilf.idlevel = userlvl.id;
              this.abilf.enabledNull = 'Y';
              this.abilf.enabledInqu = 'N';
              this.abilf.enabledEdit = 'N';
              this.abilf.idlevel = userlvl.id;
              if(userlvl.id === -1) {
                this.abilf.enabledNull = 'N';
                this.abilf.enabledInqu = 'N';
                this.abilf.enabledEdit = 'Y';
              }
              if(userlvl.id !== -1 && userlvl.id !== 0)  {
                this.abilf.enabledNull = 'N';
                this.abilf.enabledInqu = 'N';
                this.abilf.enabledEdit = 'N';
              }
              let rc =  await this.abilfunctioneService.createNew(this.abilf).subscribe(
                      response => {
                          if(response['rc'] === 'ok') {
                  //                  alert('----------------------    inserito commandariga' + prg);
                            // non faccio nulla. il messaggio finale lo metto in conferma
                          }
                          /*
                          else {
                            alert(response['message']);
                            this.Message = response['message'];
                            this.alertSuccess = false;
                          }  */
                      },
                      error =>
                      {
                        console.log(error);
                        this.Message = error.message;
                        this.alertSuccess = false;
                      }
                  );
              }
          }





}



/*





  // per upload image


  ngOnInit(): void {


    this.isVisible = false;
    this.alertSuccess = false;

    this.functionInqu =  false;
    this.functionEdit = false;
    this.functionEdits = false;
    this.functionNew = false;


    this.href = this.router.url;
   // console.log('ngOnInit - href: ' + this.router.url);




console.log('user-edit - url: ' + this.href);

console.log('route - 1 ' + this.route.snapshot.url[0].path);

console.log('route - 2 ' + this.route.snapshot.url[1].path);

console.log('route - 3 ' + this.route.snapshot.url[2].path);

if (this.router.url.indexOf('edits') > -1) {
    this.functionSelected = this.searchEdits;
    this.functionEdits = true;
} else {
if (this.router.url.indexOf('edit') > -1) {
 this.functionSelected = this.searchEdit;
 this.functionEdit = true;
} else {
if (this.router.url.indexOf('inqu') > -1) {
   this.functionSelected = this.searchInqu;
   this.functionInqu =  true;
} else {
  if (this.router.url.indexOf('new') > -1) {
     this.functionSelected = this.searchNew;
     this.functionNew = true;
    }
 }
}
}

this.fileInfos = this.uploadService.getFiles();     // per upload

console.log('----- functionSelected: ' + this.functionSelected);

this.displayedImage = this.pathImage + '0.jpg';
this.Message = 'Situazione Attuale utente';
this.isVisible = true;
this.alertSuccess = true;

if(this.functionNew) {
  this.modul = new User();
  this.modul.key_utenti_operation = +localStorage.getItem('id');
  this.title = 'Inserimento User';    // funziona non gestita in questa fase - gli inserimenti si fanno con registra
  this.fase = 'N';
  this.Message = `Inserire i dati dell' utente`;
} else {
    this.route.paramMap.subscribe(p => {
      this.idUser = +p.get('id');
      console.log('id recuperato: ' + this.idUser);
      // -------  leggo i dati della giornata
      this.loadUser(this.idUser);
      if(this.functionEdit || this.functionEdits) {
        this.title = 'Aggiornamento User';
        this.fase = 'M';
       } else {
        this.title = 'Visualizzazione User';
        this.fase = 'I';
       }
    });
}


this.type = 'success';
this.showNotification(this.type, this.Message);
}


loadUser(id: number) {
this.moduloService.getuser(id).subscribe(
  resp => {
        console.log(`loadUser: ${resp['data']}`);
        this.modul = resp['data'];
        this.modul.key_utenti_operation = +localStorage.getItem('id');
        this.selectedRuo = this.modul.idRuolo;
        this.selectedweb = this.modul.idruoloweb;
        this.selectedSta = this.modul.idStato;
        console.log('fatto lettura user: ' + this.modul.cognome);
     },
  error => {
       alert('sono in loadUser');
       this.isVisible = true;
       this.alertSuccess = false;
       console.log(error);
       this.type = 'error';
       this.Message = 'Errore loadUser' + '\n' + error.message;
       this.showNotification(this.type, this.Message);

     });
}





/**
/* Show a notification
*
* @param {string} type    Notification type
* @param {string} message Notification message
//

showNotification( type: string, message: string ): void {
//   alert('sono in showNot - ' + message);
 this.notifier.notify( type, message );
}








*/


