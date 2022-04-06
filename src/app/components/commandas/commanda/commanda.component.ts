import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommandaService} from '../../../services/commanda.service';

import { Commanda} from '../../../classes/Commanda';

import { faUserEdit, faTrash, faInfo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'tr[app-commanda]',
  templateUrl: './commanda.component.html',
  styleUrls: ['./commanda.component.css']
})
export class CommandaComponent implements OnInit {

   // variabili passate dal componente padre
   @Input('commanda-data') commanda: Commanda;
   @Input('commanda-prog') i: number;

 // passo dati a persona-detail
   @Output('onSelectUser') onSelectUser = new EventEmitter();


  faUserEdit = faUserEdit;
  faTrash = faTrash;
  faInfo = faInfo;
  faInfoCircle = faInfoCircle;

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
              private commandaService: CommandaService,
              private route: Router,
              private notifier: NotifierService) {
              this.notifier = notifier;
            }

  ngOnInit(): void {


  }



/*   come passare da figlio a padre
  showPersonaDetailNew() {
    //alert('creato evento per passare utente: ' + this.persona.cognome);
    this.onSelectUser.emit(this.persona);
    //alert(' ---- 2   creato evento per passare utente: ' + this.persona.cognome);
  }

*/


showCommandaDetail() {

    this.routeCommanda = '/giornata/Commanda/Edits/' + this.commanda.id;

    this.route.navigate([`${this.routeCommanda}`]);

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



}
