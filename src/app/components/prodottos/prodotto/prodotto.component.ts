import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// service
import { ProdottoService} from './../../../services/prodotto.service';
import { GiornataService } from './../../../services/giornata.service';
// classes
import { Prodotto} from '../../../classes/Prodotto';
import { Giornata } from '../../../classes/Giornata';  // per gestire la chiamata a ghost
import { faUserEdit, faTrash, faInfo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
// il dettaglio lo faccio con pagina normale
//  import { ProdottodaypopComponent } from './../../components/popups/prodottodaypop/prodottodaypop.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'tr[app-prodotto]',
  templateUrl: './prodotto.component.html',
  styleUrls: ['./prodotto.component.css']
})
export class ProdottoComponent implements OnInit {

  // variabili passate dal componente padre
  @Input('prodotto-data') prodotto: Prodotto;
  @Input('prodotto-prog') i: number;
  @Input('prodotto-nrec') nrec: number;

// passo dati a persona-detail
  @Output('onSelectProdotto') onSelectProdotto = new EventEmitter();

  giornata: Giornata;

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

  constructor(public modal: NgbModal,
              private prodottoService: ProdottoService,
              private route: Router,
              private giornataService: GiornataService,
              private notifier: NotifierService) {
                this.notifier = notifier;
              }

  ngOnInit(): void {
    // alert(' prodotto ------------------------nrec Passato:  ' + this.nrec);
     //   per gestire eventuale popup
     this.headerPopup = 'Registrazione Prodotti';
     this.textMessage1 = '?????????? ';
  //   this.textUser = this.messa.demessa;
     this.textMessage2 = 'Registrazione non possibile';
     this.controllaGiornata();

  }

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

  async  ControllaSeselezionatiTutti() {
    // verificare se selezionati tutti a menu o no menu
    alert('------------------ Controllaselezionatitutti ');
    this.aMenuSearch = '*';
    let res = await  this.prodottoService.getProdottiforMenu(this.aMenuSearch).subscribe(
     resp => {

      alert('Controllaselezionatitutti: ' + resp['number']);
      if(resp['number'] === 0) {
         this.functionEnabled = false;
       } else {
        this.functionEnabled = true;
       }
     },
     error => {
       alert(' ControllaSeselezionatiTutti');
       console.log(error);
       this.type = 'error';
       this.Message = 'Errore ControllaSeselezionatiTutti ' + '\n' + error.message;
       this.showNotification(this.type, this.Message);
       this.alertSuccess = false;
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


 showDetail() {
  // non effettuo una navigazione a altro componente, ma passo una variabile a Persona-Detail
    //     this.route.navigate(['persona', this.persona.id]);


    this.onSelectProdotto.emit(this.prodotto);


   // alert('----- 2       dovrei aver passaato oggetto user al filglio (persone-detail' + this.persona.cognome);

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



 // passare oggetto messa
 // this.route.navigate(['messa', this.messa.id]);

//   metodo per conferma popup
okconfirm() {
   alert('metodo da fare');
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


}
