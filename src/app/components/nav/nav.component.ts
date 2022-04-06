
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faUserPlus, faUserFriends, faUser, faUserCheck } from '@fortawesome/free-solid-svg-icons';
// classes
import { User } from '../../classes/User';
import { Userlevel } from '../../classes/UserLevel';
import { Giornata } from '../../classes/Giornata';
// import { Manifestazione } from '../../classes/Manifestazione';
// services
import { AuthService } from './../../services/auth.service';
import { UserlevelService } from './../../services/userlevel.service';
import { GiornataService } from './../../services/giornata.service';
// import { ManifestazioneService } from './../../services/manifestazione.service';
// import { Giornata } from './../../classes/Giornata';
// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Output() onNewUser = new EventEmitter();

  public isUserLoggedIn = false;
  faUserPlus = faUserPlus;
  faUserFriends = faUserFriends;
  faUser = faUser;
  faUserCheck = faUserCheck;

  public showMenu = true;    // variabile per impostare la visualizzazione della barra  - soluzione puro Angular

  public isCollapsed = true;  // variabile per soluzione con ngbootstrap
  public username: string;

  titolo = "Sanfra in Festa ....  ";
  anno = 2020;

  public isAbilityBevande = false;
  public isAbilityCucina = false;
  public isAbilityCassa = false;

  public user: User;
  public userlevel: Userlevel;
  public giornata: Giornata;
  // public manifestazione: Manifestazione;
  public manifActive = false;



  public ruoloUser: number;
  public functionAdmin: number;
  public ruoloCassa = 1;
  public ruoloCucina = 2;
  public ruoloBevande = 3;
  public dayAbilitato = false;
 // public giornata: Giornata;
  public idDay = 0;
  public funcEnabled = false;
  public userAnonimus = false;
  public profilo = '';
  public routeGiornata = '';
  public idGiornata = 0;
  public idruoloday = 0;

  public type = '';
  public Message = '';


  constructor(private route: Router,
              private auth: AuthService,
              private userlevelService: UserlevelService,
              private giornataService: GiornataService,
              private notifier: NotifierService
             // private manifestazioneService: ManifestazioneService,
             ) {

    this.notifier = notifier;

    // ascolto evento creato in auth.service
    auth.usersignedin.subscribe(
        (user: User)  => {
            this.username = user.username;
            this.ruoloUser = user.idRuolo_Day;
            this.functionAdmin = parseInt(localStorage.getItem('user_ruolo'));
            this.isUserLoggedIn = true;
            // verifico se la giornata è attiva per gestione
            this.dayAbilitato = false;
            this.letturaseGiornataAttiva();
           // window.location.reload();

         /*
            this.abilityButton();

            this.isAbilityBevande = true;
        this.isAbilityCucina = true;
        this.isAbilityCassa = true;   */

          //  alert('nav-costruttore  ---------------------------------  login - ruolo: ' + user.idRuolo_Day);

        }
    );
// l'evento logout non ha come risultato un utente quindi lascio vuoto ()
    auth.userlogout.subscribe(
          ()  => {
              this.username = '';
              this.ruoloUser = 0;
              this.isUserLoggedIn = false;

          }
    );
     // per la registrazione ascolto evento creato in auth.service
    auth.usersignedup.subscribe(
          (user: User)  => {
                this.username = user.cognome;
                this.ruoloUser = user.idRuolo_Day;
                this.isUserLoggedIn = true;
      }
    );
    // per il cambio password ascolto evento creato in auth.service
    auth.userchgpwd.subscribe(
        (user: User)  => {
          this.username = user.cognome;
          this.ruoloUser = user.idRuolo_Day;
          this.isUserLoggedIn = true;
      }
  );

  // alert('nav-Costruttore ---------------------------   prima di abilityButton');
  // this.abilityButton();
 // alert('nav-Costruttore --------    fine ----------------   finito abilityButton');
  }

  ngOnInit() {

    let data = new Date()
    this.anno = data.getFullYear();

    this.verificaseManifestazioneAttiva();

    this.isUserLoggedIn = this.auth.isUserLoggedIn();

      console.log('nav_onInit isUserLoggedIn: ' + this.isUserLoggedIn);


    if(this.isUserLoggedIn)  {
      this.letturaseGiornataAttiva();
      const user = this.auth.getUtente();
      this.loadProfiloLogged(user.idRuolo_Day);
      this.username = user.cognome;
      this.ruoloUser = user.idRuolo_Day;


      // verifico se utente anonimo abilito a visualizzare le proprie prenotazioni
      if(user.idruoloweb === 0) {
        this.userAnonimus = true;
        this.funcEnabled = false;
       } else {
        this.userAnonimus = false;
        this.funcEnabled = false;
        if(user.idRuolo_Day === -1) {
          this.funcEnabled = true;
        }

      }



  //  ------    alert('nav-OnInit - ruolo: ' + this.ruoloUser);
      // recupero da localstorage il livello utente loggato
      this.ruoloUser = parseInt(localStorage.getItem('user_ruolo'));
      console.log('nav-oninit ---ruoloUser:' + this.ruoloUser);

     // this.abilityButton();

    }
  }

   async loadProfiloLogged(idruolo: number) {
      let res = await this.userlevelService.getbyId(idruolo).subscribe(
        response => {
             if(response['number'] !== 0) {
               this.userlevel = response['data'];
               this.profilo = this.userlevel.UserLevelName;
              } else {
                      this.manifActive = false;
             }
          },
        error => {
          alert('nav  -- loadProfiloLogged - errore: ' + error.message);
          console.log(error);
        });
    }


 async verificaseManifestazioneAttiva() {

  // -----   non gestita fino a quando non attivo componente ) ;

  /*
    let res = await this.manifestazioneService.getManifActive().subscribe(
      response => {

         if(response['number'] !== 0) {
           this.manifestazione = response['data'];

           this.manifActive = true;
            } else {
                    this.manifActive = false;
           }
        },
      error => {
        alert('nav  -- verificaseDayAbilitato - errore: ' + error.message);
        console.log(error);
      });
    */
  }

async letturaseGiornataAttiva() {

  // -----   non gestita fino a quando non attivo componente ) ;

  let res = await this.giornataService.getGiornataactive().subscribe(
            response => {
               if(response['number'] === 1) {
                 this.giornata = response['data'];
                 this.idDay = this.giornata.id;
                 this.dayAbilitato = true;
                 localStorage.setItem('idGiornata', String(this.idDay));   // salvo la giornata in Localstorage
          } else {
            this.dayAbilitato = false;
         }
     },
     error => {
        alert('nav  -- verificaseDayAbilitato - errore: ' + error.message);
        console.log(error);
     });

}

 goActivity(ruolo: number) {

  if(this.dayAbilitato === false) {
    alert('Giornata non abilitata - Operatività non eseguibile  xxx');
    return;
  } else {
    this.lancioFunzioni(ruolo, this.idDay);
  }

}


   lancioFunzioni(ruolo: number, idDay: number) {
        console.log('nav - lanciofunzioni:' + ruolo);
        this.idruoloday = +localStorage.getItem('idruoloday');
      // test
     // idDay = 1;
   // ------     alert('nav - lancioFunzioni +++++  Ruolo: --------> ' + ruolo);
        switch (ruolo)  {
          case 1:
              if(ruolo === 1 || this.idruoloday === -1)  {
                this.idGiornata = +localStorage.getItem('idGiornata');
                this.routeGiornata = 'commanda/RegistraAnag/new/' + this.idGiornata;
                console.log('nav - lanciofunzioni: --------- route ' + this.routeGiornata);
                this.route.navigate([`${this.routeGiornata}`]);
              } else {
                this.type = 'error';
                this.Message = 'Utente non abilitato - avvisare amministratore';
                this.showNotification(this.type, this.Message);
              }
              break;
          case 2:
                if(ruolo === 2 || this.idruoloday === -1)  {
                  this.routeGiornata = 'commanda/gestioneCucina';
                  console.log('nav - lanciofunzioni: --------- route ' + this.routeGiornata);
                  this.route.navigate([`${this.routeGiornata}`]);
                } else {
                  this.type = 'error';
                  this.Message = 'Utente non abilitato - avvisare amministratore';
                  this.showNotification(this.type, this.Message);
                }
                break;
          case 3:

                if(ruolo === 3 || this.idruoloday === -1)  {
                  this.routeGiornata = 'commanda/gestioneBevande';
                  console.log('nav - lanciofunzioni: --------- route ' + this.routeGiornata);
                  this.route.navigate([`${this.routeGiornata}`]);
                } else {
                  this.type = 'error';
                  this.Message = 'Utente non abilitato - avvisare amministratore';
                  this.showNotification(this.type, this.Message);
                }
                 // this.route.navigate(['gestione/' +  idDay]);  // normale
                  // test
                  // this.route.navigate(['gestione/' +  idDay]);
                break;
          default:
              alert('nav - identificato utente Guest');
              break;
        }
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



  newUser() {

    this.onNewUser.emit();
  }

  // se utilizziamo la soluzione di Angular Puro
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logout(e) {   // la "e" è l'evento passato da html
    e.preventDefault();
    this.auth.logout();
    this.route.navigate(['login']);
    }

  login(email, pass) {
    this.auth.signIn(email, pass);
  }

  signIn(e) {
    e.preventDefault();
    this.route.navigate(['login']);
  }

  signUp(e) {
    e.preventDefault();
    this.route.navigate(['signup']);
  }


  chgpwd(e)  {
    e.preventDefault()
    this.route.navigate(['chgpwd']);
  }


  gofunctionAdminActivity(activity: string) {

   // alert('nav ---- functionAdmin ----->' + this.functionAdmin);


  //  alert('attività richiesta: ' + activity);
    this.functionAdmin = parseInt(localStorage.getItem('user_ruolo'));
    if(this.functionAdmin != -1) {
      alert('Profilo utente non abilitato - Rivergersi all Amministratore');
      return;
    }
    switch (activity)  {
      case 'manif':
           this.route.navigate(['manif']);
       // this.route.navigate(['commandaw/' +  this.giornata.idManifestazione + '/new']);    // originale

           break;
        case 'commande':
        //   this.route.navigate(['commandeGiornata/' +  this.giornata.idManifestazione]);
           break;
      case 'giormanif':
       //    this.route.navigate(['giormanif/' +  this.giornata.idManifestazione]);
        // mettere link
           break;
      case 'prodotti':
           this.route.navigate(['prodotti']);
           break;
       case 'persone':
           this.route.navigate(['persone']);
    // mettere link
           break;
       case 'tabelle':
            this.route.navigate(['tabellat/']);
     // mettere link
            break;
        default:
            alert('nav - funzione non ancora attivata');
            break;
    }

  }

// ------------------------------------------------------------------------    parti obsolete

/*

  abilityButton() {
      alert('abilityButton: ' + this.ruoloUser);
 /*   this.isAbilityBevande = false;
    this.isAbilityCucina = false;
    this.isAbilityCassa = false;


    switch (this.ruoloUser)  {
      case 1:
        alert('nav - identificato utente per Cassa');
        this.isAbilityCassa = true;
        break;
      case 2:
        alert('nav - identificato utente per Cucina');
        this.isAbilityCucina = true;
        break;
      case 3:
        alert('nav - identificato utente per Bevande');
        this.isAbilityBevande = true;
        break;
      case -1:
        alert('nav - identificato utente amministratore');
        this.isAbilityBevande = true;
        this.isAbilityCucina = true;
        this.isAbilityCassa = true;
        break;
      default:
        alert('nav - identificato utente Guest');
          break;
    }

  }
*/










}
