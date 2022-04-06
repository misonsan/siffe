import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faPlusSquare, faSearch, faSave, faUserEdit, faMinus, faPlus, faWindowClose, faTrash, faReply } from '@fortawesome/free-solid-svg-icons';

import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
// Model Class
import { Fornitore } from '../../../classes/Fornitore';
import { Spesa } from '../../../classes/Spesa';

// service
import { FornitoreService } from './../../../services/fornitore.service';
import { SpesaService } from './../../../services/spesa.service';
import { CtrfuncService } from '../../../services/ctrfunc.service';

// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-fornitore-detail-spese',
  templateUrl: './fornitore-detail-spese.component.html',
  styleUrls: ['./fornitore-detail-spese.component.css']
})
export class FornitoreDetailSpeseComponent implements OnInit {

   fornitore: Fornitore;
   fornitori: Fornitore[] = [];
   spese: Spesa[] = [];
   spesenull: Spesa[] = [];

   public title = "Gestione Spese Fornitore";

 // icone
   faPlusSquare = faPlusSquare;
   faSearch = faSearch;
   faSave = faSave;
   faUserEdit = faUserEdit;
   faMinus = faMinus;
   faPlus = faPlus;
   faWindowClose = faWindowClose;
   faTrash = faTrash;
   faReply = faReply;

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

   public searchText = '';
   // per paginazone
   p: number = 1;

   // ---------------------


   public statoModulo  = '?';
   public ricercaIniziale = '';

   closeResult = '';

   public level = 0;
   public nRecord = 0;
   public enabledFunc = false;
   public rotta = '';
   public rottaId = 0;
   public rottaFunz = '';


 // variabili per editazione messaggio

 public Message1 = '';
 public Message2 = '';
 public Message3 = '';
 public Message1err = 'Contattare il gestore dell applicazione.';

 public isValid = false;
 public idFornitore = 0;
 public functionSelected = '';


 // per gestione abilitazione funzioni con service Moreno

 public functionUrl = '';


 public searchInqu = 'Inqu';
 public searchEdit = 'Edit';
 public searchEdits = 'Edits';
 public searchNew = 'New';

 public functionUrlUp = '';
 public functionUserUp = '';


 constructor(public modalService: NgbModal,
             private fornitoreService: FornitoreService,
             private ctrfuncService: CtrfuncService,
             private spesaService: SpesaService,
             private datePipe: DatePipe,
             private route: ActivatedRoute,
             private router: Router,
             private notifier: NotifierService) {
               this.notifier = notifier;
             }




             ngOnInit(): void {

              //  console.log('prodotto-detail - sono in oninit - preparato messaggio ' + this.Message);

                this.checkFunctionbylevel();

              }


              checkFunctionbylevel() {
               //  ----- parte comune a tutti i moduli
              this.rotta = this.route.snapshot.url[0].path;
              this.level = parseInt(localStorage.getItem('user_ruolo'));
              this.functionUrl = this.route.snapshot.url[1].path;

              if(this.route.snapshot.url[1].path !== 'new') {
                this.rottaId =  parseInt(this.route.snapshot.url[2].path);
               } else {
                this.rottaId =  0;
               }

              console.log('frontend ----------------  checkFunctionbylevel -- step_01 rotta ' + this.rotta + ' rottaId ' + this.rottaId + ' functionUrl ' + this.functionUrl);

              // variante rispetto allo standard di modello

              if(this.functionUrl === 'spese') {
                this.loadFornitore(this.rottaId);
                this.functionUser = this.searchEdits;  // forzo la funzione per la gestione dei record sul figlio
                this.title = 'Aggiornamento Spese Fornitore';
                this.fase = 'M';
                this.type = 'success';
                this.showNotification(this.type, this.Message);
                return;
              }

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

                    if(this.functionNew) {
                      this.fornitore = new Fornitore();
                      this.fornitore.key_utenti_operation = +localStorage.getItem('id');
                      this.title = 'Inserimento Fornitore';
                      this.fase = 'N';
                      this.Message = `Inserire i dati del fornitore`;
                    } else {
                        this.route.paramMap.subscribe(p => {
                          this.idFornitore = +p.get('id');
                          console.log('id recuperato: ' + this.idFornitore);
                          // -------  leggo i dati della giornata

                          this.loadFornitore(this.idFornitore);
                          if(this.functionEdit || this.functionEdits) {
                            this.title = 'Aggiornamento Spese Fornitore';
                            this.fase = 'M';
                           } else {
                            this.title = 'Visualizzazione Spese Fornitore';
                            this.fase = 'I';
                           }
                          this.Message = 'Situazione Attuale Spese Fornitore';
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
                      this.Message = 'Errore cancellazione Spese Fornitore' + '\n' + error.message;
                      this.showNotification(this.type, this.Message);
                      console.log(error);
                    });

             }



        async     loadFornitore(id: number) {
           console.log(`loadFornitore - appena entrato`);
           this.isVisible = true;
           let rc = await this.fornitoreService.getFornitore(id).subscribe(
                resp => {
                      console.log(`loadFornitore: ${resp['data']}`);
                      this.fornitore = resp['data'];
                      this.fornitore.key_utenti_operation = +localStorage.getItem('id');
                      this.speseFornitore(id);
                      console.log('fatto lettura fornitore: ' + this.fornitore.id);

                   },
                error => {
                     alert('sono in loadFornitore');
                     this.isVisible = true;
                     this.alertSuccess = false;
                     console.log('loadFornitore - errore: ' + error);
                     this.type = 'error';
                     this.Message = error.message;
                     this.alertSuccess = false;

                   });
              }

         async  speseFornitore(id: number) {
          let rc = await this.spesaService.getSpesaforFornitore(id).subscribe(
            resp => {
                  console.log('speseFornitore: ' + JSON.stringify(resp['data']));
                  if(resp['rc'] === 'ok') {
                    this.spese = resp['data'];
                    this.type = 'success';
                    this.Message = 'situazione attuale Spese Fornitore';
                    this.alertSuccess = true;
                  }
                  if(resp['rc'] === 'nf') {
                    this.spese = this.spesenull;
                    this.type = 'error';
                    this.Message = 'nessuna spesa presente';
                    this.alertSuccess = false;
                  }
               },
            error => {
                 alert('sono in loadFornitore');
                 this.isVisible = true;
                 this.alertSuccess = false;
                 console.log('loadFornitore - errore: ' + error);
                 this.type = 'error';
                 this.Message = error.message;
                 this.alertSuccess = false;

               });

              }


              onDeleteSpesa(esito: string) { // ho effettuato la cancellazione quindi devo rifare l'elenco

                console.log('onDeletedSpesa ----- ' + esito );

                if(esito === 'Dspesa' ) {  // valore impostato dal figlio in fase di cancellazione

                    this.loadFornitore(this.rottaId);
                    this.isVisible = true;
                    this.alertSuccess = false;
                    this.type = 'error';
                    this.Message = 'Prodotto non cancellabile - presenti legami con altre tabelle';
                    this.showNotification(this.type, this.Message);
                  }
                }




          showNotification( type: string, message: string ): void {
            // alert('sono in showNot - ' + message);
             this.notifier.notify( type, message );
             console.log(`sono in showNotification  ${type}`);
          //   alert('sono in notifier' + message);
           }





          Nuovo() {
            this.router.navigate(['spesa/newf/' + this.fornitore.id]);
          }


          goback() {
            this.router.navigate(['fornitore']);
          }



}

/*

   open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      // alert('controllo la modalità di chiusura della popup - chiusura su tasto save: ' + result);
      if(result ===  'Cancel click') {
         this.cancellazioneAbort();
      }
      if(result ===  'Delete click') {
        // gestire uscita da popup
        this.cancellaUser(this.fornitore);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
   //   alert('controllo la modalità di chiusura della popup ------------------ chiusura su tasto close: ' + reason);
      this.cancellazioneAbort();
    });

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  cancellazioneAbort() {
    this.type = 'warning';
    this.Message = 'cancellazione abbandonata dall utente';
    this.showNotification(this.type, this.Message);
  }


  cancellaUser(fornitore: Fornitore) {

    this.fornitoreService.deleteFornitore(fornitore).subscribe(
        response => {
          if(response['ok']) {
            this.isVisible = true;
            this.alertSuccess = true;
            this.type = 'success';
            this.Message = 'Fornitore cancellato correttamente';
            this.showNotification(this.type, this.Message);
          }
      },
      error =>
          {

         //  const test = 'Cannot delete or update a parent row: a foreign key constraint fails';

           const str = error.error.message;
           const substr = 'Cannot delete or update a parent row: a foreign key constraint fails';

         //  console.log(' controllo se errore contiene una string particolare :' + str.includes(substr));   da true o false

           if(str.includes(substr)) {
              console.log('trovato errore');
              this.isVisible = true;
              this.alertSuccess = false;
              this.type = 'error';
              this.Message = 'Fornitore non cancellabile - presenti legami con altre tabelle';
              this.showNotification(this.type, this.Message);
              //return;
          }  else {
                this.isVisible = true;
                this.alertSuccess = false;
                this.type = 'error';
                console.log('error.message: ' + error.message);
                console.log('error.error.message: ' + error.error.message);
                this.Message = 'Errore cancellazione prodotto' + '\n' + error.error.message;
                this.showNotification(this.type, this.Message);
                console.log(error);
          }
     });

   }

*/

/*
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
          }
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


*/



