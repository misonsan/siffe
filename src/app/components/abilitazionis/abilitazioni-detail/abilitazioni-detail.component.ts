import { Component, OnInit } from '@angular/core';

// classi Model
import { Userlevel } from '../../../classes/UserLevel';
import { Abilitazione } from '../../../classes/abilitazione';
// service
import { AbilitazioneService } from '../../../services/abilitazione.service';
import { UserlevelService } from '../../../services/userlevel.service';
// per gestire la notifica esito
import { NotifierService } from 'angular-notifier';
// popup per avviso cancellazione
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// icone
import { faTrash, faUserEdit, faSave, faWindowClose, faPlusSquare, faSearch} from '@fortawesome/free-solid-svg-icons';
// router
import { Router } from '@angular/router';



@Component({
  selector: 'app-abilitazioni-detail',
  templateUrl: './abilitazioni-detail.component.html',
  styleUrls: ['./abilitazioni-detail.component.css']
})
export class AbilitazioniDetailComponent implements OnInit {

  public userlevels: Userlevel[]=[];
  public userlevel: Userlevel;
  public abilitazioni: Abilitazione[] = [];
  public anilitazione: Abilitazione;



  public title = "Gestione Abilitazioni per profilo";

  // icone
   faPlusSquare = faPlusSquare;
   faSearch = faSearch;
   faSave = faSave;
   faUserEdit = faUserEdit;
   faWindowClose = faWindowClose;
   faTrash = faTrash;

   // variabili per editazione messaggio
   public alertSuccess = false;
   public savechange = false;
   public isVisible = false;

   public nRecMan = 0;
   public nRec = 0;
   public trovatoRec = false;
   public Message = '';
   public Message1err = 'Contattare il gestore dell applicazione.';

   public type = '';
   public id = 0;

   public userSuper = false;
   public userGuest = false;
   public userOther = false;
   public effettuataModifica = false;
   public optionSelect = '';

   public selectedProfiloValue = 0;
   public selectedPro = 0;

   p: number;

  constructor(private userlevelService: UserlevelService,
              private abilitazioneService: AbilitazioneService,
              private modalService: NgbModal,
              private router: Router,
              private notifier: NotifierService) {
                this.notifier = notifier;
              }


  ngOnInit(): void {
    this.loadlevels();
  }

  loadlevels() {

    console.log('loadlevels-----  ');
    this.userlevelService.getAlls().subscribe(
      res => {
            this.userlevels = res['data'];
         },
        error => {
           alert('user-detail  -- loadlevels - errore: ' + error.message);
           console.log(error);
           this.type = 'error';
           this.Message = error.message;
           this.alertSuccess = false;
           this.showNotification(this.type, this.Message);

        });

  }

  selectedProfilo(level: number) {

  }

/*
   Show a notification
   @param {string} type    Notification type
   @param {string} message Notification message
  */

   showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  /*
  selectedProfilo(selectedValue: number) {
    alert('selezionato: ' + selectedValue);
    if(selectedValue ===  0) {
      this.type = 'error';
      this.Message = 'selezione non corrette';
      this.showNotification(this.type, this.Message);
      this.alertSuccess = false;
      this.isVisible = true;
      return;
   } else {
    this.selectedProfiloValue = selectedValue;
    this.loadallAbilitazioni(selectedValue);
   }

}


async loadallAbilitazioni(level: number) {

this.trovatoRec = false;
this.isVisible = true;
const rc = await  this.abilfunctioneService.getAbilbylevel(level).subscribe(
    response => {
       console.log('frontend - loadabilitazioni ' + response['data']);
       this.abilitazioni = response['data'];
       this.nRec = response['number'];
      // this.textMessage = response['message'];
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

*/

}
