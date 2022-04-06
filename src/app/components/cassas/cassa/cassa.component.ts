import { Component, Input, OnInit } from '@angular/core';
import { TTaglia } from '../../../classes/T_taglia';
// service
import { TtagliaService} from '../../../services/ttaglia.service';
import { CassaService} from '../../../services/cassa.service';
import { Cassa} from '../../../classes/Cassa';
import { faUserEdit, faTrash, faInfo, faInfoCircle, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'tr[app-cassa]',
  templateUrl: './cassa.component.html',
  styleUrls: ['./cassa.component.css']
})
export class CassaComponent implements OnInit {

  public taglia: TTaglia;
  public taglianull = new TTaglia();

  public idTaglia = 0;

   // variabili passate dal componente padre
   @Input('cassa-data') cassa: Cassa;
   @Input('cassa-prog') i: number;

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
              private cassaService: CassaService,
              private ttagliaService: TtagliaService,
              private route: Router,
              private notifier: NotifierService) {
              this.notifier = notifier;
            }

  ngOnInit(): void {

    this.idTaglia = this.cassa.idTaglia;
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
