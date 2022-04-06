import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faPlusSquare, faSearch } from '@fortawesome/free-solid-svg-icons';
// Service
import { FornitoreService } from './../../../services/fornitore.service';
import { SpesaService } from './../../../services/spesa.service';
import { TstatospesaService } from './../../../services/tstatospesa.service';
import { CtrfuncService } from './../../../services/ctrfunc.service';
// model
import { Fornitore } from '../../../classes/Fornitore';
import { Spesa } from '../../../classes/Spesa';
import { Tstatospesa } from '../../../classes/T_stato_spesa';

import { ActivatedRoute, Router } from '@angular/router';
// per gestire la notifica esito
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-spese',
  templateUrl: './spese.component.html',
  styleUrls: ['./spese.component.css']
})
export class SpeseComponent implements OnInit {

  public isVisible = false;
  public alertSuccess = false;

  public fornitori: Fornitore[] = [];
  public fornitorinull: Fornitore[] = [];
  public fornitore: Fornitore;
  public spese: Spesa[] = [];
  public spesenull: Spesa[] = [];
  public spesa: Spesa;
  public stati: Tstatospesa [] = [];
  public statinull: Tstatospesa [] = [];
  public stato: Tstatospesa ;

  //  @Output('updateFornitore') updateFornitore = new EventEmitter<Fornitore>();

  public title = "elenco Spese";
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


 options = [
    'Tutti',
    'Selettiva'
  ];

  public searchText = '';
  // per paginazone
  p: number = 1;

  public enabledSelect = false;
  public idDayActive = 0;
  public selectedFornitore = 0;
  public selectedStato = 0;

 // per gestione abilitazione funzioni con service Moreno

 public functionUser = '';
 public rotta = '';
 public rottaId = 0;
 public level = 0;

 public totspesePagate = 158.24;
 public totspesedaPagare = 625.75;
 public totspese = 159874;

  public idDspesa = 0;

  constructor(private fornitoreService: FornitoreService,
              private tstatospesaService: TstatospesaService,
              private spesaService: SpesaService,
              private ctrfuncService: CtrfuncService,
              private router: Router,
              private route: ActivatedRoute,
              private notifier: NotifierService) {
                this.notifier = notifier;
              }

  ngOnInit(): void {
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
            this.loadFornitori();
            this.loadStatiSpesa();
            this.loadSpese();
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

  async loadFornitori() {
    let rc = await  this.fornitoreService.getAll().subscribe(
        res => {
            if(res['rc'] === 'ok') {
              this.fornitori = res['data'];
            }
            if(res['rc'] === 'nf') {
              this.fornitori = this.fornitorinull;
            }
         },
        error => {
           alert('loadFornitori - errore: ' + error.message);
           console.log(error);
           this.Message = error.message;
           this.alertSuccess = false;
        });
  }

async  loadSpese() {
  this.trovatoRec = false;
  this.nRec = 0;
  this.isVisible = true;
  let rc = await  this.spesaService.getAll().subscribe(
        res => {
          if(res['rc'] === 'ok') {
            this.spese = res['data'];
            this.idDspesa = 999;
            this.totali(this.idDspesa);
            this.nRec = res['number'];
            this.trovatoRec = true;
            this.Message = 'Situazione Attuale';
            this.alertSuccess = true;
          }
          if(res['rc'] === 'nf') {
            this.spese = this.spesenull;
            this.nRec = 0;
            this.trovatoRec = false;
            this.Message = 'Nessuna Spesa presente';
            this.alertSuccess = false;
          }
       },
      error => {
         alert('loadCategorie - errore: ' + error.message);
         console.log(error);
         this.Message = error.message;
         this.alertSuccess = false;
      });
  }

  async  loadStatiSpesa() {

    let rc = await  this.tstatospesaService.getAll().subscribe(
          res => {
            if(res['rc'] === 'ok') {
              this.stati = res['data'];
            }
            if(res['rc'] === 'nf') {
              this.stati = this.statinull;
            }
          },
        error => {
           alert('loadTipologie - errore: ' + error.message);
           console.log(error);
           this.Message = error.message;
           this.alertSuccess = false;
        });
    }






// imposto il filtro di ricerca dei fedeli
onSelectionChange(tipo: string)   {

  switch (tipo) {
              case 'Tutti':
              this.enabledSelect = false;
              this.loadSpese();
           //   this.router.navigate(['getpersoneforMessa', this.messa.id]);
              break;
              case 'Selettiva':
                this.enabledSelect = true;
                break;

              default:
              alert('Scelta errata \n ricerca non possibile');
              break;
     }

  }
     // id = 999  spese totali -------   !== 999 spese per fornitore

     async totali(id: number) {
      let rc = await  this.spesaService.getCountbyspesa(id).subscribe(
        res => {
          if(res['rc'] === 'ok') {
            console.log('totali: --- totale: ' + JSON.stringify(res['totale']));
            this.totspesePagate = res['pagate'];
            this.totspesedaPagare =  res['dapagare'];
            this.totspese =  res['totale'];
          }
          if(res['rc'] === 'nf') {
            this.totspesePagate = 0;
            this.totspesedaPagare = 0;
            this.totspese =  0;
          }
        },
      error => {
         alert('totali - errore: ' + error.message);
         console.log(error);
         this.Message = error.message;
         this.alertSuccess = false;
      });
    }



  ricercaProdotti() {

    alert('da fare');
    /*
    if(this.tipoRichiesta == '?') {
        this.validSearch = false;
        alert('effettuare prima la selezione del fornitore per Menuù ,\n ricerca non possibile');
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


      onSelectedFornitore(selectedValue: number) {
        //  alert('selezionato: ' + selectedValue);
          if(selectedValue ===  999 || 0) {
            this.type = 'error';
            this.Message = 'selezione non corrette';
            this.showNotification(this.type, this.Message);
            this.alertSuccess = false;
            this.isVisible = true;
            return;
         } else {
          this.selectedStato = 0;
          this.selectedFornitore = selectedValue;
          console.log('fornitore selezionata: ' + this.selectedFornitore);
          this.loadSpesebyFornitore(this.selectedFornitore);
         }

     }

    onSelectedStato(selectedValue: number) {
        console.log('onSelectedStato ' + selectedValue);
        if(selectedValue ==  999 || 0) {
          this.type = 'error';
          this.Message = 'selezione non corrette';
          this.showNotification(this.type, this.Message);
          this.alertSuccess = false;
          this.isVisible = true;
          return;
       } else {
        this.selectedFornitore = 0;
        this.selectedStato = selectedValue;
        console.log('stato selezionato: ' + this.selectedStato);
        this.loadSpesebyStato(this.selectedStato);
       }

   }

   async  loadSpesebyFornitore(selected: number) {
      console.log('loadSpesebyFornitore -- appena entrato ' + selected);
      this.nRec = 0;
      this.isVisible = true;
      this.searchText = '';
      let rc = await  this.spesaService.getSpesaforFornitore(selected).subscribe(
           res => {
               if(res['rc'] === 'ok') {
                this.spese = res['data'];
                this.totali(selected);
                this.nRec = res['number'];
                this.Message = 'situazione attuale';
                this.alertSuccess = true;
               }
               if(res['rc'] === 'nf') {
                this.spese = this.spesenull;
                this.nRec = res['number'];
                this.Message = 'Nessuna spesa per il fornitore selezionato';
                this.alertSuccess = false;
               }
          },
          error => {
             alert('loadSpesebyFornitore - errore: ' + error.message);
             console.log(error);
             this.Message = error.message;
             this.alertSuccess = false;
          });
   }


   async  loadSpesebyStato(selected: number) {
      console.log('loadSpesebyStato -- appena entrato ' + selected);
      this.nRec = 0;
      this.isVisible = true;
      this.searchText = '';
      let rc = await  this.spesaService.getSpesaforStato(selected).subscribe(
           res => {
               if(res['rc'] === 'ok') {
                this.spese = res['data'];
                this.idDspesa = 999;
                this.totali(this.idDspesa);  // imposto il fornitore a 999 per leggere tutti
                this.nRec = res['number'];
                this.Message = 'situazione attuale';
                this.alertSuccess = true;
               }
               if(res['rc'] === 'nf') {
                this.spese = this.spesenull;
                this.nRec = res['number'];
                this.Message = 'Nessuna spesa per lo stato selezionato';
                this.alertSuccess = false;
               }
          },
          error => {
             alert('loadSpesebyStato - errore: ' + error.message);
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
  this.router.navigate(['spesa/new']);
}


onDeleteSpesa(esito: string) { // ho effettuato la cancellazione quindi devo rifare l'elenco

  console.log('onDeletedSpesa ----- ' + esito );

  if(esito === 'Dspesa' ) {  // valore impostato dal figlio in fase di cancellazione
    if(this.enabledSelect === false) { // cliente loggato che visualizza le proprie prenotazioni
      this.loadSpese();
    } else {
        if(this.selectedFornitore > 0) {
          this.loadSpesebyFornitore(this.selectedFornitore);
        }
        if(this.selectedStato > 0) {
          this.loadSpesebyStato(this.selectedStato);
        }
    }
  }

  if(esito === 'errorDspesa') {  // valore impostato dal figlio in fase di cancellazione

    this.isVisible = true;
    this.alertSuccess = false;
    this.type = 'error';
    this.Message = 'Spesa non cancellabile - presenti legami con altre tabelle';
    this.showNotification(this.type, this.Message);
  }


 }


}


