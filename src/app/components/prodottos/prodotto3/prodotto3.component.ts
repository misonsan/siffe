import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// service
import { ProdottoService} from './../../../services/prodotto.service';

// classes
import { Prodotto} from '../../../classes/Prodotto';
import { faUserEdit, faTrash, faInfo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
// il dettaglio lo faccio con pagina normale
//  import { ProdottodaypopComponent } from './../../components/popups/prodottodaypop/prodottodaypop.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'tr[app-prodotto3]',
  templateUrl: './prodotto3.component.html',
  styleUrls: ['./prodotto3.component.css']
})
export class Prodotto3Component implements OnInit {

 // variabili passate dal componente padre
 @Input('prodotto3-data') prodotto: Prodotto;
 @Input('prodotto3-prog') i: number;

 @Output('onSelectProdotto') onSelectProdotto = new EventEmitter();
 @Output('onSelectTipologia') onSelectTipologia = new EventEmitter();

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
             private notifier: NotifierService) {
               this.notifier = notifier;
             }

 ngOnInit(): void {


 }



selezionaProdotto() {

this.onSelectProdotto.emit(this.prodotto);
this.onSelectTipologia.emit(this.prodotto.tipologia);





// this.routeProdotto = '/giornata/ProdottiMenu/Edits/' + this.prodotto.id;

// this.route.navigate([`${this.routeProdotto}`]);
}



}
