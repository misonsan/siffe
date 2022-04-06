import { TtipocommandaInterface } from './../../../interfaces/t_tipo_commanda';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faPlusSquare, faSearch } from '@fortawesome/free-solid-svg-icons';
// Service
import { ProdottoService } from './../../../services/prodotto.service';
import { TcategoriaProdottoService } from './../../../services/tcategoria-prodotto.service';
import { TtipologiaService } from './../../../services/ttipologia.service';
import { CtrfuncService } from './../../../services/ctrfunc.service';
// model
import { Prodotto } from '../../../classes/Prodotto';
import { Ttipologia } from '../../../classes/T_tipologia';
import { TcategoriaProdotto } from '../../../classes/T_categoria_prodotto';

import { ActivatedRoute, Router } from '@angular/router';
// per gestire la notifica esito
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-prodotti',
  templateUrl: './prodotti.component.html',
  styleUrls: ['./prodotti.component.css']
})
export class ProdottiComponent implements OnInit {

  public isVisible = false;
  public alertSuccess = false;

  public prodotti: Prodotto[] = [];
  public prodottinull: Prodotto[] = [];
  public prodotto: Prodotto;
  public tipologie: Ttipologia[] = [];
  public tipologienull: Ttipologia[] = [];
  public tipologia: Ttipologia;
  public categorie: TcategoriaProdotto [] = [];
  public categorienull: TcategoriaProdotto [] = [];
  public categoria: TcategoriaProdotto ;



  @Output('updateProdotto') updateProdotto = new EventEmitter<Prodotto>();

  public title = "elenco Prodotti";
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
  public selectedTipologia = 0;
  public selectedCategoria = 0;

 // per gestione abilitazione funzioni con service Moreno

 public functionUser = '';
 public rotta = '';
 public rottaId = 0;
 public level = 0;

  constructor(private prodottoService: ProdottoService,
              private tcategoriaService: TcategoriaProdottoService,
              private ttipologiaService: TtipologiaService,
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
            this.loadProdotti();
            this.loadCategorie();
            this.loadTipologie();
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




/*    vecchia modalità di lettura  -- marca rc
 checkFunctionbylevel() {

    this.rotta = this.route.snapshot.url[0].path;
    this.level = parseInt(localStorage.getItem('user_ruolo'));
    console.log('checkFunctionbylevel -  rotta: ' + this.rotta + ' level: ' + this.level);



    // effettuo la lettura su abilfunctione per vedere la funzione abilitata per il modulo e il profilo
    this.ctrfuncService.getfuncbyProfilo(this.level, this.rotta).subscribe(
      res =>{
       console.log(res,'res-->');
       if(res['number'] !== 1) {
        this.type = 'error';
        this.Message = 'Modulo non ancora habilitation';
        this.showNotification(this.type, this.Message);
      }
       this.functionUser = res['data'];
       if(this.functionUser === 'Da Valorizzare') {
        this.type = 'error';
        this.Message = 'Modulo non ancora abilitation da Amministratore';
        this.showNotification(this.type, this.Message);
        return;
       }
       if(this.functionUser === 'Null') {
        this.type = 'error';
        this.Message = 'Visualizzazione non abilitata da Amministratore';
        this.showNotification(this.type, this.Message);
        return;
       }


       console.log('checkFunctionbylevel - funzione determinata: ' + this.functionUser);
       this.loadAllUser();
       this.user = new User();
     },
     error => {
       alert('Users  -- loadUsers - errore: ' + error.message);
       console.log(error);
       this.type = 'error';
       this.Message = error.message;
       this.alertSuccess = false;
    });


*/
  }

























  async loadProdotti() {

    //alert('Manifestazioni   -- loadManifestazioni :  inizio ');
    this.trovatoRec = false;
    this.nRec = 0;
    this.isVisible = true;
    await  this.prodottoService.getAll().subscribe(
      // sentire hidran per lettura particolare
     // this.fedeleService.getFedeliforMessa(id).subscribe(
        res => {
            this.prodotti = res['data'];
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
        }
      )
  }


async  loadCategorie() {

  await  this.tcategoriaService.getAll().subscribe(
        res => {
          this.categorie = res['data'];
       },
      error => {
         alert('loadCategorie - errore: ' + error.message);
         console.log(error);
         this.Message = error.message;
         this.alertSuccess = false;
      }
    )
  }

  async  loadTipologie() {

    await  this.ttipologiaService.getAll().subscribe(
          res => {
            this.tipologie = res['data'];
          },
        error => {
           alert('loadTipologie - errore: ' + error.message);
           console.log(error);
           this.Message = error.message;
           this.alertSuccess = false;
        }
      )
    }






// imposto il filtro di ricerca dei fedeli
onSelectionChange(tipo: string)   {

  switch (tipo) {
              case 'Tutti':
              this.enabledSelect = false;
              this.loadProdotti();
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
        alert('effettuare prima la selezione del prodotto per Menuù ,\n ricerca non possibile');
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

      onSelectProdotto(prodotto: Prodotto){

        this.updateProdotto.emit(prodotto);

       }

       onSelectedTipologia(selectedValue: number) {
        //  alert('selezionato: ' + selectedValue);
          if(selectedValue ==  999) {
            this.type = 'error';
            this.Message = 'selezione non corrette';
            this.showNotification(this.type, this.Message);
            this.alertSuccess = false;
            this.isVisible = true;
            return;
         } else {
          this.selectedCategoria = 0;
          this.selectedTipologia = selectedValue;
          console.log('tipologia selezionata: ' + this.selectedTipologia);
          this.loadProdottibyTipologia(this.selectedTipologia);
         }

     }


     onSelectedCategoria(selectedValue: number) {
        console.log('onSelectedCategoria ' + selectedValue);
        if(selectedValue ==  999) {
          this.type = 'error';
          this.Message = 'selezione non corrette';
          this.showNotification(this.type, this.Message);
          this.alertSuccess = false;
          this.isVisible = true;
          return;
       } else {
        this.selectedTipologia = 0;
        this.selectedCategoria = selectedValue;
        console.log('categoria selezionata: ' + this.selectedCategoria);
        this.loadProdottibyCategoria(this.selectedCategoria);
       }

   }
 //   tcategoria
   async  loadProdottibyTipologia(selected: number) {
    // console.log('loadProdottibyTipologia -- appena entrato');
      this.nRec = 0;
      this.isVisible = true;
      this.searchText = '';
      let rc = await  this.prodottoService.getProdottiforTipologia(selected).subscribe(
           res => {
               if(res['rc'] === 'ok') {
                this.prodotti = res['data'];
                this.nRec = res['number'];
                this.Message = 'situazione attuale';
                this.alertSuccess = true;
               }
               if(res['rc'] === 'nf') {
                this.prodotti = this.prodottinull;
                this.nRec = res['number'];
                this.Message = 'Nessun prodotto per la tipologia selezionata';
                this.alertSuccess = false;
               }
          },
          error => {
             alert('loadProdottibyTipologia - errore: ' + error.message);
             console.log(error);
             this.Message = error.message;
             this.alertSuccess = false;
          });
   }


   async  loadProdottibyCategoria(selected: number) {
      console.log('loadProdottibyCategoria -- appena entrato ' + selected);
      this.nRec = 0;
      this.isVisible = true;
      this.searchText = '';
      let rc = await  this.prodottoService.getProdottiforCategoria(selected).subscribe(
           res => {
               if(res['rc'] === 'ok') {
                this.prodotti = res['data'];
                this.nRec = res['number'];
                this.Message = 'situazione attuale';
                this.alertSuccess = true;
               }
               if(res['rc'] === 'nf') {
                this.prodotti = this.prodottinull;
                this.nRec = res['number'];
                this.Message = 'Nessun prodotto per la categoria selezionata';
                this.alertSuccess = false;
               }
          },
          error => {
             alert('loadProdottibyCategoria - errore: ' + error.message);
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
  this.router.navigate(['prodotto/new']);
}


onDeleteProdotto(esito: string) { // ho effettuato la cancellazione quindi devo rifare l'elenco

  console.log('onDeletedProdotto ----- ' + esito );

  if(esito === 'Dprodotto' ) {  // valore impostato dal figlio in fase di cancellazione
    if(this.enabledSelect === false) { // cliente loggato che visualizza le proprie prenotazioni
      this.loadProdotti();
    } else {
        if(this.selectedCategoria > 0) {
          this.loadProdottibyCategoria(this.selectedCategoria);
        }
        if(this.selectedTipologia > 0) {
          this.loadProdottibyTipologia(this.selectedTipologia);
        }
    }
  }

  if(esito === 'errorDprodotto') {  // valore impostato dal figlio in fase di cancellazione

    this.isVisible = true;
    this.alertSuccess = false;
    this.type = 'error';
    this.Message = 'Prodotto non cancellabile - presenti legami con altre tabelle';
    this.showNotification(this.type, this.Message);
  }


 }


}
