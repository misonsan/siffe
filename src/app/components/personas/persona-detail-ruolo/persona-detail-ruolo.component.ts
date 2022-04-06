import { Component, OnInit } from '@angular/core';
// classe model
import { Persona } from '../../../classes/Persona';
import { Giornata } from '../../../classes/Giornata';
import { Truoloday } from '../../../classes/T_ruolo_day';
import { faPlusSquare, faSearch, faSave, faUserEdit, faMinus, faPlus, faWindowClose, faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
// services
import { GiornataService } from './../../../services/giornata.service';
import { PersonaService } from './../../../services/persona.service';
import { TruoloDayService} from './../../../services/truolo-day.service';
import { CtrfuncService } from './../../../services/ctrfunc.service';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-persona-detail-ruolo',
  templateUrl: './persona-detail-ruolo.component.html',
  styleUrls: ['./persona-detail-ruolo.component.css']
})
export class PersonaDetailRuoloComponent implements OnInit {

  public title = 'gestione prodotti a Menu  prodotto-detail-menu works';

  // icone
    faPlusSquare = faPlusSquare;
    faSearch = faSearch;
    faSave = faSave;
    faUserEdit = faUserEdit;
    faMinus = faMinus;
    faPlus = faPlus;
    faWindowClose = faWindowClose;
    faHandPointLeft = faHandPointLeft;


    // variabili per editazione messaggio
    public alertSuccess = false;
    public savechange = false;
    public isVisible = false;

    public nRecMan = 0;
    public nRec = 0;
    public trovatoRec = false;
    public Message = '';
    public isSelected = false;

    public saveValueStd: boolean;
    public lastNumber = 0;
    public fase = '';


    public isLoading = false;
    public fieldVisible = false;
    public messageTest1  = 'Operazione conclusa correttamente ';

    // variabili per visualizzazione messaggio di esito con notifier
    public type = '';
    public message = '';

    public statoStampa = '';

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


    public href = '';
    public idpassed = 0;

    public functionInqu =  false;
    public functionEdit = false;
    public functionEdits = false;
    public functionNew = false;

    // funzioni di navigazione
    public navigateNew = 'new';
    public navigateInqu = 'inqu';
    public navigateEdit = 'edit';
    public navigateEdits = 'edits';

    public functionUser = '';

    public statoModulo  = '?';
    public ricercaIniziale = '';

    closeResult = '';

    public level = 0;
    public nRecord = 0;
    public enabledFunc = false;
    public rotta = '';
    public rottaId = 0;
    public rottaIdManif = 0;
    public rottaFunz = '';
    public rottaTipo = '';

  // variabili per editazione messaggio

  public Message1 = '';
  public Message2 = '';
  public Message3 = '';
  public Message1err = 'Contattare il gestore dell applicazione.';

  public isValid = false;
  public idManif = 0;
  public idGiornata = 0;

  // per gestione abilitazione funzioni con service Moreno

  public functionUrl = '';

  public searchInqu = 'Inqu';
  public searchEdit = 'Edit';
  public searchEdits = 'Edits';
  public searchNew = 'New';

  public functionUrlUp = '';
  public functionUserUp = ''


 // ---------------------  personalizzazioni componente


 public persona: Persona;
 public giornata: Giornata;
 public ruoliday: Truoloday[] = [];
 public idPersona = 0;

 // variabili per editazione messaggio



 public condizioneMenu = '';

 public prodottoaMenuSelected = '';
 public selectedCorrect = false;


 public aMenuSearch = '';
 public elabledCommande = false;


 public pathImage =  'assets/images/photoProducts/';
 public displayedImage = '';

 public selectProdMenu = '';
 public attuale = '';
 public selectaMenu = '';

public routeGiornata = '';
public ruoloUnico = false;

 constructor(private personaService: PersonaService,
             private truoloDayService: TruoloDayService,
             private giornataService: GiornataService,
             private ctrfuncService: CtrfuncService,
             private route: ActivatedRoute,
             private router: Router,
             private datePipe: DatePipe,
             private notifier: NotifierService) {
                this.notifier = notifier;
              }

              ngOnInit(): void {

                console.log('Prodotto-detail-Ruolo- sono in oninit ');

                this.checkFunctionbylevel();

              }
// 'giornata/ValoriCassa/E



checkFunctionbylevel() {
  //  ----- parte comune a tutti i moduli
 this.rotta = this.route.snapshot.url[0].path;
 this.level = parseInt(localStorage.getItem('user_ruolo'));
 this.functionUrl = this.route.snapshot.url[2].path;
 this.rottaTipo = this.route.snapshot.url[1].path;

 if(this.route.snapshot.url[1].path !== 'new') {
   this.rottaId =  parseInt(this.route.snapshot.url[3].path);
 } else {
   this.rottaId =  0;
 }


//  console.log('Rotta: ' + JSON.stringify(this.route.url));
 console.log('Rotta: ' + this.route.url);

 console.log('frontend - checkFunctionbylevel -- step_01');
 console.log('frontend - checkFunctionbylevel -- functionUrl:  --> ' + this.functionUrl);
 console.log('frontend - checkFunctionbylevel -- functionUrl:  --> ' + this.rottaTipo);
 console.log('frontend - checkFunctionbylevel -- rottaId ' + this.rottaId);




 this.ctrfuncService.checkFunctionbylevelDetail(this.rotta, this.level, this.functionUrl).subscribe(
   response =>{

     console.log('frontend - checkFunctionbylevel -- step_02 ' + response['rc']);

     if(response['rc'] === 'ko') {
       this.isVisible = true;
       this.alertSuccess = false;
       this.type = 'error';
       this.Message = response['message'];
       this.showNotification(this.type, this.Message);
       return;
     }
     if(response['rc'] === 'ok') {
       this.functionUser = response['data'];
//  ----- fine parte comune a tutti i moduli

  // caricamento di eventuali tabelle per select

 //  parte personalizzabile
       console.log('frontend - checkFunctionbylevelDetail - funzione determinata: ' + this.functionUser);
    //   console.log('messaggio: ' + response['message']);

       this.functionInqu =  false;
       this.functionEdit = false;
       this.functionEdits = false;
       this.functionNew = false;

       if(this.level === -1) {
        if(this.functionUser === this.searchEdit) {
          this.functionEdit = true;
        }
        if(this.functionUser === this.searchEdits) {
          this.functionEdits = true;
        }
        if(this.functionUser === this.searchNew) {
          this.functionNew = true;
        }
       } else {
        if(this.functionUser === this.searchInqu) {
          this.functionInqu = true;
        }
       }

       console.log('dopo test su funzione determinata - functionUser ' + this.functionUser);
       console.log('functionInqu ' + this.functionInqu);
       console.log('functionNew ' + this.functionNew);
       console.log('functionEdit ' + this.functionEdit);
       console.log('functionEdits' + this.functionEdits);


       this.isVisible = true;
       this.alertSuccess = true;
//  leggo la giornata

       this.idGiornata = +localStorage.getItem('idGiornata');
       console.log('id Giornata recuperato: ' + this.idGiornata);


       if(this.functionNew) {
         // non ci sarà mai
         this.persona = new Persona();
         this.persona.key_utenti_operation = +localStorage.getItem('id');
         this.title = 'Inserimento Prodotto';
         this.fase = 'N';
         this.Message = `Inserire i dati del Prodotto`;
       } else {
           this.route.paramMap.subscribe(p => {
             this.idPersona = +p.get('id');


             // -------  leggo i dati della giornata
             this.loadGiornata(this.idGiornata);

             this.loadRuoliday();

             this.loadPersona(this.idPersona);

             // modello modificato - possibile solo aggiornamento della cassa
             /*
             if(this.functionEdit || this.functionEdits) {
               this.title = 'Situazione Cassa Giornaliera';
               this.fase = 'M';
              } else {
               this.title = 'Visualizzazione Cassa Giornaliera';
               this.fase = 'I';
              }  */
             this.Message = 'Situazione Attuale Persona ';
          });

           //  fine parte personalizzabile
     }
       this.type = 'success';
       this.showNotification(this.type, this.Message);
    }
   },
   error =>
       {
         this.isVisible = true;
         this.alertSuccess = false;
         this.type = 'error';
         this.Message = 'Errore checkFunctionbylevel' + '\n' + error.message;
         this.showNotification(this.type, this.Message);
         console.log(error);
       });

}
 async loadPersona(id: number) {

  console.log(`loadGiornata - appena entrato  ` + id);
  let rc = await this.personaService.getPersona(id).subscribe(
   resp => {

         console.log(`loadGiornata: ----------------------->  ${JSON.stringify(resp['data'])} `);
         if(resp['rc'] === 'ok') {
          this.persona = resp['data'];
           }
         if(resp['rc'] === 'nf') {
            this.persona = new Persona();
            this.isVisible = true;
            this.alertSuccess = false;
            this.type = 'error';
            this.Message = resp['message'];
            this.showNotification(this.type, this.Message);
          }
      },
   error => {
        alert('sono in loadGiornata');
        this.isVisible = true;
        this.alertSuccess = false;
        console.log('loadGiornata - errore: ' + error);
        this.type = 'error';
        this.Message = error.message;
        this.alertSuccess = false;
        this.showNotification(this.type, this.Message);
      });
}


async loadRuoliday() {
  let rc = await this.truoloDayService.getAll().subscribe(
    resp => {
           this.ruoliday = resp['data'];
       },
    error => {
         alert('sono in loadGiornata');
         this.isVisible = true;
         this.alertSuccess = false;
         console.log('loadGiornata - errore: ' + error);
         this.type = 'error';
         this.Message = error.message;
         this.alertSuccess = false;
         this.showNotification(this.type, this.Message);
       });

}

async loadGiornata(id: number) {

  console.log(`loadGiornata - appena entrato  ` + id);
  let rc = await this.giornataService.getGiornata(id).subscribe(
   resp => {

         console.log(`loadGiornata: ----------------------->  ${JSON.stringify(resp['data'])} `);
         if(resp['rc'] === 'ok') {
          this.giornata = resp['data'];

           }
      },
   error => {
        alert('sono in loadGiornata');
        this.isVisible = true;
        this.alertSuccess = false;
        console.log('loadGiornata - errore: ' + error);
        this.type = 'error';
        this.Message = error.message;
        this.alertSuccess = false;
        this.showNotification(this.type, this.Message);
      });
}

async selectedRuolo(selectedValue: number) {
  console.log('sono in ---------------->   selectedRuolo: ' + selectedValue);
  if(selectedValue == 999) {
     this.selectedCorrect = false;
     this.isVisible = true;
     this.alertSuccess = false;
     this.type = 'error';
     this.Message = 'Effettuare la selezione di un ruolo operativo' + '\n' + 'o impostare NON Operativo';
     this.showNotification(this.type, this.Message);
    } else {
      this.ruoloUnico = false;
      if(selectedValue == -1 ||
        selectedValue == 1 ||
        selectedValue == 2 ||
        selectedValue == 3 ||
        selectedValue == 4) {
          this.ruoloUnico = true;
        }
      if(this.ruoloUnico === true) {
        console.log('---------------  trovato univocità   ');
        let rc = await this.personaService.getPersoneforRuolo1(selectedValue).subscribe(
          resp => {
               if(resp['rc'] === 'ok') {
                this.isVisible = true;
                this.type = 'error';
                this.Message = 'Ruolo già assegnato - '  + '\n' + 'effettuare nuova selezione';
                this.alertSuccess = false;
                this.showNotification(this.type, this.Message);
                return;
               }
            },
          error => {
              alert('sono in verifica univocità ruolo');
              this.isVisible = true;
              this.alertSuccess = false;
              console.log('Salva Verifica univocità Ruolo - errore: ' + error);
              this.type = 'error';
              this.Message = error.message;
              this.alertSuccess = false;
              this.showNotification(this.type, this.Message);
        });
      }
      console.log('------ posso registrare  ' + selectedValue);
      this.Message = 'Selezione Corretta - Conferma con Salva';
      this.isVisible = true;
      this.alertSuccess = true;
      this.persona.idRuolo_Day = selectedValue;
      this.selectedCorrect = true;
    }
  }


/**
* Show a notification
*
* @param {string} type    Notification type
* @param {string} message Notification message
*/

showNotification( type: string, message: string ): void {
// alert('sono in showNot - ' + message);
 this.notifier.notify( type, message );
 console.log(`sono in showNotification  ${type}`);
//   alert('sono in notifier' + message);
}


/*

onSelectionChangeCombo(menu: string)   {

 // const menu1 = menu.substring(0,1);

  console.log('onSelectionChange - selezione: ' + menu);

  if(menu === '?') {
    this.attuale = '';
    alert('effettuale una scelta corretta');
    return;
  }

  if(menu === 'S') {
    this.attuale = 'Prodotto a Menu';
   // this.selectProdMenu = "Prodotto a Menu";
  }
  if(menu === 'N') {
     this.attuale = '** Prodotto NON a Menu **';
  //  this.selectProdMenu ="** Prodotto NON a Menu **";
  }
  this.prodotto.aMenu = menu;

}

*/

getColor(aMenu) {
  switch (aMenu) {
    case '*':
      return 'green';
    case 'S':
      return 'yellow';
    case 'N':
      return 'red';
  }
}

getColorbg(aMenu) {
  switch (aMenu) {
    case '*':
      return 'yellow';
    case 'S':
      return 'black';
    case 'N':
      return 'yellow';
  }
}

/*
onSelectionChange(tipo: string)   {

  // alert('onSelectionChange - Tipo Richiesta: ' + tipo);

   this.selectaMenu = tipo.substring(0, 1);

   if(this.selectaMenu === 'A') {
    this.prodotto.aMenu = 'S';
    this.attuale = 'Prodotto a Menu';
  }
   if(this.selectaMenu === 'N') {
     this.prodotto.aMenu = 'N';
     this.attuale = '** Prodotto NON a Menu **';
  }

}
*/

backToPersone() {

  this.routeGiornata = '/giornata/Pers/' + this.functionUser + '/' + this.giornata.id + '/' + this.giornata.idManifestazione;
  localStorage.removeItem("SanfraGiornata");
  localStorage.setItem("SanfraGiornata", this.routeGiornata);
  this.router.navigate([`${this.routeGiornata}`]);

}


async Salva() {

 console.log('salva - sto aggiornando il ruoloday: ' + this.persona.idRuolo_Day);
 // alert('selectedRuolo - Ho selezionato: ' + selectedValue);
 if(this.persona.idRuolo_Day == 0) {
    this.selectedCorrect = false;
    this.isVisible = true;
    this.alertSuccess = false;
    this.type = 'error';
    this.Message = 'Effettuare la selezione di un ruolo operativo \n o impostare NON Operativo';
    this.showNotification(this.type, this.Message);
  } else {
    let rc = await this.personaService.updatePersona(this.persona).subscribe(
      resp => {
           if(resp['rc'] === 'ok') {
            this.type = 'success';
            this.Message = 'Aggiornato ruolo giornaliero persona';
            this.alertSuccess = true;
            this.backToPersone();
           }
        },
      error => {
          alert('sono in AggiornaRuolo');
          this.isVisible = true;
          this.alertSuccess = false;
          console.log('AggiornaRuolo - errore: ' + error);
          this.type = 'error';
          this.Message = error.message;
          this.alertSuccess = false;
          this.showNotification(this.type, this.Message);
    });
  }


 }







}
