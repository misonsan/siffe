import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// service
import { TtagliaService} from '../../../services/ttaglia.service';
import { CassawService} from '../../../services/cassaw.service';
// model Class
import { Cassaw } from '../../../classes/Cassaw';
import { TTaglia } from '../../../classes/T_taglia';
// varie
import { faUserEdit, faTrash, faInfo, faInfoCircle, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'tr[app-cassaw1]',
  templateUrl: './cassaw1.component.html',
  styleUrls: ['./cassaw1.component.css']
})
export class Cassaw1Component implements OnInit {

  public taglia: TTaglia;
  public taglianull = new TTaglia();

  public idTaglia = 0;

   // variabili passate dal componente padre
  @Input('cassaw1-data') cassaw: Cassaw;
  @Input('cassaw1-prog') i: number;

 // passo dati a persona-detail   --  da fare
  @Output('totaleIncassato') totaleIncassato = new EventEmitter();


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

  public numstrng = '';

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


async inserisci(taglia: Cassaw) {

  /*
  this.numstrng = taglia.qtaInc.toString();
  if(this.numstrng.indexOf('.') !== -1){
    console.log('La stringa ------------------->   contiene punto' + JSON.stringify(taglia.qtaInc.toString()));
  }
  else{
    console.log('La stringa  ------NON-------  Contiene punto' +  JSON.stringify(taglia.qtaInc.toString()));
  }
  return;
  */


  if(taglia.idTaglia < 6) {
    this.numstrng = taglia.qtaInc.toString();
    if(this.numstrng.indexOf('.') !== -1){
      this.type = 'error';
      this.Message = 'Non sono ammessi decimali';
      this.showNotification(this.type, this.Message);
      return;
    }
  }

  // controlli su campo immesso
  if(taglia.qtaInc === 0) {
    this.type = 'error';
    this.Message = 'inserire un importo Maggiore di zero';
    this.showNotification(this.type, this.Message);
    return;
  }
  if(taglia.qtaInc < 0) {
    this.type = 'error';
    this.Message = 'non sono ammessi valori negativi';
    this.showNotification(this.type, this.Message);
    return;
  }
  if(taglia.qtaInc > 0) {
    console.log('inserisci - taglia: ' + JSON.stringify(taglia));
    let rc = await this.cassawService.updateCassa(taglia, taglia.idGiornata).subscribe(
      resp => {
            console.log(`inserisci:  ${JSON.stringify(resp['incassato'])} `);
            if(resp['rc'] === 'ok') {
              this.totaleIncassato.emit(resp['incassato']);
            }
         },
      error => {
           alert('sono in inserisci - errore');
           console.log('inserisci - errore: ' + error);
           this.type = 'error';
           this.Message = error.message;
           this.showNotification(this.type, this.Message);
         });
      } else {
          this.type = 'error';
          this.Message = 'Valore errato';
          this.showNotification(this.type, this.Message);
          return;
     }
}

getColor(qtaInc) {
console.log('cassaw1 - getcolor:' + qtaInc);
    if(qtaInc > 0) {
      return 'yellow';
    }

}

getbackgroundColor(qtaInc) {
  if(qtaInc > 0) {
    return 'black';
  }
}


}
