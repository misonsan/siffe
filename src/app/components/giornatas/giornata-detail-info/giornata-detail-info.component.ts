import { Component, OnInit } from '@angular/core';

import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faPlusSquare, faSearch, faSave, faUserEdit, faMinus, faPlus, faWindowClose, faTrash, faReply, faUndo, faHandPointLeft, faTrashAlt, faInfoCircle, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
// classe
import { Giornata } from '../../../classes/Giornata';
import { Manifestazione } from '../../../classes/Manifestazione';
import { Persona } from '../../../classes/Persona';
import { Prodotto } from '../../../classes/Prodotto';
// services
import { ManifestazioneService } from './../../../services/manifestazione.service';
import { GiornataService } from './../../../services/giornata.service';
import { CtrfuncService } from './../../../services/ctrfunc.service';
import { PersonaService } from './../../../services/persona.service';
import { CommandaService } from './../../../services/commanda.service';
import { ProdottoService } from './../../../services/prodotto.service';
// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-giornata-detail-info',
  templateUrl: './giornata-detail-info.component.html',
  styleUrls: ['./giornata-detail-info.component.css']
})
export class GiornataDetailInfoComponent implements OnInit {

  public title = 'situagione giornaliera -  giornata-detail-info works!';

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

    faUndo = faUndo;
    faHandPointLeft = faHandPointLeft;
    faTrashAlt = faTrashAlt;
    faInfoCircle = faInfoCircle;
    faThumbsUp = faThumbsUp;
    faThumbsDown = faThumbsDown;

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
  public functionUserUp = '';


    // ---------------------  personalizzazioni componente

    public giornata: Giornata;
    public giornate: Giornata[] = [];
    public users: Persona[] = [];
    public prodotti: Prodotto[] = [];

    public manif: Manifestazione;

    public tipoRic = '';
    public tipoGiornata = '';

    // ------------------   variabili per controllo data

    public datepipe: DatePipe = new DatePipe('en-US');
    public formattedDate: string;

    public date1: Date;
    public date2: Date;


    public date1n: number;
    public date2n: number;

    public date1s: string;
    public date2s: string;


    // contrData
    public dt1: any;
    public dt2: any;
    public diffDays1: any;
    public diffDays2: any;

    public foundLastday = false;
    public neverDay = '';
    public enabledDay = false;   // se stato manifestazione = 0 (non aperta) abilito il taso conferma per inserire giornate

// --------------------------------------




public visibleCassa = false;
public visiblePersone = false;
public visibleProdotti = false;
public visibleListino = false;
public titletipo = '';



// public giornata: Giornata;
//  campi calcolati per editazione
// sbilancio
public s100 = 0;
public s050 = 0;
public s020 = 0;
public s010 = 0;
public s005 = 0;
public smoneta = 0;
// valore iniziale
public vi100 = 0;
public vi050 = 0;
public vi020 = 0;
public vi010 = 0;
public vi005 = 0;
public vimoneta = 0;
// valore attuale
public va100 = 0;
public va050 = 0;
public va020 = 0;
public va010 = 0;
public va005 = 0;
public vamoneta = 0;
// valore finale
public vf100 = 0;
public vf050 = 0;
public vf020 = 0;
public vf010 = 0;
public vf005 = 0;
public vfmoneta = 0;
// valore sbilancio
public vs100 = 0;
public vs050 = 0;
public vs020 = 0;
public vs010 = 0;
public vs005 = 0;
public vsmoneta = 0;
// totali
public tinizio = 0;
public tattuale = 0;
public tfinale = 0;
public tsbilancio = 0;
public tutile = 0;


public enabledCassaFinale = false;
public enabledCassaIniziale = false;

public isVisibleActual = false;
public isVisibleFinal = false;

// Variabili usate in persone

public tipoRichiesta = '?';
public validSearch = false;
public ruolo = 0;
public ruoloEnd = 0;

options = [
  'Tutte',
  'Non Assegnato',
  'Con Ruolo',
  'Non Operativo'
];

// per paginazone
p_pers: number = 1;
p_prod: number = 1;

// Variabili usate in Prodotti

public tipoRichiestaProd = '*';

public flagMenu = '';

optionsProd = [
'Tutte',
'Non a Menù',
'A Menù'
];


  constructor(public modalService: NgbModal,
              private ctrfuncService: CtrfuncService,
              private giornataService: GiornataService,
              private personaService: PersonaService,
              private prodottoService: ProdottoService,
              private manifestazioneService: ManifestazioneService,
              private commandaService: CommandaService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private notifier: NotifierService) {
                  this.notifier = notifier;
              }




  ngOnInit(): void {

    console.log('giornata-detail-Info - sono in oninit ');

    this.tipoGiornata = 'merda';

    this.checkFunctionbylevel();

  }


  checkFunctionbylevel() {
    //  ----- parte comune a tutti i moduli
   this.rotta = this.route.snapshot.url[0].path;
   this.level = parseInt(localStorage.getItem('user_ruolo'));
   this.functionUrl = this.route.snapshot.url[2].path;
   this.rottaTipo = this.route.snapshot.url[1].path;

   if(this.route.snapshot.url[1].path !== 'new') {
     this.rottaId =  parseInt(this.route.snapshot.url[3].path);
     this.rottaIdManif =  parseInt(this.route.snapshot.url[4].path);
    } else {
     this.rottaId =  0;
     this.rottaIdManif =  parseInt(this.route.snapshot.url[4].path);
    }



 //  console.log('Rotta: ' + JSON.stringify(this.route.url));
   console.log('Rotta: ' + this.route.url);


   console.log('frontend - checkFunctionbylevel -- step_01');
   console.log('frontend - checkFunctionbylevel -- functionUrl:  --> ' + this.functionUrl);
   console.log('frontend - checkFunctionbylevel -- functionUrl:  --> ' + this.rottaTipo);
   console.log('frontend - checkFunctionbylevel -- rottaId ' + this.rottaId);
   console.log('frontend - checkFunctionbylevel -- rottaIdManif ' + this.rottaIdManif);


//    path: 'giornata/new/:idManif',
//    path: 'giornata/inqu/:id/:idManif',


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

           //  leggo la manifestazione
         this.route.paramMap.subscribe(x => {
         this.idManif = +x.get('idManif');
         this.loadManif(this.idManif);
         });

         if(this.functionNew) {
           this.giornata = new Giornata();
           this.giornata.key_utenti_operation = +localStorage.getItem('id');
           this.title = 'Inserimento Giornata Manifestazione';
           this.fase = 'N';
           this.Message = `Inserire i dati della Giornata`;
         } else {
             this.route.paramMap.subscribe(p => {
               this.idGiornata = +p.get('id');
               console.log('id recuperato: ' + this.idGiornata);
               // -------  leggo i dati della giornata
               this.loadGiornata(this.idGiornata);


                 // -------------------------------- carico i dati delle Persone   ---  da attivare
              // this.tipoRichiesta = 'Tutte';
              // this.loadPersone();
              // -------------------------------- carico i dati dei Prodotti
               this.tipoRichiestaProd = 'T';
               this.loadProdotti();

               if(this.functionEdit || this.functionEdits) {
                 this.title = 'Situazione Giornata Manifestazione';
                 this.fase = 'M';
                } else {
                 this.title = 'Visualizzazione Giornata Manifestazione';
                 this.fase = 'I';
                }
               this.Message = 'Situazione Attuale Giornata';
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
           this.Message = 'Errore cancellazione Manifestazione' + '\n' + error.message;
           this.showNotification(this.type, this.Message);
           console.log(error);
         });

  }


async  loadManif(id: number) {
    console.log(`loadManif - appena entrato`);
    let rc = await this.manifestazioneService.getManifestazione(id).subscribe(
     resp => {
           console.log(`loadManif:  ${JSON.stringify(resp['data'])} `);
           this.manif = resp['data'];
           this.manif.key_utenti_operation = +localStorage.getItem('id');

       //    this.loadlastDay(this.idManif);
           console.log('fatto lettura manif: ' + this.manif.id);
         //  this.type = 'success';
        //   this.Message = 'situazione attuale Manifestazione';
        //   this.alertSuccess = true;
        },
     error => {
          alert('sono in loadManif');
          this.isVisible = true;
          this.alertSuccess = false;
          console.log('loadManif - errore: ' + error);
          this.type = 'error';
          this.Message = error.message;
          this.alertSuccess = false;

        });
   }

   async loadGiornata(id: number) {

    console.log(`loadGiornata - appena entrato` + id);
    let rc = await this.giornataService.getGiornata(id).subscribe(
     resp => {

           console.log(`loadGiornata: ----------------------->  ${JSON.stringify(resp['data'])} `);
           if(resp['rc'] === 'ok') {
              this.foundLastday = true;
              this.giornata = resp['data'];
            }
           if(resp['rc'] === 'nf') {
              this.foundLastday = false;
              this.neverDay = 'Nessuna data ancora inserita';
            }
           console.log('fatto lettura  giornata: ' + this.giornata.id);
         //  this.type = 'success';
         //  this.Message = 'situazione attuale giornata';
         //  this.alertSuccess = true;
        },
     error => {
          alert('sono in loadGiornata');
          this.isVisible = true;
          this.alertSuccess = false;
          console.log('loadGiornata - errore: ' + error);
          this.type = 'error';
          this.Message = error.message;
          this.alertSuccess = false;

        });
  }
   goback() {
    this.router.navigate(['/manif/' + this.manif.id]);
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


  onSelectionChangeProd(tipo: string) {


    this.tipoRichiestaProd = tipo.substring(0, 1);
    if(this.tipoRichiestaProd === 'A') {
      this.tipoRichiesta = 'S';
    }
    if(this.tipoRichiestaProd === 'N') {
      this.tipoRichiesta = 'N';
    }
    if(this.tipoRichiestaProd === 'T') {
      this.tipoRichiesta = 'T';
    }
    this.validSearch = true;

    switch (this.tipoRichiesta) {
      case 'T':
      this.loadProdotti();
   //   this.router.navigate(['getpersoneforMessa', this.messa.id]);
      break;
      case 'N':
      case 'S':
        this.flagMenu = this.tipoRichiesta;
        this.loadProdottibyMenu(this.tipoRichiesta);
        break;
      default:
      alert('Scelta errata \n ricerca non possibile ' + this.tipoRichiesta);
      break;
    }
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


  async loadProdottibyMenu(menu: string) {

    //alert('Manifestazioni   -- loadManifestazioni :  inizio ');
    this.trovatoRec = false;
    this.nRec = 0;
    this.isVisible = true;
    await  this.prodottoService.getProdottiforMenu(menu).subscribe(
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
           alert('Prodotti  -- loadPersonebyMenu - errore: ' + error.message);
           console.log(error);
           this.Message = error.message;
           this.alertSuccess = false;
        });
  }





}
