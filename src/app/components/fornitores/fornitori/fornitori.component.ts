import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faPlusSquare, faSearch } from '@fortawesome/free-solid-svg-icons';
// Service
import { FornitoreService } from './../../../services/fornitore.service';
import { TsettoreService } from './../../../services/tsettore.service';
import { CtrfuncService } from './../../../services/ctrfunc.service';
// model
import { Fornitore } from '../../../classes/Fornitore';
import { Tsettore } from '../../../classes/T_settore';

import { ActivatedRoute, Router } from '@angular/router';
// per gestire la notifica esito
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-fornitori',
  templateUrl: './fornitori.component.html',
  styleUrls: ['./fornitori.component.css']
})
export class FornitoriComponent implements OnInit {

  public isVisible = false;
  public alertSuccess = false;

  public fornitori: Fornitore[] = [];
  public fornitorinull: Fornitore[] = [];
  public fornitore: Fornitore;

  public settori: Tsettore [] = [];
  public settorinull: Tsettore [] = [];
  public settore: Tsettore ;



  @Output('updateFornitore') updateFornitore = new EventEmitter<Fornitore>();

  public title = "elenco Fornitori";
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
    'Selettiva'
  ];

  public searchText = '';
  // per paginazone
  p: number = 1;

  public enabledSelect = false;
  public idDayActive = 0;
  public selectedSettore = 0;

 // per gestione abilitazione funzioni con service Moreno

 public functionUser = '';
 public rotta = '';
 public rottaId = 0;
 public level = 0;

  constructor(private fornitoreService: FornitoreService,
              private tsettoreService: TsettoreService,
              private ctrfuncService: CtrfuncService,
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
            this.loadFornitori();
            this.loadSettori();
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

    //alert('Manifestazioni   -- loadManifestazioni :  inizio ');
    this.trovatoRec = false;
    this.nRec = 0;
    this.isVisible = true;
    let rc = await  this.fornitoreService.getAll().subscribe(

        res => {
            if(res['rc'] === 'ok') {
              this.fornitori = res['data'];
              this.nRec = res['number'];
              this.trovatoRec = true;
              this.Message = 'Situazione Attuale';
              this.alertSuccess = true;
              this.showNotification(this.type, this.Message);
            }
            if(res['rc'] === 'nf') {
              this.fornitori = this.fornitorinull;
              this.nRec = res['number'];
              this.trovatoRec = false;
              this.Message = 'Nessun fornitore presente';
              this.type = 'error';
              this.alertSuccess = false;
              this.showNotification(this.type, this.Message);
            }
       //     alert('Manifestazioni   -- loadManifestazioni :  fine ok ');
         },
        error => {
           alert('Fornitori  -- loadFornitori - errore: ' + error.message);
           console.log(error);
           this.Message = error.message;
           this.alertSuccess = false;
           this.type = 'error';
           this.showNotification(this.type, this.Message);
        }
      )
  }


async  loadSettori() {

  await  this.tsettoreService.getAll().subscribe(
        res => {
          this.settori = res['data'];
       },
      error => {
         alert('loadSettori - errore: ' + error.message);
         console.log(error);
         this.Message = error.message;
         this.alertSuccess = false;
         this.type = 'error';
         this.showNotification(this.type, this.Message);
      }
    )
  }







// imposto il filtro di ricerca dei fedeli
onSelectionChange(tipo: string)   {

  switch (tipo) {
              case 'Tutti':
              this.enabledSelect = false;
              this.loadFornitori();
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
                  this.loadFornitori();
               //   this.router.navigate(['getpersoneforMessa', this.messa.id]);
                  break;
                  case 'N':
                  case 'A':
                    this.flagMenu = this.tipoRichiesta;
                    this.loadFornitoribyMenu(this.tipoRichiesta);
                    break;
                  default:
                  alert('Scelta errata \n ricerca non possibile');
                  break;
            }
          }  */
      }

      onSelectFornitore(fornitore: Fornitore){

        this.updateFornitore.emit(fornitore);

       }



       onSelectedSettore(selectedValue: number) {
        console.log('onSelectedSettore ' + selectedValue);
        if(selectedValue ===  999 ) {
          this.type = 'error';
          this.Message = 'selezione non corrette';
          this.showNotification(this.type, this.Message);
          this.alertSuccess = false;
          this.isVisible = true;
          return;
       } else {
         this.selectedSettore = selectedValue;
         console.log('settore selezionata: ' + this.selectedSettore);
         this.loadFornitoribySettore(this.selectedSettore);
       }

   }


   async  loadFornitoribySettore(selected: number) {
      console.log('loadFornitoribySettore -- appena entrato ' + selected);
      this.nRec = 0;
      this.isVisible = true;
      this.searchText = '';
      let rc = await  this.fornitoreService.getFornitoriforSettore(selected).subscribe(
           res => {
               if(res['rc'] === 'ok') {
                this.fornitori = res['data'];
                this.nRec = res['number'];
                this.Message = 'situazione attuale';
                this.alertSuccess = true;
               }
               if(res['rc'] === 'nf') {
                this.fornitori = this.fornitorinull;
                this.nRec = res['number'];
                this.Message = 'Nessun fornitore per il settore selezionato';
                this.alertSuccess = false;
               }
          },
          error => {
             alert('loadFornitoribySettore - errore: ' + error.message);
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
  this.router.navigate(['fornitore/new']);
}


onDeleteFornitore(esito: string) { // ho effettuato la cancellazione quindi devo rifare l'elenco

  console.log('onDeletedFornitore ----- ' + esito );

  if(esito === 'Dfornitore' ) {  // valore impostato dal figlio in fase di cancellazione
    if(this.enabledSelect === false) { // cliente loggato che visualizza le proprie prenotazioni
      this.loadFornitori();
    } else {
        if(this.selectedSettore > 0) {
          this.loadFornitoribySettore(this.selectedSettore);
        }

    }
  }

  if(esito === 'errorDfornitore') {  // valore impostato dal figlio in fase di cancellazione

    this.isVisible = true;
    this.alertSuccess = false;
    this.type = 'error';
    this.Message = 'Fornitore non cancellabile - presenti legami con altre tabelle';
    this.showNotification(this.type, this.Message);
  }


 }


}

