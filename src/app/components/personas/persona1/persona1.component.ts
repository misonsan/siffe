import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PersonaService} from '../../../services/persona.service';
import { Persona} from '../../../classes/Persona';
import { faUserEdit, faTrash, faInfo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'tr[app-persona1]',
  templateUrl: './persona1.component.html',
  styleUrls: ['./persona1.component.css']
})
export class Persona1Component implements OnInit {

 // variabili passate dal componente padre
 @Input('persona1-data') persona1: Persona;
 @Input('persona1-prog') i: number;

// passo dati a persona-detail
 @Output('onSelectPersona') onSelectPersona = new EventEmitter();




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
 public routePersona = '';

 constructor(public modal: NgbModal,
             private personaService: PersonaService,
             private route: Router,
             private notifier: NotifierService) {
             this.notifier = notifier;
           }

 ngOnInit(): void {

 console.log('persona1 - oninit - ' + JSON.stringify(this.persona1));





 }

 /*     buttare
 controllaGiornata() {
   this.idDay =  parseInt(localStorage.getItem('idGiornata'));
   this.giornataService.getGiornata(this.idDay).subscribe(
     resp => {
          this.giornata = resp['data'];
          if(this.giornata.statoMagazzino === 1) {
               this.functionEnabled = false;
             } else {
              this.functionEnabled = true;
             }
     },
     error => {
       alert(' controllaGiornata');
       console.log(error);
       this.type = 'error';
       this.Message = 'Errore controllagiornata ' + '\n' + error.message;
       this.showNotification(this.type, this.Message);
       this.alertSuccess = false;
     });
 }

*/








/*   come passare da figlio a padre
 showPersonaDetailNew() {
   //alert('creato evento per passare utente: ' + this.persona.cognome);
   this.onSelectUser.emit(this.persona);
   //alert(' ---- 2   creato evento per passare utente: ' + this.persona.cognome);
 }

*/


selectedPersona() {

  this.onSelectPersona.emit(this.persona1);
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


getColor(ruolo) {
 switch (ruolo) {
   case -1:
     return 'red';
   case 1:
     return 'blue';
   case 2:
     return 'orange';
   case 3:
     return 'green';
   case 4:
     return 'violet';
   case 5:
     return 'lime';
 }
}

getBbackgroundColor(ruolo) {

 switch (ruolo) {
   case 0:
     return 'red';
 }
}


}
