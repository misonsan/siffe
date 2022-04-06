// funzionante a elenco normale senza tabs
import { Component, OnInit } from '@angular/core';
// service

import { AbilfunctioneService } from '../../../services/abilfunctione.service';
import { UserlevelService } from '../../../services/userlevel.service';

// classi

import { Abilfunctione} from '../../../classes/Abilfunctione';
import { Userlevel} from '../../../classes/UserLevel';
// per gestire la notifica esito
import { NotifierService } from 'angular-notifier';
// popup per avviso cancellazione
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// icone
import { faPlusSquare, faSearch, faInfoCircle, faUserEdit } from '@fortawesome/free-solid-svg-icons';
// router
import { ActivatedRoute, Router } from '@angular/router';
// popup user Modal per gestire inserimento/Modifica/cancellazione con un solo componente
// import { EditUserComponent } from '../../popups/edit-user/edit-user.component';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  selector: 'app-abilfunctioni',
  templateUrl: './abilfunctioni.component.html',
  styleUrls: ['./abilfunctioni.component.css']
})
export class AbilfunctioniComponent implements OnInit {

  public title = "elenco abilitazioni per profilo concesse - abilitazioni";
  // icone
  faPlusSquare = faPlusSquare;
  faSearch = faSearch;
  faInfoCircle = faInfoCircle;
  faUserEdit = faUserEdit;

  public abilitazioni: Abilfunctione[] = [];
  public abilitazione: Abilfunctione;
  public userlevels: Userlevel[] = [];
  public userlevel: Userlevel;

  public nRecMan = 0;
  public nRec = 0;
  public trovatoRec = false;
  public tipoRichiesta = '?';
  public ricManif = 0;
  public validSearch = false;
  private textMessage = '';

   // variabili per notifica esito operazione con Notifier
  public type = '';
  public Message = '';
  public isVisible = false;
  public alertSuccess = false;

  public searchText = '';
  public ricercaIniziale = 0;
     // per paginazone
  p: number = 1;

constructor(private abilfunctioneService: AbilfunctioneService,
            private userlevelService: UserlevelService,
            private modalService: NgbModal,
            private route: ActivatedRoute,
            private router: Router,
            private modal: NgbModal,
            private notifier: NotifierService) {
              this.notifier = notifier;
            }


ngOnInit(): void {
  this.ricercaIniziale = -1;
  this.loadProfili();
  this.loadabilitazioni(this.ricercaIniziale);

//  this.onSelectionChangeFiltro(this.ricercaIniziale);


}

//  posso aprire la popoup con dimensioni diverse:
//  this.modal.open(modalProdotto,{size:'sm'});    <----  piccola
//  this.modal.open(modalProdotto,{size:'lg'});    <----  ampia
//  this.modal.open(modalProdotto,{size:'xl'});    <----  grandissima




// metodo fatto da Moreno per selezionare le giornate della manifestazione

async loadabilitazioni(abil: number) {

   this.trovatoRec = false;
   this.isVisible = true;
   const rc = await  this.abilfunctioneService.getAbilbylevel(abil).subscribe(
       response => {
          console.log('frontend - loadabilitazioni ' + response['data']);
          this.abilitazioni = response['data'];
          this.nRec = response['number'];
          this.textMessage = response['message'];
          this.trovatoRec = true;
          this.alertSuccess = true;
          this.Message = response['message'] //'Situazione Attuale  abilitazioni rilasciate';

          this.type = 'success';
          this.Message = response['message'];
          this.showNotification(this.type, this.Message);
      },
      error => {
         alert('Abilifunctioni  -- loadabilitazioni: ' + error.message);
         console.log(error);
         this.alertSuccess = false;
         this.Message = error.message;

         this.type = 'error';
         this.Message = error.message;
         this.showNotification(this.type, this.Message);
      }
    );
}


// imposto il filtro di ricerca dei fedeli
selectedProfilo(selectedValue: number)   {
  console.log(' ----------------------------------------------------------    selectedProfilo: ' + selectedValue);
  this.loadabilitazioni(selectedValue);
}

Nuovo() {
  alert('funzione da fare - vedi sif2020');
}


/**
  Show a notification

 @param {string} type Notification type
 @param {string} message Notification message
*/

 /*   legenda typo messaggio esito

    this.type = 'error';    --- operazione in errore
    this.type = 'success';  --- operazione conclusa correttamente
    this.type = 'default';
    this.type = 'info';
    this.type = 'warning';

   */

showNotification( type: string, message: string ): void {
  // alert('sono in showNot - ' + message);
  this.notifier.notify( type, message );
  console.log(`sono in showNotification  ${type}`);
  }

    loadProfili() {

      this.userlevelService.getAlls().subscribe(
        res => {
              this.userlevels = res['data'];
           },
          error => {
             alert('Abilfunctioni  -- loadProfili - errore: ' + error.message);
             console.log(error);
             this.Message = error.message;
             this.alertSuccess = false;
          });
    }



}
