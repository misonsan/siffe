import { Component, OnInit } from '@angular/core';
// service
import { UserService} from '../../../services/user.service';
import { AbilitazioneService } from '../../../services/abilitazione.service';
// classi
import { User } from '../../../classes/User';
import { Abilitazione} from '../../../classes/abilitazione';
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
  selector: 'app-abilitazioni',
  templateUrl: './abilitazioni.component.html',
  styleUrls: ['./abilitazioni.component.css']
})


export class AbilitazioniComponent implements OnInit {


  public title = "elenco abilitazioni concesse - abilitazioni";
  // icone
  faPlusSquare = faPlusSquare;
  faSearch = faSearch;
  faInfoCircle = faInfoCircle;
  faUserEdit = faUserEdit;

  public abili: Abilitazione[] = [];
  public abilitazione: Abilitazione;
  public user: User;
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

  options = [
    'Tutte',
    'Nessuna',
    'Inqu',
    'Edit'
  ];




   // per paginazone
p: number = 1;

constructor(private userService: UserService,
            private abilitazioneService: AbilitazioneService,
            private modalService: NgbModal,
            private route: ActivatedRoute,
            private router: Router,
            private modal: NgbModal,
            private notifier: NotifierService) {
              this.notifier = notifier;
            }


ngOnInit(): void {
    this.validSearch = false;
    this.route.paramMap.subscribe(p => {
    // leggo i dati della messa
    this.loadUser(+p.get('id'));
    // -------  leggo tutte le abilitazioni concesse all'utente
    //  this.loadAbilitazionibyUser(+p.get('id'));

    });
}

//  posso aprire la popoup con dimensioni diverse:
//  this.modal.open(modalProdotto,{size:'sm'});    <----  piccola
//  this.modal.open(modalProdotto,{size:'lg'});    <----  ampia
//  this.modal.open(modalProdotto,{size:'xl'});    <----  grandissima



// recupero i dati dell Utente
async loadUser(id: number) {
  const rc = await  this.userService.getuser(id).subscribe(
     response => {
       this.user = response['data'];
       this.loadAbilitazionibyUser(id);
   },
   error => {
      console.log(error);
      this.isVisible = true;
      this.alertSuccess = false;
      this.type = 'error';
      this.Message = error.message;
      this.showNotification(this.type, this.Message);
   }
 );

}

// metodo fatto da Moreno per selezionare le giornate della manifestazione

async loadAbilitazionibyUser(id: number) {

   this.trovatoRec = false;
   this.isVisible = true;
   const rc = await  this.abilitazioneService.getAllbyUser(id).subscribe(
       response => {
          console.log('frontend - loadAbilitazionibyuser ' + response['data']);
          this.abili = response['data'];
          console.log('frontend- lette abilitazioni: ' + response['data']);
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
         alert('Abilitazioni  -- loadAbilitazionibyUser: ' + error.message);
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
onSelectionChange(timanif: string)   {
  this.tipoRichiesta = timanif.substring(0,1);
// per impostare il campo corretto di ricerca per i fedele entrati
  this.validSearch = true;

}

Nuovo() {
  alert('funzione da fare - vedi sif2020')
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


}
