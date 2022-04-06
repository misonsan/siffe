import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// Model Classes
import { Cassawc} from '../../../classes/Cassawc';
import { TTaglia } from '../../../classes/T_taglia';
// service
import { TtagliaService} from '../../../services/ttaglia.service';
import { CassawcService} from '../../../services/cassawc.service';

import { faUserEdit, faTrash, faInfo, faInfoCircle, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'tr[app-cassawc]',
  templateUrl: './cassawc.component.html',
  styleUrls: ['./cassawc.component.css']
})
export class CassawcComponent implements OnInit {

  public taglia: TTaglia;
  public taglianull = new TTaglia();

  public idTaglia = 0;

   // variabili passate dal componente padre
   @Input('cassawc-data') cassawc: Cassawc;
   @Input('cassawc-prog') i: number;

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
              private cassawcService: CassawcService,
              private ttagliaService: TtagliaService,
              private route: Router,
              private notifier: NotifierService) {
              this.notifier = notifier;
            }

  ngOnInit(): void {

    this.idTaglia = this.cassawc.idTaglia;
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


async inserisci(cassawc: Cassawc) {

  console.log('frontend - inserisci: ---- cassawc ---------- ' + JSON.stringify(cassawc));
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


  if(cassawc.idTaglia < 6) {
    this.numstrng = cassawc.qtaInc.toString();
    if(this.numstrng.indexOf('.') !== -1){
      this.type = 'error';
      this.Message = 'Non sono ammessi decimali';
      this.showNotification(this.type, this.Message);
      return;
    }
  }

  // controlli su campo immesso
  if(cassawc.qtaInc === 0) {
    this.type = 'error';
    this.Message = 'inserire un importo Maggiore di zero';
    this.showNotification(this.type, this.Message);
    return;
  }
  if(cassawc.qtaInc < 0) {
    this.type = 'error';
    this.Message = 'non sono ammessi valori negativi';
    this.showNotification(this.type, this.Message);
    return;
  }
  if(cassawc.qtaInc > 0) {
    console.log('inserisci -  sto per passare a backend ---  taglia: ' + JSON.stringify(cassawc) + ' commanda: ' + cassawc.idCommanda);
    // originale

    /*   per un problema inspiegabile (codice corretto e confrontato con altre situazioni analoghe) quando faccio update nel
         controller backend non viene passato l'ggetto cassawc per fare aggiornamento.
         risolto effettuando prima la cancellazione della taglia e poi inserimento (così funziona)

    let rc = await this.cassawcService.updateCassa(cassawc, cassawc.idCommanda).subscribe(
   // let rc = await this.cassawcService.updateCassaTest(cassawc).subscribe(                     // per test
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

     */
    cassawc.valoreInc = this.taglia.valore_taglia * cassawc.qtaInc;
    cassawc.tipoMov = 'I';
    let rc = await this.cassawcService.deleteTagliabyCommanda(cassawc).subscribe(
        resp => {
               if(resp['rc'] === 'ok') {
                 cassawc.tipoMov = 'I';
                 this.InserisciTaglia(cassawc);
               }
            },
         error => {
              alert('sono in inserisci - errore');
              console.log('inserisci - errore: ' + error);
              this.type = 'error';
              this.Message = error.message;
              this.showNotification(this.type, this.Message);
            });

        }

}

async InserisciTaglia(cassawc: Cassawc) {
  let rc = await this.cassawcService.createCassa(cassawc).subscribe(
    resp => {
           if(resp['rc'] === 'ok') {
             this.ricalcolaTotali(cassawc.idCommanda);
           }
        },
     error => {
          alert('sono in inserisci - errore');
          console.log('inserisci - errore: ' + error);
          this.type = 'error';
          this.Message = error.message;
          this.showNotification(this.type, this.Message);
        });

}

async ricalcolaTotali(id: number) {
  let rc = await this.cassawcService.getTotaleCassa(id).subscribe(
    resp => {
           if(resp['rc'] === 'ok') {
            this.totaleIncassato.emit(resp['incassato']);
            console.log('ricalcolaTotali: ' + resp['incassato']);

           }
        },
     error => {
          alert('sono in inserisci - errore');
          console.log('inserisci - errore: ' + error);
          this.type = 'error';
          this.Message = error.message;
          this.showNotification(this.type, this.Message);
        });
    }



}
