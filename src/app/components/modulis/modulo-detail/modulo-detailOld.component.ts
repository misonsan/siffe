// sono a step_01 - visualizzo model con json su html  (devo fare controllo accesso e lettura dati)

import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
// component
import { Modulo } from '../../../classes/Modulo';
import { Abilfunctione} from '../../../classes/Abilfunctione';

// service
import { ModuloService } from './../../../services/modulo.service';
import { AbilfunctioneService } from '../../../services/abilfunctione.service';

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


  public fase = '';




  public href = '';
  public idpassed = 0;

  public functionInqu =  false;
  public functionEdit = false;
  public functionEdits = false;
  public functionNew = false;

  public searchInqu = 'inqu';
  public searchEdit = 'edit';
  public searchEdits = 'edits';
  public searchNew = 'new';

  public Message = '';

  closeResult = '';



  constructor(  private modalService: NgbModal,
                private moduloService: ModuloService,
                private abilfunctioneService: AbilfunctioneService,
                private router: Router,
                private route: ActivatedRoute,
                private notifier: NotifierService) {
                   this.notifier = notifier;
                 }


  ngOnInit(): void {

    this.modul = new Modulo();

    this.isVisible = false;
    this.alertSuccess = false;

    this.functionInqu =  false;
    this.functionEdit = false;
    this.functionEdits = false;
    this.functionNew = false;


    this.href = this.router.url;

    console.log('user-edit - url: ' + this.href);

    console.log('route - 1 ' + this.route.snapshot.url[0].path);

    console.log('route - 2 ' + this.route.snapshot.url[1].path);

    console.log('route - 3 ' + this.route.snapshot.url[2].path);


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

    this.Message = 'Situazione Attuale utente';
    this.isVisible = true;
    this.alertSuccess = true;

    if(this.functionNew) {
  this.modul = new Modulo();
  this.modul.key_utenti_operation = +localStorage.getItem('id');
  this.title = 'Inserimento Modulo';    // funziona non gestita in questa fase - gli inserimenti si fanno con registra
  this.fase = 'N';
  this.Message = `Inserire i dati del Modulo`;
} else {
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

loadModulo(id: number) {

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
  this.user = new User();
  this.user.key_utenti_operation = +localStorage.getItem('id');
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
this.userService.getuser(id).subscribe(
  resp => {
        console.log(`loadUser: ${resp['data']}`);
        this.user = resp['data'];
        this.user.key_utenti_operation = +localStorage.getItem('id');
        this.selectedRuo = this.user.idRuolo;
        this.selectedweb = this.user.idruoloweb;
        this.selectedSta = this.user.idStato;
        console.log('fatto lettura user: ' + this.user.cognome);
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




async conferma() {
console.log('conferma - fase: ' + this.fase);
console.log('conferma - photo: ----------------------------------------------------------  ' + this.user.photo);
switch (this.fase)  {
    case 'N':
      let rc = await  this.userService.createUser(this.user).subscribe(
      res => {
            this.user = res['data'];
            this.type = 'success';
            this.Message =  res['message'];                               //'utente  creato con successo';
            this.alertSuccess = true;
         },
        error => {
           console.log(error);
           this.type = 'error';
           this.Message = error.message;
           this.alertSuccess = false;
        });
      break;
  case 'M':
      let rc1 = this.userService.updateUser(this.user, this.user.id).subscribe(
      res => {
            this.user = res['data'];
            this.type = 'success';
            this.Message = res['message'];          //'utente aggiornato con successo del cazzo';
            this.alertSuccess = true;
            this.router.navigate(['/users']);
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
    this.user = new User();
    this.type = 'success';
    this.Message = 'Inserire i dati Utente';
    this.alertSuccess = true;
    break;
  case 'M':
    this.userService.getuser(this.user.id).subscribe(
    res => {
          this.user = res['data'];
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

goback() {
this.router.navigate(['users']);
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



open(content) {
this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  this.closeResult = `Closed with: ${result}`;
  // alert('controllo la modalità di chiusura della popup - chiusura su tasto save: ' + result);
  if(result ===  'Cancel click') {
     this.cancellazioneAbort();
  }
  if(result ===  'Delete click') {
    // gestire uscita da popup
    this.cancellaUser(this.user);
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


cancellaUser(user: User) {

this.userService.deleteuser(user.id).subscribe(
    response => {
      if(response['ok']) {
        this.isVisible = true;
        this.alertSuccess = true;
        this.type = 'success';
        this.Message = 'User cancellato correttamente';
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




*/


