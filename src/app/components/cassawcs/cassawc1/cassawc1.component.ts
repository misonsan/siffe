import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// Model Classes
import { Cassawc} from '../../../classes/Cassawc';
import { Cassa} from '../../../classes/Cassa';
import { TTaglia } from '../../../classes/T_taglia';

// service
import { TtagliaService} from '../../../services/ttaglia.service';
import { CassawcService} from '../../../services/cassawc.service';
import { CassaService} from '../../../services/cassa.service';


import { faUserEdit, faTrash, faInfo, faInfoCircle, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'tr[app-cassawc1]',
  templateUrl: './cassawc1.component.html',
  styleUrls: ['./cassawc1.component.css']
})
export class Cassawc1Component implements OnInit {
  public taglia: TTaglia;
  public taglianull = new TTaglia();
  public cassa: Cassa;

  public idTaglia = 0;
  public darendere = 0;
   // variabili passate dal componente padre
   @Input('cassawc1-data') cassawc: Cassawc;
   @Input('cassawc1-prog') i: number;
   @Input('cassawc1-residuo') residuo: number;

 // passo dati a persona-detail   --  da fare
 @Output('totaleReso') totaleReso = new EventEmitter();


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
              private cassaService: CassaService,
              private ttagliaService: TtagliaService,
              private route: Router,
              private notifier: NotifierService) {
              this.notifier = notifier;
            }

  ngOnInit(): void {

    this.idDay  =  +localStorage.getItem('idGiornata');
    this.idTaglia = this.cassawc.idTaglia;
    this.loadTaglia(this.idTaglia);
    this.loadqtaCassa(this.idTaglia);
    console.log('cassawc1 - oninit - residuo: ' + this.residuo);
    this.darendere = 0;
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

  async loadqtaCassa(id: number) {
    let rc = await this.cassaService.getbyidTagliaeGiorno(this.idDay, id).subscribe(
      resp => {
            console.log(`loadqtaCassa:  ${JSON.stringify(resp['data'])} `);
            if(resp['rc'] === 'ok') {
              this.cassa = resp['data'];
            }
       },
      error => {
           alert('sono in loadqtaCassa - errore');
           console.log('loadqtaCassa - errore: ' + error);
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


async resto(cassawc: Cassawc) {

  console.log('frontend - resto: ---- cassawc ---------- ' + JSON.stringify(cassawc));
  /*
  this.numstrng = taglia.qtaRes.toString();
  if(this.numstrng.indexOf('.') !== -1){
    console.log('La stringa ------------------->   contiene punto' + JSON.stringify(taglia.qtaRes.toString()));
  }
  else{
    console.log('La stringa  ------NON-------  Contiene punto' +  JSON.stringify(taglia.qtaRes.toString()));
  }
  return;
  */


  if(cassawc.idTaglia < 6) {
    this.numstrng = cassawc.qtaRes.toString();
    if(this.numstrng.indexOf('.') !== -1){
      this.type = 'error';
      this.Message = 'Non sono ammessi decimali';
      this.showNotification(this.type, this.Message);
      return;
    }
  }

 // controlli su campo immesso
  if(cassawc.idTaglia === 6) {
     cassawc.valoreRes = cassawc.qtaRes * 1;
}

  // controlli su campo immesso
  if(cassawc.qtaRes === 0) {
    this.type = 'error';
    this.Message = 'inserire un importo Maggiore di zero';
    this.showNotification(this.type, this.Message);
    return;
  }
  if(cassawc.qtaRes < 0) {
    this.type = 'error';
    this.Message = 'non sono ammessi valori negativi';
    this.showNotification(this.type, this.Message);
    return;
  }

  if(cassawc.idTaglia !== 6)  {
    if(this.taglia.valore_taglia > this.residuo) {
      this.type = 'error';
      this.Message = 'taglia superiore al rimborso dovuto residuo: ' + this.residuo + ' -- taglia: ' + this.taglia.valore_taglia;
      this.showNotification(this.type, this.Message);
      return;
    }
  }

  if(cassawc.idTaglia === 6) {
    this.cassawc.valoreRes = this.taglia.valore_taglia * cassawc.qtaRes;
    if(this.cassawc.valoreRes > this.residuo) {
      this.type = 'error';
      this.Message = 'importo superiore al rimborso dovuto residuo: ' + this.residuo + ' -- taglia: ' + this.taglia.valore_taglia;
      this.showNotification(this.type, this.Message);
      return;
    }
  }





  if(cassawc.qtaRes > 0) {
    cassawc.valoreRes = cassawc.qtaRes * this.taglia.valore_taglia;
    cassawc.tipoMov = 'R';
    console.log('inserisci -  sto per passare a backend ---  taglia: ' + JSON.stringify(cassawc) + ' commanda: ' + cassawc.idCommanda);
    let rc = await this.cassawcService.updateCassaResto(cassawc).subscribe(
   // let rc = await this.cassawcService.updateCassaTest(cassawc).subscribe(                     // per test
      resp => {
            console.log(`resto:  ${JSON.stringify(resp['resto'])} `);
            if(resp['rc'] === 'ok') {
              this.darendere = this.residuo - resp['resto'] ;
              this.totaleReso.emit(resp['resto']);
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
            this.totaleReso.emit(resp['resto']);
            console.log('ricalcolaTotali: ' + resp['resto']);
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
