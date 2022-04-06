import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommandaService} from '../../../services/commanda.service';

import { Commanda} from '../../../classes/Commanda';

import { faUserEdit, faTrash, faInfo, faInfoCircle, faEuroSign, faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';


@Component({

  selector: 'tr[app-commanda1]',
  templateUrl: './commanda1.component.html',
  styleUrls: ['./commanda1.component.css']
})

export class Commanda1Component implements OnInit {

  // variabili passate dal componente padre
  @Input('commanda1-data') commanda: Commanda;
  @Input('commanda1-prog') i: number;

// passo dati a persona-detail
 //     @Output('onSelectUser') onSelectUser = new EventEmitter();

  @Output('onSelectCassa') onSelectCassa = new EventEmitter();
  @Output('onSelectProdotti') onSelectProdotti = new EventEmitter();

 faUserEdit = faUserEdit;
 faTrash = faTrash;
 faInfo = faInfo;
 faInfoCircle = faInfoCircle;
 faEuroSign  = faEuroSign;
 faAlignLeft = faAlignLeft;

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
 public select = 0;  // serve per impostare il colore per la riga selezionata

 constructor(public modal: NgbModal,
             private commandaService: CommandaService,
             private route: Router,
             private notifier: NotifierService) {
             this.notifier = notifier;
           }

 ngOnInit(): void {

  this.select = 0;

 }



//  come passare da figlio a padre
 showDetailProdotti() {
  // alert('creato evento per visualizzare i prodotti della commanda: ' + this.commanda.id);
   this.select = 1;
   this.getColor(this.select);
   this.onSelectProdotti.emit(this.commanda);
 }

//  come passare da figlio a padre
showDetailCassa() {
 // alert('creato evento per visualizzare il pagamento  della commanda: ' + this.commanda.id);
  this.onSelectCassa.emit(this.commanda);
}



getColor(select: number) {
  switch (select) {
    case 0:   // primi
      return 'white';
    case 1:  // secondi
      return 'red';

  }
}

/*   da cancellare

showCommandaDetail() {

   this.routeCommanda = '/giornata/Commanda/Edits/' + this.commanda.id;

   this.route.navigate([`${this.routeCommanda}`]);

}

*/


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
