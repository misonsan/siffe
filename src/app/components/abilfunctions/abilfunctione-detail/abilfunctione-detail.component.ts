import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
// component

import { Abilfunctione} from '../../../classes/Abilfunctione';
import { Userlevel} from '../../../classes/UserLevel';

// service

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
  selector: 'app-abilfunctione-detail',
  templateUrl: './abilfunctione-detail.component.html',
  styleUrls: ['./abilfunctione-detail.component.css']
})
export class AbilfunctioneDetailComponent implements OnInit {

  public abilf: Abilfunctione;
  public userlevels: Userlevel[] = [];
  public userlevel: Userlevel;

  public title = "Gestione abilitazione su Modulo per livello";

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
  public selezioneNull = '';
  public selezioneInqu = '';
  public selezioneEdit = '';

  public statoModulo  = '?';
  public ricercaIniziale = '';
  public href = '';
  public idpassed = 0;

  public functionInqu =  false;
  public functionEdit = false;
  public functionEdits = false;
  public functionNew = false;

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

  public valueHidden = 'xx';
  public valueInqu = 'xx';
  public valueEdit = 'xx';




  constructor(private modalService: NgbModal,
              private abilfunctioneService: AbilfunctioneService,
              private userlevelService: UserlevelService,
              private router: Router,
              private route: ActivatedRoute,
              private notifier: NotifierService) {
                 this.notifier = notifier;
     }

  ngOnInit(): void {


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

    this.Message = 'Situazione Attuale Abilitazione';
    this.isVisible = true;
    this.alertSuccess = true;

    if(this.functionUser === 'new') {
      //  non esiste
      this.type = 'error';
      this.Message = 'Funzione non ammessa - record creati in fase di creazione Modulo .... !!!!! ';
      this.alertSuccess = true;
      }
   //   this.functionUser = this.route.snapshot.url[2].path;
    if(this.functionUser === 'inqu') {
          this.functionInqu =  true;
      }
    if(this.functionUser === 'edits') {
       this.functionEdits = true;
    }
    if(this.functionUser === 'edit'   &&  this.level === -1) {
        this.functionUser = this.navigateEdits;
        this.functionEdit = false;
        this.functionEdits = true;
      } else {
        this.functionEdit = true;
      }

    this.route.paramMap.subscribe(p => {
      this.idpassed = +p.get('id');
                                                 console.log('id recuperato: ' + this.idpassed);
        // -------  leggo i dati della giornata
      this.loadAbilfunction(this.idpassed);
      if(this.functionEdit || this.functionEdits) {
          this.title = 'Aggiornamento Abilitazione';
          this.fase = 'M';
         } else {
          this.title = 'Visualizzazione Abilitazione';
          this.fase = 'I';
         }

      });
    }



  effettuaControllo() {

  }

  loadAbilfunction(id: number) {
   // id = 23;     //  test
    this.isVisible = true;
    this.abilfunctioneService.getAbilbyId(id).subscribe(
      resp => {
            console.log(`loadAbilfunction: ${JSON.stringify(resp['data'])}`);
            this.abilf = resp['data'];
            this.abilf.key_utenti_operation = +localStorage.getItem('id');

            this.valueHidden = this.abilf.enabledNull;
            this.valueInqu = this.abilf.enabledInqu;
            this.valueEdit = this.abilf.enabledEdit;
            this.loadLevel(this.abilf.idlevel);
            this.type = 'success';
            this.Message = resp['message'];          //'utente aggiornato con successo del cazzo';
            this.alertSuccess = true;
         },
      error => {
           this.alertSuccess = false;
           console.log(error);
           this.type = 'error';
           this.Message = 'Errore loadAbilfunction' + '\n' + error.message;
           this.showNotification(this.type, this.Message);
         });
  }
  //  leggere il profilo con dati passati per editarlo in maschera  --  da sistemare
  async loadLevel(id: number) {
    // alert('loadManifestazione - id:' + id + ' --  da giornata' + this.giornata.idManifestazione);
    let rc = await  this.userlevelService.getbyId(id).subscribe(
      response => {
        this.userlevel = response['data'];
        },
      error => {
        this.isVisible  = true;
        this.Message = error.message;
        this.alertSuccess = false;
        alert('abilfunctione-Detail  --loadLevel: ' + error.message);
        console.log('abilfunctione-Detail  --loadLevel: ' + error);
      }
    )
}


async conferma() {
  console.log('conferma - fase: ' + this.fase);
  switch (this.fase)  {
      case 'N':
         this.type = 'error';
         this.Message = 'Funzione non ammessa - record creati in fase di creazione Modulo ....';
         this.alertSuccess = true;
         break;
    case 'M':

        console.log('valueH ' + this.valueHidden);
        console.log('valueI ' + this.valueInqu);
        console.log('valueE ' + this.valueEdit);

        this.abilf.enabledNull = this.valueHidden;
        this.abilf.enabledInqu = this.valueInqu;
        this.abilf.enabledEdit = this.valueEdit

        let rc1 = await this.abilfunctioneService.update(this.abilf, this.abilf.id).subscribe(
        res => {
              this.abilf = res['data'];
              this.type = 'success';
              this.Message = res['message'];          //'utente aggiornato con successo del cazzo';
              this.alertSuccess = true;
              this.router.navigate(['/abilfunctione']);
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
  this.isVisible  = true;
  switch (this.fase)  {
      case 'N':
      // non esiste la funzione new perchè i record sono creati in automatico con la creazione del Modulo
      this.type = 'error';
      this.Message = 'Funzione non ammessa - record creati in fase di creazione Modulo';
      this.alertSuccess = true;
      break;
    case 'M':
      this.loadAbilfunction(this.idpassed);
      this.type = 'success';
      this.Message = 'dati ripristinati';          //'utente aggiornato con successo del cazzo';
      this.alertSuccess = true;
      break;
    default:
      alert('nav - funzione non ancora attivata');
      break;
  }
  this.showNotification(this.type, this.Message);
  }



  goback() {
    this.router.navigate(['abilfunctione']);
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


     cambiaHidden(e) {
     // this.effettuataModifica = true;
      console.log(e.target.value);

     // this.optionSelect = e.target.value;



     // alert('selezionato: ' + e.target.value);
      this.valueHidden = e.target.value;
      if(e.target.value === 'Y') {
        this.selezioneNull = 'Attivato';
      }
      if(e.target.value === 'N') {
        this.selezioneNull = 'Disattivato';
      }

/*
      this.type = 'success';
      this.Message = 'il valore del botton è: ' +  e.target.value;
      this.showNotification(this.type, this.Message);
      */
    }

    cambiaInqu(e) {
      // this.effettuataModifica = true;
       console.log(e.target.value);

      // this.optionSelect = e.target.value;



      // alert('selezionato: ' + e.target.value);
     //  this.abil.enabledNull = e.target.value;


       this.valueInqu = e.target.value;

       if(e.target.value === 'Y') {
        this.selezioneInqu = 'Attivato';
      }
       if(e.target.value === 'N') {
        this.selezioneInqu = 'Disattivato';
      }



/*
       this.type = 'success';
       this.Message = 'CambiaInqu - il valore del botton è: ' +  e.target.value;
       this.showNotification(this.type, this.Message);
       */
     }

     cambiaEdit(e) {
      // this.effettuataModifica = true;
       console.log('CAMBIAeDIT: ' + e.target.value);

      // this.optionSelect = e.target.value;


       this.valueEdit = e.target.value;
       if(e.target.value === 'Y') {
        this.selezioneEdit = 'Attivato';
      }
       if(e.target.value === 'N') {
        this.selezioneEdit = 'Disattivato';
      }
/*
       this.type = 'success';
       this.Message = 'CambiaEdit - il valore del botton è: ' +  e.target.value;
       this.showNotification(this.type, this.Message);  */
     }

}

