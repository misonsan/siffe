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
  selector: 'tr[app-spesa3]',
  templateUrl: './spesa3.component.html',
  styleUrls: ['./spesa3.component.css']
})
export class Spesa3Component implements OnInit {

  spesa1: Spesa;
  spesa2: Spesa;

  @Input('spesa3-data') spesa: Spesa;
  @Input('spesa3-prog') i: number;

// passo dati a manif/bilancio - passo i totali al Padre dal figlio
  @Output('onSpesaTotale') onSpesaTotale = new EventEmitter();
  @Output('onSpesadapagare') onSpesadapagare = new EventEmitter();
  @Output('onSpesapagata') onSpesapagata = new EventEmitter();


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

    console.log('spese3 oninit: ' + JSON.stringify(this.spesa));
    this.spesa1 = new Spesa();

    this.spesa2 = new Spesa();

    this.CalcolaTotali(this.spesa.idFornitore);
  }

  async CalcolaTotali(id: number) {
    console.log('CalcolaTotali - appena entrato: ' + id);

    let rc = await this.spesaService.getimportispeseFornitore(id).subscribe(
      resp => {
            console.log('CalcolaTotali ' + JSON.stringify(resp['dapagare']));
            if(resp['rc'] === 'ok') {

              this.spesa1.importo = resp['dapagare'];
              this.spesa2.importo = resp['pagate'];
              this.onSpesaTotale.emit(this.spesa.importo);
              this.onSpesadapagare.emit(this.spesa1.importo);
              this.onSpesapagata.emit(this.spesa2.importo);
              console.log('totyali ricaolcolati: -- da pagare ' + this.spesa1.importo + ' pagate: ' + this.spesa2.importo);
            }
         },
      error => {
           alert('sono in CalcolaTotali');
           this.isVisible = true;
           this.alertSuccess = false;
           console.log('CalcolaTotali - errore: ' + error);
           this.type = 'error';
           this.Message = error.message;
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





 getColor(perc: number) {

          if(perc > 13) {
            return 'red';
          } else {
            return 'green';
          }

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



