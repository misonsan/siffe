//  posso aprire la popoup con dimensioni diverse:
//  this.modal.open(modalProdotto,{size:'sm'});    <----  piccola
//  this.modal.open(modalProdotto,{size:'lg'});    <----  ampia
//  this.modal.open(modalProdotto,{size:'xl'});    <----  grandissima




import { Component, OnInit } from '@angular/core';

import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
// component
import { Abilitazione } from '../../../classes/abilitazione';
import { User } from '../../../classes/User';
import { faPlusSquare, faSearch, faSave, faUserEdit, faMinus, faPlus, faWindowClose, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
// service
import { AbilitazioneService } from '../../../services/abilitazione.service';
import { UserService } from '../../../services/user.service';

import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';

// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-abilitazione-detail',
  templateUrl: './abilitazione-detail.component.html',
  styleUrls: ['./abilitazione-detail.component.css']
})
export class AbilitazioneDetailComponent implements OnInit {

  public abil: Abilitazione;
  public user: User;

  public title = "Gestione Abilitazioni";

  // icone
   faPlusSquare = faPlusSquare;
   faSearch = faSearch;
   faSave = faSave;
   faUserEdit = faUserEdit;
   faMinus = faMinus;
   faPlus = faPlus;
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


  constructor(private userService: UserService,
              private abilitazioneService: AbilitazioneService,
              private modalService: NgbModal,
              private route: ActivatedRoute,
              private router: Router,
              private notifier: NotifierService) {
                this.notifier = notifier;
              }

  ngOnInit(): void {

    this.isVisible = true;
    this.userSuper = false;
    this.userGuest = false;
    this.userOther = false;
    this.effettuataModifica = false;

    this.route.paramMap.subscribe(p => {
      this.id = +p.get('id');
      console.log('id recuperato: ' + this.id);
      // -------  leggo i dati della giornata
      this.loadAbilitazione(this.id);
    });

  }

  async  loadAbilitazione(id: number) {
    const rc = await this.abilitazioneService.getAbilUserbyId(id).subscribe(
      resp => {
            this.abil = resp['data'];
            this.loadUser(this.abil.idUtente);
            this.alertSuccess = true;
            this.type = 'success';
            this.Message = resp['message'];
            this.showNotification(this.type, this.Message);
         },
      error => {
           alert('sono in loadAbilitazione');
           console.log(error);
           this.alertSuccess = false;
           this.type = 'error';
           this.Message = 'Errore loadAbilitazione' + '\n' + error.message;
           this.showNotification(this.type, this.Message);

         });
  }

/*   legenda typo messaggio esito

    this.type = 'error';    --- operazione in errore
    this.type = 'success';  --- operazione conclusa correttamente
    this.type = 'default';
    this.type = 'info';
    this.type = 'warning';

   */



/*
   Show a notification
   @param {string} type    Notification type
   @param {string} message Notification message
  */

 showNotification( type: string, message: string ): void {
  this.notifier.notify( type, message );
}


// recupero i dati dell Utente
async loadUser(id: number) {
  console.log('loadUser - inizio');
  const rc = await  this.userService.getuser(id).subscribe(
    response => {
        this.user = response.data;

        if (this.user.idRuolo_Day === -1) {
            this.userSuper =  true;
        } else if (this.user.idRuolo_Day === 0) {
          this.userGuest =  true;
        } else {
          this.userOther =  true;
        }
         console.log('fatto lettura user')
        },
        error => {
          console.log(error);
          this.isVisible = true;
          this.alertSuccess = false;
          this.type = 'error';
          this.Message = error.message;
          this.showNotification(this.type, this.Message);
    });
  }


  cambiaOption(e) {
    this.effettuataModifica = true;
    console.log(e.target.value);

    this.optionSelect = e.target.value;



   // alert('selezionato: ' + e.target.value);
  //  this.abil.enabledNull = e.target.value;

    this.type = 'success';
    this.Message = 'il valore del botton è: ' +  e.target.value;
    this.showNotification(this.type, this.Message);
  }

  onSubmit(form: NgForm): void {       // funziona alla perfezione

    console.log('onSubmit - step_0000000'   );

    if (!form.valid) {
      // alert('form Invalido - Login non verificabile');
      this.type = 'error';
      this.Message = 'form Invalido - Aggiornamento non eseguibile ';
      this.showNotification(this.type, this.Message);
      return;
  }

    this.abil.enabledEdit = 'N';
    this.abil.enabledInqu = 'N';
    this.abil.enabledNull = 'N';
    this.abil.key_utenti_operation = +localStorage.getItem('id');

    switch(this.optionSelect) {
      case 'N':
         this.abil.enabledNull = 'S';
         break;
      case 'I':
         this.abil.enabledInqu = 'S';
         break;
      case 'E':
         this.abil.enabledEdit = 'S';
         break;
     }
   // const { username, password } = this.form;
    this.isVisible = true;

console.log('onSubmit - step_01'   );

    //  con gestione subscribe  - in auth.service faccio solo la lettura  semplice
  /*
    this.auth.signIn(form.value.email, form.value.password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.type = 'success';
        this.Message = 'utente loggato correttamente';
        this.showNotification(this.type, this.Message);
      //  this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.alertSuccess = true;
      },
      err => {
        this.type = 'error';
        this.Message = err.error.message;  //'form Invalido - Login non verificabile ';
        this.showNotification(this.type, this.Message);
        this.alertSuccess = false;
      }
    );
  */

    try {
      console.log('onSubmit - step_02'   );
    this.aggiornaAbilitazione(this.abil, this.id);
    console.log('onSubmit - step_03 '  );
    this.type = 'success';
    this.Message = 'abilitazione utente  aggiornata con successo';
    this.showNotification(this.type, this.Message);
    this.isVisible = true;
    this.alertSuccess = true;
  } catch (e) {
    switch(e.status) {
      case 401:
         this.Message = 'email e/o password errati';
         break;
      case 404:
         this.Message = e.error.message;
         break;
      case 500:
        this.Message = 'errore server - contattare amministratore';
        break;
      default:
         this.Message = 'errore non identificato: ' + e.status;
         break;
    }
    this.type = 'error';
    this.showNotification(this.type, this.Message);
  //  messaggio sulla barra
    this.isVisible = true;
    this.alertSuccess = false;
  }

  }


  async aggiornaAbilitazione(abil: Abilitazione, id: number) {

    console.log('aggiornaBilitazione: ' + id);

    let rc = await this.abilitazioneService.update(abil, id).subscribe(
      response => {
          if(response['success']) {
            this.isVisible = true;
            this.alertSuccess = true;
            this.type = 'success';
            this.Message = 'Prodotto aggiornato correttamente';
            this.showNotification(this.type, this.Message);
          }
      },
      error =>
          {
            this.isVisible = true;
            this.alertSuccess = false;
            this.type = 'error';
            this.Message = 'Errore abilitazione funzioni Utente' + '\n' + error.message;
            this.showNotification(this.type, this.Message);
            console.log(error);
          }
    );
  }








}
