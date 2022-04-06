import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PersonaService} from '../../../services/persona.service';
import { Persona} from '../../../classes/Persona';
import { faUserEdit, faTrash, faInfo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'tr[app-persona2]',
  templateUrl: './persona2.component.html',
  styleUrls: ['./persona2.component.css']
})
export class Persona2Component implements OnInit {

 // variabili passate dal componente padre
 @Input('persona2-data') persona: Persona;
 @Input('persona2-prog') i: number;

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

 closeResult = '';

 constructor(public modalService: NgbModal,
             private personaService: PersonaService,
             private route: Router,
             private notifier: NotifierService) {
             this.notifier = notifier;
           }

 ngOnInit(): void {

 console.log('persona - oninit - ' + JSON.stringify(this.persona));

 }


/*   come passare da figlio a padre
 showPersonaDetailNew() {
   //alert('creato evento per passare utente: ' + this.persona.cognome);
   this.onSelectUser.emit(this.persona);
   //alert(' ---- 2   creato evento per passare utente: ' + this.persona.cognome);
 }

*/


selectedPersona() {

  this.onSelectPersona.emit(this.persona);
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


// -------------------------------------------  per la cancellazione

open(content:any, persona: Persona) {
  console.log(`open_content - user ${persona.cognome}&nbsp; ${persona.nome}`);
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  this.closeResult = `Closed with: ${result}`;
  // alert('controllo la modalità di chiusura della popup - chiusura su tasto save: ' + result);
  if(result === 'Cancel click') {
  this.cancellazioneAbort();
  }
  if(result === 'Delete click') {
    console.log('fare routine di cancellazione: ' + persona.id + ' - ' + persona.cognome );
   //this.cancellaProdotto(this.prodotto);
   this.delete(persona.id);
   this.cancellazioneCompleted(persona);
   // per riaggiornare elenco
   window.location.reload();

  }
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // alert('controllo la modalità di chiusura della popup ------------------ chiusura su tasto close: ' + reason);
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

  cancellazioneCompleted(persona: Persona) {
    this.type = 'success';
    this.Message = `cancellazione della persona ${persona.cognome}&nbsp;${persona.nome}  eseguita con successo `;
    this.showNotification(this.type, this.Message);
  }

  delete(id:any) {
    console.log(id,'cancelllllllllllllllllllllllo --->');
    this.personaService.deletePersona(id).subscribe((res)=> {
      console.log(res,'res- delete -->');

      this.type = 'error';
      this.Message = res['message'];
      this.showNotification(this.type, this.Message);
    });
  }





}


