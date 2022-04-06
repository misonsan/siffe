
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// service
import { TcategoriaProdottoService} from './../../../services/tcategoria-prodotto.service';
import { CommandawrigaService} from './../../../services/commandawriga.service';
import { ProdottoService } from './../../../services/prodotto.service';
// classes
import { TcategoriaProdotto } from '../../../classes/T_categoria_prodotto';
import { Commandawriga } from '../../../classes/Commandawriga';
import { Prodotto } from '../../../classes/Prodotto';
// other
import { faUserEdit, faTrash, faInfo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
// il dettaglio lo faccio con pagina normale
//  import { ProdottodaypopComponent } from './../../components/popups/prodottodaypop/prodottodaypop.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'tr[app-commandawriga]',
  templateUrl: './commandawriga.component.html',
  styleUrls: ['./commandawriga.component.css']
})
export class CommandawrigaComponent implements OnInit {

   // variabili passate dal componente padre
   @Input('commandawriga-data') commandawriga: Commandawriga;
   @Input('commandawriga-prog') i: number;

   @Output('onSelectOrdinato') onSelectOrdinato = new EventEmitter();
   @Output('onSelectDeleted') onSelectDeleted = new EventEmitter();

   categoria: TcategoriaProdotto;
   prodotto: Prodotto;

   // prod: Prodotto;
   faUserEdit = faUserEdit;
   faTrash = faTrash;
   faInfo = faInfo;
   faInfoCircle = faInfoCircle;

 // -----
   public textMessage1 = '';
   public textMessage2 = '';
   public textUser = '';
   public headerPopup = '';
   public perDebug = 'Prodotto passato: ';
   public Message = '';
   public presenti = false;
   public isVisible = false;
   public alertSuccess = false;
   public aMenuSearch = '';
   public functionEnabled = false;

   closeResult = '';

   public type = '';

  // public nRec = 0;
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
   public routeProdotto = '';
   public flagDelete = '';
   public nprod = 0;

   constructor(public modalService: NgbModal,
               private tcategoriaProdottoService: TcategoriaProdottoService,
               private commandawrigaService: CommandawrigaService,
               private prodottoService: ProdottoService,
               private route: Router,
               private notifier: NotifierService) {
                 this.notifier = notifier;
               }

   ngOnInit(): void {

      this.loadCategoria(this.commandawriga.categoria);
   }

   CancellaProdotto() {
     alert('confermi di voler cancellare');
   }

   aggiornaProdotto() {
    console.log('sto acquistando il prodotto: ' + JSON.stringify(this.commandawriga));
    this.alertSuccess = true;
    if(this.commandawriga.qta == 0) {
       this.alertSuccess = false;
       this.Message = 'inserire qtà richiesta';
      } else {
        this.onSelectOrdinato.emit(this.commandawriga);
        this.flagDelete = 'N';
        this.onSelectDeleted.emit( this.flagDelete);
      }
   }




   async loadCategoria(id: number) {
    let res = await this.tcategoriaProdottoService.getbyId(id).subscribe(
      response => {
            this.categoria = response['data'];
        },
    error => {
        alert('giornata-detail-prodotti  --loadCategoria: ' + error.message);
        console.log(error);
        this.isVisible = true;
        this.alertSuccess = false;
        this.type = 'error';
        this.Message = 'Errore loadCategoria' + '\n' + error.message;
        this.showNotification(this.type, this.Message);
    });

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


open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
    // alert('controllo la modalità di chiusura della popup - chiusura su tasto save: ' + result);
    if(result ===  'Cancel click') {
       this.cancellazioneAbort();
    }
    if(result ===  'Delete click') {
      // gestire uscita da popup
      this.cancella(this.commandawriga);
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


cancella(commandawriga: Commandawriga) {
// cancellazione logica
  this.commandawriga.qta = 0;
  this.commandawrigaService.updateCommandawriga(commandawriga).subscribe(
      response => {
        if(response['rc'] === 'ok') {
          console.log('cancella ----------   effettuata la cancellazione - vado a aggiornaselectedDay');
          this.aggiornaselectedDay(this.commandawriga.idProdotto);
         }
    },
    error =>
        {
          this.isVisible = true;
          this.alertSuccess = false;
          this.type = 'error';
          this.Message = 'Errore cancellazione prodotto' + '\n' + error.message;
          this.showNotification(this.type, this.Message);
          console.log(error);
        });
}

async aggiornaselectedDay(id: number) {
  console.log('aggiornaselectedDay ----------  appena dentro');
  let rc = await this.prodottoService.getProdotto(id).subscribe(
    resp => {
        if(resp['rc'] === 'ok') {
          this.prodotto = resp['data'];
          this.prodotto.selectedDay = 'N';
          console.log('aggiornaselectedDay  ------ preparat prodotto per update ------------  ' + JSON.stringify(this.prodotto));
          this.aggiornaprodotto(this.prodotto);
          this.flagDelete = 'S';
          this.onSelectDeleted.emit( this.flagDelete);
         }
       },
    error => {
        alert('sono in aggiornaselectedDay - error');
        this.isVisible = true;
        this.alertSuccess = false;
        console.log('aggiornaselectedDay - errore: ' + error);
        this.type = 'error';
        this.Message = error.message;
        this.alertSuccess = false;
        this.showNotification(this.type, this.Message);
    });
 }

 async aggiornaprodotto(prodotto: Prodotto) {
  console.log('aggiornaprodotto --------  pronto per fare update Prodotto: ' + JSON.stringify(prodotto));
  let rc = await this.prodottoService.updateProdotto(prodotto).subscribe(
    resp => {
        if(resp['rc'] === 'ok') {
          // rifaccio la lettura dei prodotti della stessa tipologia
          this.isVisible = true;
          this.alertSuccess = true;
          this.type = 'success';
          this.Message = 'Prodotto cancellato correttamente';
          this.showNotification(this.type, this.Message);
         }
       },
    error => {
        alert('sono in aggiornaprodotto - error');
        this.isVisible = true;
        this.alertSuccess = false;
        console.log('aggiornaprodotto - errore: ' + error);
        this.type = 'error';
        this.Message = error.message;
        this.alertSuccess = false;
        this.showNotification(this.type, this.Message);
    });
 }

 /*    da fare
  showDetail() {

     this.onSelectProdotto.emit(this.prodotto);



 }

 showProdottoDetail() {


   this.routeProdotto = '/giornata/ProdottiMenu/Edits/' + this.prodotto.id;

   this.route.navigate([`${this.routeProdotto}`]);
 }



 showPersonaDetailNew() {
   //alert('creato evento per passare utente: ' + this.persona.cognome);
   this.onSelectProdotto.emit(this.prodotto);
   //alert(' ---- 2   creato evento per passare utente: ' + this.persona.cognome);
 }




 getColor(aMenu) {
   switch (aMenu) {
     case '*':
       return 'green';
     case 'S':
       return 'blue';
     case 'N':
       return 'red';
   }
 }

 getbackgroundColor(aMenu) {
   switch (aMenu) {
     case '*':
       return 'yellow';
     case 'S':
       return 'red';
     case 'N':
       return 'black';
   }
 }

*/
}
