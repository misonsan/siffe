import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// service
import { SpesaService} from './../../../services/spesa.service';
// classes
import { Spesa} from '../../../classes/Spesa';
import { faUserEdit, faTrash, faInfo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
// il dettaglio lo faccio con pagina normale
//  import { SpesadaypopComponent } from './../../components/popups/spesadaypop/spesadaypop.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'tr[app-spesa2]',
  templateUrl: './spesa2.component.html',
  styleUrls: ['./spesa2.component.css']
})
export class Spesa2Component implements OnInit {

  @Input('spesa2-data') spesa: Spesa;
  @Input('spesa2-prog') i: number;
  //                                         @Input('spesa4-nrec') nrec: number;   da cancellare
  @Input('functionUser') functionUser: string;

 // passo dati a persona-detail
 @Output('onSelectSpesa') onSelectSpesa = new EventEmitter();
 // passo al figlio la segnalazione che ho effettuato la cancellazione- serve per rifare l'elemco aggiornato
 @Output('onDeleteSpesa') onDeleteSpesa = new EventEmitter();

  // prod: Spesa;
  faUserEdit = faUserEdit;
  faTrash = faTrash;
  faInfo = faInfo;
  faInfoCircle = faInfoCircle;

 // -----
  public textMessage1 = '';
  public textMessage2 = '';
  public textUser = '';
  public headerPopup = '';
  public perDebug = 'Spesa passato: ';
  public Message = '';
  public presenti = false;
  public isVisible = false;
  public alertSuccess = false;
  public aMenuSearch = '';
  public functionEnabled = false;
  public enabledDelete = false;

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
  public routeSpesa = '';
  public deletedSpesa = 'Dspesa';
  public errordeletedSpesa = 'errorDspesa';
  closeResult = '';

  constructor(public modal: NgbModal,
              private spesaService: SpesaService,
              private route: Router,
              private notifier: NotifierService) {
                this.notifier = notifier;
              }

  ngOnInit(): void {
    // alert(' spesa ------------------------nrec Passato:  ' + this.nrec);
     //   per gestire eventuale popup
     this.headerPopup = 'Registrazione Prodotti';
     this.textMessage1 = '?????????? ';
  //   this.textUser = this.messa.demessa;
     this.textMessage2 = 'Registrazione non possibile';


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


 showDetail() {
  // non effettuo una navigazione a altro componente, ma passo una variabile a Persona-Detail
    //     this.route.navigate(['persona', this.persona.id]);


    this.onSelectSpesa.emit(this.spesa);


   // alert('----- 2       dovrei aver passaato oggetto user al filglio (persone-detail' + this.persona.cognome);

 }


 /*
  this.routeSpesa = '/giornata/ProdottiMenu/Edits/' + this.spesa.id;

  this.route.navigate([`${this.routeSpesa}`]);
  */

  showSpesaDetail(functionUser: string) {
   // alert('da fare -  functionUser passata dal Padre : ' + functionUser);
   // salvo su localstoraage la path per il ritorno
    localStorage.setItem('pathSpesa', 'spesa');

    switch (functionUser) {

         case 'Inqu':
       //  let aa = this.router.navigate(['/users/id/inqu', id]);
       //  console.log('aaaaa ' + aa);

        this.route.navigate(['spesa/inqu/' + this.spesa.id]);
        break;
      case 'Edit':
        this.route.navigate(['spesa/edit/'  + this.spesa.id]);
        break;
      case 'Edits':
        this.route.navigate(['spesa/edits/'  + this.spesa.id]);
        break;
      default:
        alert('scelta errata \n navigazione non possibile');
        break;
    }

  }


 showPersonaDetailNew() {
  //alert('creato evento per passare utente: ' + this.persona.cognome);
  this.onSelectSpesa.emit(this.spesa);
  //alert(' ---- 2   creato evento per passare utente: ' + this.persona.cognome);
 }



 // passare oggetto messa
 // this.route.navigate(['messa', this.messa.id]);

 //   metodo per conferma popup
 okconfirm() {
   alert('metodo da fare');
 }


 getColor(perc: number) {

  if(perc > 13) {
    return 'red';
  } else {
    return 'green';
  }



 }

 /*
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


       // menu per cancellazione
       open(content) {
        this.modal.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
          // alert('controllo la modalità di chiusura della popup - chiusura su tasto save: ' + result);
          if(result ===  'Cancel click') {
             this.cancellazioneAbort();
          }
          if(result ===  'Delete click') {
            // gestire uscita da popup
            this.cancellaUser(this.spesa);
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

  async  cancellaUser(spesa: Spesa) {
        console.log('cancella - emetto onDeletespesa');
        let rc = await  this.spesaService.deleteSpesa(spesa).subscribe(
          response => {
            if(response['rc'] === 'ok') {
              // imposto l'evento per passare la segnalazione di cancellazione al padre
              this.onDeleteSpesa.emit(this.deletedSpesa);
              this.isVisible = true;
              this.alertSuccess = true;
              this.type = 'success';
              this.Message = 'Spesa cancellata correttamente';
              this.showNotification(this.type, this.Message);
            }
        },
        error =>
            {
              /*
             let errore =  error.error.message;
             console.log('errore-1: ' + errore);
             errore = errore.substr(7, 68);
             console.log('errore-2............: ' + errore);
             console.log('error.error.message ................. ' + error.error.message);
             console.log('error.name ................. ' + error.name);
    */
             const test = 'Cannot delete or update a parent row: a foreign key constraint fails';

             const str = error.error.message;
             const substr = 'Cannot delete or update a parent row: a foreign key constraint fails';

             console.log(' controllo se errore contiene una string particolare :' + str.includes(substr));



             if(str.includes(substr)) {
                console.log('trovato errore - imposto event');
                this.onDeleteSpesa.emit(this.errordeletedSpesa);
                console.log('trovato errore - impostato -------------------------- event');
                //return;
            }  else {
              this.isVisible = true;
              this.alertSuccess = false;
              this.type = 'error';
              console.log('error.message: ' + error.message);
              console.log('error.error.message: ' + error.error.message);
              this.Message = 'Errore cancellazione spesa' + '\n' + error.error.message;
              this.showNotification(this.type, this.Message);
              console.log(error);
            }

            });
      }


}


