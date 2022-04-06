// prima di correzzione su "passaggio a form prodotti"
// in "registrazione cancello la vecchia commanda la ricreo e creo le righe e imposto la fase a "M".
// quando finito compilazione dei campi effettuo modifica e passaggio a prodotti
// 2022/02/25



import { Component, Input, OnInit } from '@angular/core';
// model Class
import { Manifestazione } from '../../../classes/Manifestazione';
import { Giornata } from '../../../classes/Giornata';
import { Commandaw } from '../../../classes/Commandaw';
import { Commandawriga } from '../../../classes/Commandawriga';
import { Persona } from '../../../classes/Persona';
import { Prenotazione } from '../../../classes/Prenotazione';
import { Prodotto } from '../../../classes/Prodotto';
import { ActivatedRoute, Router } from '@angular/router';
// Services
import { ManifestazioneService } from './../../../services/manifestazione.service';
import { GiornataService } from './../../../services/giornata.service';
import { CommandaService } from './../../../services/commanda.service';
import { CommandawService } from './../../../services/commandaw.service';
import { CtrfuncService } from './../../../services/ctrfunc.service';
import { CommandawrigaService} from './../../../services/commandawriga.service';
import { PersonaService } from './../../../services/persona.service';
import { PrenotazioneService } from './../../../services/prenotazione.service';
import { ProdottoService } from './../../../services/prodotto.service';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faUndo, faSave, faHandPointLeft, faTrashAlt, faInfoCircle, faThumbsUp, faThumbsDown, faSearch,
          faPlusSquare, faTrash, faUserEdit, faWindowClose, faMinus, faPlus, faReply } from '@fortawesome/free-solid-svg-icons';
// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';
import { DatePipe } from '@angular/common';
// messaggi popup di avviso professionali
import Swal from 'sweetalert2';


@Component({
  selector: 'app-commanda-registrazione-anagrafica',
  templateUrl: './commanda-registrazione-anagrafica.component.html',
  styleUrls: ['./commanda-registrazione-anagrafica.component.css']
})
export class CommandaRegistrazioneAnagraficaComponent implements OnInit {


  //ricevo ti dati dal componente padre (Prodotto)
  @Input() prenotazionebyelenco: Prenotazione;

  public title = 'Registrazione Commanda  -  Commanda-registrazione-anagrafica';

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

    public functionValid = false;
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

    public routenavigate = '';

    options = [
      'Clienti',
      'Personale Sanfra',
      'Prenotazioni',
     ];

   public textMessage1 = '';
   public textMessage2 = '';
   public textUser = '';
   public headerPopup = '';
   public effettuataCancellazioneOld = false;


   public giornata: Giornata;
   public commandaw: Commandaw;
   public commandawriga: Commandawriga;
   public persone: Persona[] = [];
   public persona: Persona;
   public personenull: Persona[] = [];
   public prenotazioni: Prenotazione[] = [];
   public prenotazioninull: Prenotazione[] = [];
   public prodotti: Prodotto[] = [];
   public prodotto: Prodotto;
   public manifestazione: Manifestazione;
   public prenotazione: Prenotazione;

   public tipoRichiesta = '?';
   public ricManif = 0;
   public validSearch = false;
   private textMessage = '';
   public nDay = 0;
   public statoRic = 0;
   public registrata = false;
   public NCommanda = 0;

   public personaleSanfra = false;
   public ClientiNormali = false;
   public Prenotazionixx = false;

   public prenotatocognomeenome = '';
   public idPrenotazione = 0;
   public idCommanda = 0;
   public idComma = 0;
   public idlogged = 0;

   public Tnumero = 0;
   public Tnumpersone = 0;
   public Tpagato = 0;

   public selectedPersona = 0;
   public selectedPrenotazione = 0;
   public visiblePrenotazioni = false;
   public visibleSanfra = false;
   public anagrafica = '';
   public activateNuovaCommanda = false;
   public testopressButton = 'Premere registrazione per iniziare';
   // per paginazone
   p_pren: number = 1;
   p_pers: number = 1;

   constructor(public modalService: NgbModal,
               private ctrfuncService: CtrfuncService,
               private giornataService: GiornataService,
               private commandaService: CommandaService,
               private commandawService: CommandawService,
               private commandawrigaService: CommandawrigaService,
               private personaService: PersonaService,
               private prenotazioneService: PrenotazioneService,
               private prodottoService: ProdottoService,
               private manifestazioneService: ManifestazioneService,
               private route: ActivatedRoute,
               private router: Router,
               private datePipe: DatePipe,
               private notifier: NotifierService) {
                        this.notifier = notifier;
                    }

                    ngOnInit(): void {

                      console.log('Commanda-registrazione-anagrafica - sono in oninit ');

                      this.checkFunctionbylevel();

                    }

                    checkFunctionbylevel() {
                      //  ----- parte comune a tutti i moduli

                     // test --------

                    const c1 = this.route.snapshot.url[0].path;
                    const c2 = this.route.snapshot.url[1].path;
                    const c3 = this.route.snapshot.url[2].path;
                    const c4 = this.route.snapshot.url[3].path;

                    console.log('frontend - checkFunctionbylevel -- c1:  --> ' + c1);
                    console.log('frontend - checkFunctionbylevel -- c2:  --> ' + c2);
                    console.log('frontend - checkFunctionbylevel -- c3 ' + c3);
                    console.log('frontend - checkFunctionbylevel -- c4 ' + c4);

                    this.functionInqu =  false;
                    this.functionEdit = false;
                    this.functionEdits = false;
                    this.functionNew = false;

                    this.functionValid = false;

                    if(c1 === 'commanda' && c2 === 'RegistraAnag') {
                      if(c3 === 'new') {
                        this.functionNew = true;
                        this.functionValid = true;
                      }
                    }


                    if(this.functionValid !== true) {
                      alert('funzione non ammessa - avvisare amministratore');
                      return;
                    }
                    this.idGiornata = +localStorage.getItem('idGiornata');
                    this.idlogged = +localStorage.getItem('id');
                    this.loadGiornata(this.idGiornata);
                    this.loadTotali(this.idGiornata);

                    this.isVisible = true;
                    this.alertSuccess = true;


                    if(this.functionNew) {
// verifico se provengo da prodotti (stesso url di nuova registrazione) e effettuo la lettura
                             this.idComma = parseInt(localStorage.getItem('idCommanda'));
                             if(this.idComma > 0)  {
                              this.loadCommandaw(this.idComma);
                              this.fase = 'M';
                             } else {
                              this.activateNuovaCommanda = false;
                              this.commandaw = new Commandaw();
                              this.title = 'Inserimento Commanda';
                              this.fase = 'N';
                              this.Message = `Inserire i dati della commanda`;
                             }
                           } else {
                   //            this.calcolaProdottiaMenu();
                               this.route.paramMap.subscribe(p => {
                                 this.idCommanda = +p.get('id');
                                 console.log('id recuperato: ' + this.idCommanda);
                                 // -------  leggo i dati della giornata

                                 this.loadCommandaw(this.idCommanda);

                                 if(this.functionEdit || this.functionEdits) {
                                  // this.title = 'Situazione Giornaliera Commande';  il titolo è già preinpostato
                                   this.fase = 'M';
                                  } else {
                                   this.title = 'Visualizzazione Giornaliera Commande';
                                   this.fase = 'I';
                                  }
                                 this.Message = 'Situazione Attuale Commande ';
                              });

                               //  fine parte personalizzabile
                         }
                    this.type = 'success';
                    this.showNotification(this.type, this.Message);










                    /* controlli standard non attivati per una rotta particolare e eseguita solo per registrazione commanda

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


                    if(this.functionNew) {
                             this.commandaw = new Commandaw();
                             this.title = 'Inserimento Commanda';
                             this.fase = 'N';
                             this.Message = `Inserire i dati della commanda`;
                           } else {
                   //            this.calcolaProdottiaMenu();
                               this.route.paramMap.subscribe(p => {
                                 this.idCommanda = +p.get('id');
                                 console.log('id recuperato: ' + this.idCommanda);
                                 // -------  leggo i dati della giornata

                                 this.loadCommandaw(this.idCommanda);

                                 if(this.functionEdit || this.functionEdits) {
                                  // this.title = 'Situazione Giornaliera Commande';  il titolo è già preinpostato
                                   this.fase = 'M';
                                  } else {
                                   this.title = 'Visualizzazione Giornaliera Commande';
                                   this.fase = 'I';
                                  }
                                 this.Message = 'Situazione Attuale Commande ';
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
                             this.Message = 'Errore controllo Modulo' + '\n' + error.message;
                             this.showNotification(this.type, this.Message);
                             console.log(error);
                           });

                    }
*/

                  }




                  async loadManifestazione(id: number) {
                    console.log(`---->     loadManifestazione - appena dentro`);
                    let res = await this.manifestazioneService.getManifestazione(id).subscribe(
                    response => {
                        if(response['rc'] === 'ok') {
                          this.manifestazione = response['data'];
                        }


                        console.log(`----------------->     loadManifestazione - fatto lettura ${JSON.stringify(response['data'])}`);
                    },
                    error => {
                    alert('commanda-registrazione-anagrafica  --loadManifestazione: ' + error.message);
                    console.log(error);
                    this.isVisible = true;
                    this.alertSuccess = false;
                    this.type = 'error';
                    this.Message = 'Errore loadManifestazione' + '\n' + error.message;
                    this.showNotification(this.type, this.Message);
                    });

              }



                  async loadGiornata(id: number) {
                      let res = await this.giornataService.getGiornata(id).subscribe(
                      response => {
                          this.giornata = response['data'];
                          this.giornata.key_utenti_operation = +localStorage.getItem('id');


                          console.log('devo  fare loadMonifestazione');
                          this.loadManifestazione(this.giornata.idManifestazione);
                          console.log('-------- .........    fatto  loadMonifestazione');


                          console.log(`----------------->     loadGiornata - fatto lettura`);
                      },
                      error => {
                      alert('giornata-detail-prodotti  --loadGiornata: ' + error.message);
                      console.log(error);
                      this.isVisible = true;
                      this.alertSuccess = false;
                      this.type = 'error';
                      this.Message = 'Errore loadGiornata' + '\n' + error.message;
                      this.showNotification(this.type, this.Message);
                      });

                }


                async loadCommandaw(id: number) {
                  let res = await this.commandawService.getCommandaw(id).subscribe(
                  response => {
                      this.commandaw = response['data'];

                  },
                  error => {
                  alert('giornata-detail-prodotti  --loadCommanda: ' + error.message);
                  console.log(error);
                  this.isVisible = true;
                  this.alertSuccess = false;
                  this.type = 'error';
                  this.Message = 'Errore loadCommanda' + '\n' + error.message;
                  this.showNotification(this.type, this.Message);
                  });

            }




                    async loadTotali(id: number) {

                      console.log(`loadTotali - appena entrato`);
                      let rc = await this.commandaService.getConteggiByGiornataId(id).subscribe(
                       resp => {
                             console.log(`loadTotali:  ${JSON.stringify(resp['data'])} `);
                             this.Tnumero = resp['numero'];
                             this.Tnumpersone = resp['numpersone'];
                             this.Tpagato = resp['pagato'];
                         //    this.loadlastDay(this.idManif);
                             console.log('fatto lettura totali: ');
                           //  this.type = 'success';
                          //   this.Message = 'situazione attuale Manifestazione';
                          //   this.alertSuccess = true;
                          },
                       error => {
                            alert('sono in loadTotali - error');
                            this.isVisible = true;
                            this.alertSuccess = false;
                            console.log('loadTotali - errore: ' + error);
                            this.type = 'error';
                            this.Message = error.message;
                            this.alertSuccess = false;
                            this.showNotification(this.type, this.Message);
                          });
                     }




                /**
                 * Show a notification
                 *
                 * @param {string} type    Notification type
                 * @param {string} message Notification message
                 */

                showNotification( type: string, message: string ): void {

                this.notifier.notify( type, message );
                console.log(`sono in showNotification  ${type}`);

                }





                onSelectionChange(tipo: string)   {

                  switch (tipo) {
                            case 'Clienti':
                                this.visiblePrenotazioni = false;
                                this.visibleSanfra = false;
                                break;
                            case 'Personale Sanfra':
                                this.visiblePrenotazioni = false;
                                this.visibleSanfra = true;
                                this.loadPersonaleSanfra();
                                break;
                            case 'Prenotazioni':
                                this.visiblePrenotazioni = true;
                                this.visibleSanfra = false;
                                this.loadPrenotazioni(this.giornata.id);
                                break;
                            default:
                            alert('Scelta errata' + '\n' + 'ricerca non possibile');
                            break;
                   }
              }

async NuovaCommanda(id: number) {
  console.log(`nuovaCommanda - appena entrato`);
  let rc = await this.commandawService.getCommandaw(id).subscribe(
   resp => {
           if(resp['rc'] === 'ok') {
            this.CancellaCommandaw(id);
           }
           if(resp['rc'] === 'nf') {
            //  non faccio nulla
           }
           this.activateNuovaCommanda = true;
           this.commandaw = new Commandaw();
           this.commandaw.anagrafica_cliente = '';
           this.commandaw.idGiornata = this.idGiornata;
           this.commandaw.id = this.idlogged;
           this.commandaw.idSanfra = this.giornata.idManifestazione;

        },
   error => {
        alert('sono in nuovaCommanda - error');
        this.isVisible = true;
        this.alertSuccess = false;
        console.log('nuovaCommanda - errore: ' + error);
        this.type = 'error';
        this.Message = error.message;
        this.alertSuccess = false;
        this.showNotification(this.type, this.Message);
      });

}

async CancellaCommandaw(id: number) {

  let rc = await this.commandawService.deleteCommandaw(id).subscribe(
    resp => {
           if(resp['rc'] === 'ok') {
             // non faccio niente
           }
         },
    error => {
         alert('sono in CancellaCommandaw - error');
         this.isVisible = true;
         this.alertSuccess = false;
         console.log('CancellaCommandaw - errore: ' + error);
         this.type = 'error';
         this.Message = error.message;
         this.alertSuccess = false;
         this.showNotification(this.type, this.Message);
       });
}

// creo commandaw e vado a pagina per inserimento prodotti
async registraProdotti() {

  if(this.commandaw.id === 0) {
    this.isVisible = true;
    this.alertSuccess = false;
    this.type = 'error';
    this.Message = "Devi cliccare Registrazione prima di inserire i dati di nuova commanda";
    this.alertSuccess = false;
    this.showNotification(this.type, this.Message);
    return;
  }

  if(this.commandaw.numTavolo === 0) {
  this.commandaw.stato = 5;
  }
  this.commandaw.importoCoperto = this.commandaw.numPersone * this.manifestazione.buonoPastoCommanda;

  console.log('registra -  ' + JSON.stringify(this.commandaw) + ' fase: ' + this.fase);


  if(this.fase === 'M') {
    let rc = await this.commandawService.updateCommanda(this.commandaw).subscribe(
      resp => {
             if(resp['rc'] === 'ok') {
               alert('commandaw aggiornata correttamente - ' + '\n' + ' ora vado a inserire i prodotti');
               localStorage.removeItem('idCommanda');
               localStorage.setItem('idCommanda', String(this.commandaw.id));
               this.routenavigate = '/commanda/RegistraProd/new/' + this.commandaw.id;
               this.router.navigate([`${this.routenavigate}`]);
             }
           },
      error => {
           alert('registraProdotti-Modifica - error');
           this.isVisible = true;
           this.alertSuccess = false;
           console.log('registraProdotti-Modifica - errore: ' + error);
           this.type = 'error';
           this.Message = error.message;
           this.showNotification(this.type, this.Message);
         });
  }

  if(this.fase === 'N') {
    let rc = await this.commandawService.createCommanda(this.commandaw).subscribe(
      resp => {
             if(resp['rc'] === 'ok') {
               alert('commandaw inserita correttamente - ' + '\n' + ' ora vado a inserire i prodotti');
               this.registraCommandawrighe();
             }
           },
      error => {
           alert('registraProdotti-Inserisci - error');
           this.isVisible = true;
           this.alertSuccess = false;
           console.log('registraProdotti-Inserisci - errore: ' + error);
           this.type = 'error';
           this.Message = error.message;
           this.showNotification(this.type, this.Message);
         });
  }


}

async registraCommandawrighe() {
  // alert('--------------------------------     registraCommandaRighe')
  let rc =  await this.prodottoService.getAll().subscribe(
       response => {
           if(response['number'] > 0) {            //  response['success']
             this.prodotti = response['data'];
       //   alert('----------   registraCommandaRighe  - trovate ' + response['number'] + ' prodotti da clonare');
             this.crearigheCommanda();
             localStorage.removeItem('idCommanda');
             localStorage.setItem('idCommanda', String(this.commandaw.id));
             this.routenavigate = '/commanda/RegistraProd/new/' + this.commandaw.id;
             this.router.navigate([`${this.routenavigate}`]);
           }
       },
       error =>
       {
        this.Message = error.message;
        this.alertSuccess = false;
         console.log(error);
       }
     );
   }



   async crearigheCommanda() {

   //  alert('commandaW - creaarigheCommanda');
     let prg = 0;
     let keywidriga = 0;
     for(let prodo of this.prodotti) {
       this.commandawriga = new Commandawriga();
       prg = prg + 1;
       keywidriga = (this.commandaw.id * 100) + prg;

       this.commandawriga.id  = keywidriga;
       this.commandawriga.idCommanda = this.commandaw.id;
       this.commandawriga.idProdotto = prodo.id;
       this.commandawriga.descrizione_prodotto = prodo.descrizione_prodotto;
       this.commandawriga.tipologia = prodo.tipologia;
       this.commandawriga.categoria = prodo.categoria;
       this.commandawriga.competenza = prodo.competenza;
       this.commandawriga.disponibile_Day = prodo.disponibile_Day;
       this.commandawriga.scorta_minima = prodo.scorta_minima;
     //  prodo.prezzo_day = prodo.prezzo_day * 1;  // per normalizzare il campo che veniva estratto string
       this.commandawriga.prezzo_day = prodo.prezzo_day;
       this.commandawriga.photo = prodo.photo;
     //  this.commandawriga.d_Categoria = prodo.d_Categoria;

       await this.commandawrigaService.createCommandawriga(this.commandawriga).subscribe(
               response => {
                   if(response['success']) {
           //                  alert('----------------------    inserito commandariga' + prg);
                   }
                   /*
                   else {
                     alert(response['message']);
                     this.Message = response['message'];
                     this.alertSuccess = false;
                   }  */
               },
               error =>
               {
                 console.log(error);
                 this.Message = error.message;
                 this.alertSuccess = false;
               }
           );
     }

     this.Message = "Commanda creata Regolarmente";
     this.Message1 = 'per proseguire nella registrazione clicca sul pulsante Prodotti';
     this.registrata = true;
     this.alertSuccess = true;
   }







backToGiornata() {
  alert('da fare');
}

simpleAlert() {

}

alertWithSuccess() {


}

confirBox() {

}

async loadPersonaleSanfra() {
  console.log(`loadPersonaleSanfra - appena entrato`);
  let rc = await this.personaService.getpersoneActive().subscribe(
   resp => {
          if(resp['rc'] === 'ok') {
            this.persone = resp['data'];
            console.log('trovato persone: ' + JSON.stringify(this.persone));
          }
          if(resp['rc'] === 'nf') {
            this.persone = this.personenull;
          }
      },
   error => {
        alert('sono in loadPrenotazioni - error');
        this.isVisible = true;
        this.alertSuccess = false;
        console.log('loadPrenotazioni - errore: ' + error);
        this.type = 'error';
        this.Message = error.message;
        this.alertSuccess = false;
        this.showNotification(this.type, this.Message);
      });
}


async loadPrenotazioni(id: number) {

  console.log(`loadprenotazioni - appena entrato`);
  let rc = await this.prenotazioneService.getPrenotazinidaEvaderebyday(id).subscribe(
   resp => {
          if(resp['rc'] === 'ok') {
            this.prenotazioni = resp['data'];
          }
          if(resp['rc'] === 'nf') {
            this.prenotazioni = this.prenotazioninull;
          }

/*
         console.log(`loadPrenotazioni:  ${JSON.stringify(resp['data'])} `);
         this.Tnumero = resp['numero'];
         this.Tnumpersone = resp['numpersone'];
         this.Tpagato = resp['pagato'];

         console.log('fatto lettura totali: '); */

      },
   error => {
        alert('sono in loadPrenotazioni - error');
        this.isVisible = true;
        this.alertSuccess = false;
        console.log('loadPrenotazioni - errore: ' + error);
        this.type = 'error';
        this.Message = error.message;
        this.alertSuccess = false;
        this.showNotification(this.type, this.Message);
      });

}

onSelectPrenotazione(prenotazione: Prenotazione) {
 // alert('----------------------------  onSelectPrenotazione:' + JSON.stringify(prenotazione));
  this.anagrafica = prenotazione.cognome + ' ' + prenotazione.name;
  this.commandaw.anagrafica_cliente = this.anagrafica;
  this.commandaw.numPersone = prenotazione.persone;
  this.commandaw.idprenotazione = prenotazione.id;
}

onSelectPersona(persona: Persona) {
  this.anagrafica = persona.cognome + ' ' + persona.nome;
  this.commandaw.anagrafica_cliente = this.anagrafica;
  this.commandaw.numPersone = 1;
  this.commandaw.idprenotazione = persona.id;
}

elenco() {
  alert(' da fare');
}




}




