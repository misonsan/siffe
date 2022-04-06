import { Component, EventEmitter, OnInit, Output } from '@angular/core';


import { faPlusSquare, faSearch } from '@fortawesome/free-solid-svg-icons';
// Service
import { PersonaService } from './../../../services/persona.service';
import { TstatoutenteService } from './../../../services/tstatoutente.service';
import { TruoloDayService } from './../../../services/truolo-day.service';
import { CtrfuncService } from './../../../services/ctrfunc.service';
// model
import { Persona } from '../../../classes/Persona';
import { TstatoUtente } from '../../../classes/T_stato_utente';
import { Truoloday } from '../../../classes/T_ruolo_day';



import { ActivatedRoute, Router } from '@angular/router';
// per gestire la notifica esito
import { NotifierService } from 'angular-notifier';



@Component({
  selector: 'app-persone',
  templateUrl: './persone.component.html',
  styleUrls: ['./persone.component.css']
})
export class PersoneComponent implements OnInit {

  public isVisible = false;
  public alertSuccess = false;

  public persone: Persona[] = [];
  public personenull: Persona[] = [];
  public persona: Persona;

  public stato: TstatoUtente;
  public stati: TstatoUtente[] = [];
  public statinull: TstatoUtente[] = [];

  public ruolo: Truoloday;
  public ruoli: Truoloday[] = [];
  public ruolinull: Truoloday[] = [];


  @Output('updatePersona') updatePersona = new EventEmitter<Persona>();

  public title = "elenco Persone";
  public Message = '';
  public type = '';
  public message = '';
  public trovatoRec = false;
  public nRec = 0;
  // icone
  faPlusSquare = faPlusSquare;
  faSearch = faSearch;

  public tipoRichiesta = '?';
  public validSearch = false;
  public flagMenu = '';

 options = [
    'Tutti',
    'In Servizio',
    'Ut. Commanda',
    'Selettiva'
  ];

  public searchText = '';
  // per paginazone
  p: number = 1;

  public enabledSelect = false;
  public idDayActive = 0;
  public selectedRuolo = 0;
  public selectedStato = 0;

 // per gestione abilitazione funzioni con service Moreno

 public functionUser = '';
 public rotta = '';
 public rottaId = 0;
 public level = 0;

  constructor(private personaService: PersonaService,
              private ctrfuncService: CtrfuncService,
              private tstatoutenteService: TstatoutenteService,
              public truoloDayService: TruoloDayService,
              private router: Router,
              private route: ActivatedRoute,
              private notifier: NotifierService) {
                this.notifier = notifier;
              }

  ngOnInit(): void {
    this.tipoRichiesta = 'T';


    this.checkFunctionbylevel();

  }

  checkFunctionbylevel() {
    // this.enabledFunc = false;
     //   parte pubblica
    this.rotta = this.route.snapshot.url[0].path;
    this.level = parseInt(localStorage.getItem('user_ruolo'));
    console.log('checkFunctionbylevel -  rotta: ' + this.rotta + ' level: ' + this.level);

    // effettuo la lettura su abilfunctione per vedere la funzione abilitata per il modulo e il profilo
    this.ctrfuncService.getfuncbyProfilo(this.level, this.rotta).subscribe(
      res =>{
       console.log(res,'res-->');
       if(res['rc'] === 'ko')  {
        this.type = 'error';
        this.Message = res['message'];
        this.showNotification(this.type, this.Message);
        return;
       }
       if(res['rc'] === 'ok') {
          if(res['number'] !== 1) {
            this.type = 'error';
            this.Message = 'Modulo non ancona habilitation';
            this.showNotification(this.type, this.Message);
          }  else {
            this.functionUser = res['data'];
            //   parte pubblica   --  fine
            console.log('checkFunctionbylevel - funzione determinata: ' + this.functionUser);
            // parte personalizzata
            this.loadPersone();
            this.loadRuoliPersone();
            this.loadStatiPersone();
          }
        }
     },
     error => {
       alert('Users  -- loadUsers - errore: ' + error.message);
       console.log(error);
       this.type = 'error';
       this.Message = error.message;
       this.alertSuccess = false;
    });

  }

  async loadPersone() {

    //alert('Manifestazioni   -- loadManifestazioni :  inizio ');
    this.trovatoRec = false;
    this.nRec = 0;
    this.isVisible = true;
    await  this.personaService.getPersone().subscribe(
      // sentire hidran per lettura particolare
     // this.fedeleService.getFedeliforMessa(id).subscribe(
        res => {
            this.persone = res['data'];
            this.nRec = res['number'];
            this.trovatoRec = true;
            this.Message = 'Situazione Attuale';
            this.alertSuccess = true;
       //     alert('Manifestazioni   -- loadManifestazioni :  fine ok ');
         },
        error => {
           alert('Prodotti  -- loadPersone - errore: ' + error.message);
           console.log(error);
           this.Message = error.message;
           this.alertSuccess = false;
        });
  }


 async loadRuoliPersone() {
    this.trovatoRec = false;
    this.nRec = 0;
    this.isVisible = true;
    await  this.truoloDayService.getAll().subscribe(
   //
        res => {
        console.log('LoadRuoliPersone - ' + JSON.stringify(res['data']));
          if(res['rc'] === 'ok') {
            this.ruoli = res['data'];
            this.nRec = res['number'];
            this.trovatoRec = true;
          }
          if(res['rc'] === 'nf') {
            this.ruoli = this.ruolinull;
            this.nRec = 0;

          }

         },
        error => {
           alert('loadRuoliPersone - errore: ' + error.message);
           console.log(error);
           this.Message = error.message;
           this.alertSuccess = false;
        });
  }


async  loadStatiPersone() {
    this.trovatoRec = false;
    this.nRec = 0;
    this.isVisible = true;
    await  this.tstatoutenteService.getAll().subscribe(

      res => {
      console.log('loadStatiPersone - ' + JSON.stringify(res['data']));
          if(res['rc'] === 'ok') {
            this.stati = res['data'];

          }
          if(res['rc'] === 'nf') {
            this.stati = this.statinull;


          }

         },
        error => {
           alert('loadStatiPersone - errore: ' + error.message);
           console.log(error);
           this.Message = error.message;
           this.alertSuccess = false;
        });
  }


// filtro
onSelectionChange(tipo: string)   {

  switch (tipo) {
              case 'Tutti':
              this.enabledSelect = false;
              this.loadPersone();
           //   this.router.navigate(['getpersoneforMessa', this.messa.id]);
              break;
              case 'Selettiva':
                this.enabledSelect = true;
                break;
              case 'In Servizio':
                this.enabledSelect = false;
                this.loadPersoneinServizio();
                break;
              case 'Ut. Commanda':
                this.enabledSelect = false;
                this.loadPersoneutCommanda();
                break;
              default:
              alert('Scelta errata \n ricerca non possibile');
              break;
     }
  }

async  loadPersoneinServizio() {
    this.nRec = 0;
    this.isVisible = true;
    this.searchText = '';
    let rc = await  this.personaService.getPersoneinServizio().subscribe(
         res => {
             if(res['rc'] === 'ok') {
              this.persone = res['data'];
              this.nRec = res['number'];
              this.Message = 'situazione attuale';
              this.alertSuccess = true;
             }
             if(res['rc'] === 'nf') {
              this.persone = this.personenull;
              this.nRec = res['number'];
              this.Message = 'Nessun persona in servzio';
              this.alertSuccess = false;
             }
        },
        error => {
           alert('loadPersoneinServizio - errore: ' + error.message);
           console.log(error);
           this.Message = error.message;
           this.alertSuccess = false;
        });
  }

async  loadPersoneutCommanda() {
  this.nRec = 0;
  this.isVisible = true;
  this.searchText = '';
  let rc = await  this.personaService.getPersoneutCommanda().subscribe(
       res => {
           if(res['rc'] === 'ok') {
            this.persone = res['data'];
            this.nRec = res['number'];
            this.Message = 'situazione attuale';
            this.alertSuccess = true;
           }
           if(res['rc'] === 'nf') {
            this.persone = this.personenull;
            this.nRec = res['number'];
            this.Message = 'Nessun persona ha utilizzato Commande';
            this.alertSuccess = false;
           }
      },
      error => {
         alert('loadPersoneutCommanda - errore: ' + error.message);
         console.log(error);
         this.Message = error.message;
         this.alertSuccess = false;
      });
  }



  ricercaPersone() {

    alert('da fare');
    /*
    if(this.tipoRichiesta == '?') {
        this.validSearch = false;
        alert('effettuare prima la selezione del persona per Menuù ,\n ricerca non possibile');
        return;
        }  else {
          alert('la scelta della ricerca é: ' + this.tipoRichiesta);
          switch (this.tipoRichiesta) {
                  case 'T':
                  this.loadProdotti();
               //   this.router.navigate(['getpersoneforMessa', this.messa.id]);
                  break;
                  case 'N':
                  case 'A':
                    this.flagMenu = this.tipoRichiesta;
                    this.loadProdottibyMenu(this.tipoRichiesta);
                    break;
                  default:
                  alert('Scelta errata \n ricerca non possibile');
                  break;
            }
          }  */
      }

      onSelectPersona(persona: Persona){

        this.updatePersona.emit(persona);

       }


       onSelectedRuolo(selectedValue: number) {
        //  alert('selezionato: ' + selectedValue);
          if(selectedValue ==  999) {
            this.type = 'error';
            this.Message = 'selezione non corrette';
            this.showNotification(this.type, this.Message);
            this.alertSuccess = false;
            this.isVisible = true;
            return;
         } else {
          this.selectedStato = 0;
          this.selectedRuolo = selectedValue;
          console.log('ruolo selezionata: ' + this.selectedRuolo);
          this.loadPersonebyRuolo(selectedValue);
         }

     }

     async  loadPersonebyRuolo(selected: number) {
      // console.log('loadProdottibyTipologia -- appena entrato');
        this.nRec = 0;
        this.isVisible = true;
        this.searchText = '';
        let rc = await  this.personaService.getPersoneforRuolo1(selected).subscribe(
             res => {
                 if(res['rc'] === 'ok') {
                  this.persone = res['data'];
                  this.nRec = res['number'];
                  this.Message = 'situazione attuale';
                  this.alertSuccess = true;
                 }
                 if(res['rc'] === 'nf') {
                  this.persone = this.personenull;
                  this.nRec = res['number'];
                  this.Message = 'Nessun persona per il Ruolo selezionato';
                  this.alertSuccess = false;
                 }
            },
            error => {
               alert('loadProdottibyRuolo - errore: ' + error.message);
               console.log(error);
               this.Message = error.message;
               this.alertSuccess = false;
            });
     }


   onSelectedStato(selectedValue: number) {
    //  alert('selezionato: ' + selectedValue);
      if(selectedValue ==  999) {
        this.type = 'error';
        this.Message = 'selezione non corrette';
        this.showNotification(this.type, this.Message);
        this.alertSuccess = false;
        this.isVisible = true;
        return;
     } else {
        this.selectedRuolo = 0;
        this.selectedStato = selectedValue;
        console.log('stato selezionata: ' + this.selectedStato);
        this.loadPersonebyStato(selectedValue);
     }

 }


    async  loadPersonebyStato(selected: number) {
      // console.log('loadProdottibyTipologia -- appena entrato');
        this.nRec = 0;
        this.isVisible = true;
        this.searchText = '';
        let rc = await  this.personaService.getPersoneforStato(selected).subscribe(
             res => {
                 if(res['rc'] === 'ok') {
                  this.persone = res['data'];
                  this.nRec = res['number'];
                  this.Message = 'situazione attuale';
                  this.alertSuccess = true;
                 }
                 if(res['rc'] === 'nf') {
                  this.persone = this.personenull;
                  this.nRec = res['number'];
                  this.Message = 'Nessun persona per lo Stato selezionato';
                  this.alertSuccess = false;
                 }
            },
            error => {
               alert('loadProdottibyStato - errore: ' + error.message);
               console.log(error);
               this.Message = error.message;
               this.alertSuccess = false;
            });
     }

/*
   Show a notification

   @param {string} type Notification type
   @param {string} message Notification message
*/

showNotification( type: string, message: string ): void {
  // alert('sono in showNot - ' + message);
  this.notifier.notify( type, message );
  console.log(`sono in showNotification  ${type}`);
  }

  Nuovo() {
  this.router.navigate(['persona/new']);
  }


  onDeletePersona(esito: string) { // ho effettuato la cancellazione quindi devo rifare l'elenco

  console.log('onDeletedPersona ----- ' + esito );

  if(esito === 'Dpersona' ) {  // valore impostato dal figlio in fase di cancellazione
    if(this.enabledSelect === false) { // cliente loggato che visualizza le proprie prenotazioni
      this.loadPersone();
    } else {
        if(this.selectedRuolo > 0) {
          this.loadPersonebyRuolo(this.selectedRuolo);
        }
        if(this.selectedStato > 0) {
          this.loadPersonebyStato(this.selectedStato);
        }
    }
  }

  if(esito === 'errorDpersona') {  // valore impostato dal figlio in fase di cancellazione

    this.isVisible = true;
    this.alertSuccess = false;
    this.type = 'error';
    this.Message = 'Persona non cancellabile - presenti legami con altre tabelle';
    this.showNotification(this.type, this.Message);
  }

}


}
