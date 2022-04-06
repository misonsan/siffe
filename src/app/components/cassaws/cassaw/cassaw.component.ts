import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { TTaglia } from '../../../classes/T_taglia';
// service
import { TtagliaService} from '../../../services/ttaglia.service';



import { CassawService} from '../../../services/cassaw.service';

import { Cassaw} from '../../../classes/Cassaw';

import { faUserEdit, faTrash, faInfo, faInfoCircle, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'tr[app-cassaw]',
  templateUrl: './cassaw.component.html',
  styleUrls: ['./cassaw.component.css']
})

export class CassawComponent implements OnInit {

  public taglia: TTaglia;
  public taglianull = new TTaglia();

  public idTaglia = 0;

   // variabili passate dal componente padre
   @Input('cassaw-data') cassaw: Cassaw;
   @Input('cassaw-prog') i: number;

 // passo dati a persona-detail   --  da fare
   @Output('onCassaAggiornata') onCassaAggiornata = new EventEmitter();


  faUserEdit = faUserEdit;
  faTrash = faTrash;
  faInfo = faInfo;
  faInfoCircle = faInfoCircle;
  faMinus = faMinus;
  faPlus = faPlus;

// -----
  public textMessage1 = '';
  public textMessage2 = '';
  public textUser = '';
  public headerPopup = '';
  public perDebug = 'utente passato: ';
  public Message = '';
  public presenti = false;
  public isVisible = false;
  public alertSuccess = false;
  public funcSearch = 0;
  public nRec = 0;

  public type = '';
  public utenteFedele = false;
  public functionEnabled = false;
  public idDay = 0;


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
  public routeCommanda = '';

  constructor(public modal: NgbModal,
              private cassawService: CassawService,
              private ttagliaService: TtagliaService,
              private route: Router,
              private notifier: NotifierService) {
              this.notifier = notifier;
            }

  ngOnInit(): void {

    this.idTaglia = this.cassaw.idTaglia;
    this.loadTaglia(this.idTaglia);

  }

  async  loadTaglia(id: number) {
    console.log(`loadTaglia - appena entrato`);
    let rc = await this.ttagliaService.getbyId(id).subscribe(
     resp => {
           console.log(`loadTaglia:  ${JSON.stringify(resp['data'])} `);
           if(resp['rc'] === 'ok') {
             this.taglia = resp['data'];
           }
           if(resp['rc'] === 'nf') {
             this.taglia = this.taglianull;
           }
        },
     error => {
          alert('sono in loadTaglia - errore');
          console.log('loadTaglia - errore: ' + error);
          this.type = 'error';
          this.Message = error.message;
          this.showNotification(this.type, this.Message);
        });
   }

/*   come passare da figlio a padre
  showPersonaDetailNew() {
    //alert('creato evento per passare utente: ' + this.persona.cognome);
    this.onSelectUser.emit(this.persona);
    //alert(' ---- 2   creato evento per passare utente: ' + this.persona.cognome);
  }

*/


showCommandaDetail() {
  alert('da fare');
   /*
  this.routeCommanda = '/giornata/Commanda/Edits/' + this.commanda.id;

    this.route.navigate([`${this.routeCommanda}`]);
*/
 }



/**
* Show a notification
*
* @param {string} type    Notification type
* @param {string} message Notification message
*/

showNotification( type: string, message: string ): void {
  this.notifier.notify( type, message );
}


togliImporto(id: number) {
  alert('da fare -  passara s cassawService dove passo il numero e mi aggiorna e ricarica cassa');
}

aggiungiImporto(id: number) {
  alert('da fare -  passara s cassawService dove passo il numero e mi aggiorna e ricarica cassa');
}


getColor(valoreInc) {

  if(valoreInc > 0) {
    return 'yellow';
  }

}

getbackgroundColor(valoreInc) {
    if(valoreInc > 0) {
      return 'black';
    }
  }
}
