import { Component, OnInit } from '@angular/core';
// model Class
import { Cassawc } from '../../../classes/Cassawc';
import { Cassac } from '../../../classes/cassac';
import { Cassa } from '../../../classes/Cassa';
import { Commandaw } from '../../../classes/Commandaw';
import { Commandawriga } from '../../../classes/Commandawriga';
import { Commanda } from '../../../classes/Commanda';
import { Commandariga } from '../../../classes/Commandariga';
import { Prodotto } from '../../../classes/Prodotto';
import { Giornata } from '../../../classes/Giornata';

import { ActivatedRoute, Router } from '@angular/router';
// Services
import { CassawcService } from '../../../services/cassawc.service';
import { CassacService } from '../../../services/cassac.service';
import { CassaService } from '../../../services/cassa.service';
import { CommandawService } from './../../../services/commandaw.service';
import { CtrfuncService } from './../../../services/ctrfunc.service';
import { CommandawrigaService} from './../../../services/commandawriga.service';
import { CommandaService } from './../../../services/commanda.service';
import { CommandarigaService} from './../../../services/commandariga.service';
import { ProdottoService } from './../../../services/prodotto.service';
import { GiornataService } from './../../../services/giornata.service';

import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faUndo, faSave, faHandPointLeft, faTrashAlt, faInfoCircle, faThumbsUp, faThumbsDown, faSearch,
          faPlusSquare, faTrash, faUserEdit, faWindowClose, faMinus, faPlus, faReply, faRecycle } from '@fortawesome/free-solid-svg-icons';
// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';
import { DatePipe } from '@angular/common';
import { ThisReceiver, ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-commanda-registrazione-cassa',
  templateUrl: './commanda-registrazione-cassa.component.html',
  styleUrls: ['./commanda-registrazione-cassa.component.css']
})
export class CommandaRegistrazioneCassaComponent implements OnInit {

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
    faRecycle = faRecycle;

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
  public idDay = 0;

  // per gestione abilitazione funzioni con service Moreno

  public functionUrl = '';

  public searchInqu = 'Inqu';
  public searchEdit = 'Edit';
  public searchEdits = 'Edits';
  public searchNew = 'New';

  public functionUrlUp = '';
  public functionUserUp = '';
  public tipoSelected = '';

    // ---------------------  personalizzazioni componente

    public routenavigate = '';

    public textMessage1 = '';
   public textMessage2 = '';
   public textUser = '';
   public headerPopup = '';
   public effettuataCancellazioneOld = false;

   public commandaw: Commandaw;
   public commandawriga: Commandawriga;

   public commanda: Commanda;
   public commandariga: Commandariga;
   public commandarighe: Commandariga[] = [];
   public commandarighenull: Commandariga[] = [];

   public commandawrighe: Commandawriga[] = [];
   public commandawrighenull: Commandawriga[] = [];

   public tagliei: Cassawc[] = [];
   public taglier: Cassawc[] = [];

   public cassewc: Cassawc[] = [];
   public cassawc: Cassawc;

   public cassac: Cassac;
   public cassa: Cassa;
   public casse: Cassa[] = [];
   public prodotto: Prodotto;
   public giornata: Giornata;

   public tipoRichiesta = '?';
   public ricManif = 0;
   public validSearch = false;
   private textMessage = '';
   public nDay = 0;
   public statoRic = 0;
   public registrata = false;
   public npezzi = 0;


   public idCommanda = 0;
   public idlogged = 0;

   public Tnumero = 0;
   public Tnumpersone = 0;
   public Tpagato = 0;

   public selectedProdotto = 0;
   public selectedProdottoAcquistato = 0;
   public visibleProdottiAcquistati = false;
   public visibleProdotti = false;
   public visibleProdotto = false;
   public tipologia = 0;
   public anagrafica = '';
   public routeGiornata = '';
   public totincassato = 0;
   public visibleResto = false;
   public visibleresetIncasso = false;
   public visibleresetResto = false;

  public totReso =  0;
  public visibleStampa = false;
  public prg = 0;
  public totalexx = 0;
  public commandaStampata = false;
  public nProdCucina = 0;
  public nProdBevande = 0;

  p_inc: number = 1;
   p_res: number = 1;

   constructor(public modalService: NgbModal,
               private ctrfuncService: CtrfuncService,
               private commandawService: CommandawService,
               private cassawcService: CassawcService,
               private commandawrigaService: CommandawrigaService,
               private commandaService: CommandaService,
               private commandarigaService: CommandarigaService,
               private cassacService: CassacService,
               private prodottoService: ProdottoService,
               private cassaService: CassaService,
               private giornataService: GiornataService,
               private route: ActivatedRoute,
               private router: Router,
               private datePipe: DatePipe,
               private notifier: NotifierService) {
                        this.notifier = notifier;
                    }

ngOnInit(): void {

console.log('Commanda-registrazione-Cassa - sono in oninit ');

this.checkFunctionbylevel();

}

checkFunctionbylevel() {
  //  ----- parte comune a tutti i moduli

 // test --------

      const c1 = this.route.snapshot.url[0].path;
      const c2 = this.route.snapshot.url[1].path;
      const c3 = this.route.snapshot.url[2].path;
      const c4 = this.route.snapshot.url[3].path;

      console.log('frontend Cassa - checkFunctionbylevel -- c1:  --> ' + c1);
      console.log('frontend - checkFunctionbylevel -- c2:  --> ' + c2);
      console.log('frontend - checkFunctionbylevel -- c3 ' + c3);
      console.log('frontend - checkFunctionbylevel -- c4 ' + c4);

      this.functionInqu =  false;
      this.functionEdit = false;
      this.functionEdits = false;
      this.functionNew = false;

      this.functionValid = false;

      if(c1 === 'commanda' && c2 === 'RegistraCassa') {
        if(c3 === 'new') {
          this.functionNew = true;
          this.functionValid = true;
        }
      }


      if(this.functionValid !== true) {
        alert('funzione non ammessa - avvisare amministratore');
        return;
      }

      this.idlogged = +localStorage.getItem('id');
      this.route.paramMap.subscribe(p => {
      this.idCommanda = +p.get('idCommanda');
       console.log('id recuperato: ' + this.idCommanda);
       // -------  leggo i dati della giornata

      this.loadCommandaw(this.idCommanda);
      this.loadSelezioneTaglieIncasso();
      this.visibleresetIncasso = false;
      this.commandaStampata = false;
      });


      this.isVisible = true;
      this.alertSuccess = true;


      if(this.functionNew) {

               this.title = 'Inserimento Pagamento Commanda';
               this.fase = 'N';
               this.Message = `Inserire il pagamento commanda`;
             } else {
               // questa non la farà mai
                 if(this.functionEdit || this.functionEdits) {
                    // this.title = 'Situazione Giornaliera Commande';  il titolo è già preinpostato
                     this.fase = 'M';
                    } else {
                     this.title = 'Visualizzazione Pagamento Commanda';
                     this.fase = 'I';
                    }
                   this.Message = 'Situazione Attuale Pagamento Commande ';
                }

                 //  fine parte personalizzabile
              this.type = 'success';
              this.showNotification(this.type, this.Message);
      }



async loadCommandaw(id: number) {
    let res = await this.commandawService.getCommandaw(id).subscribe(
        response => {
              this.commandaw = response['data'];
          },
        error => {
          alert('commanda-registrazione-cassa  --loadCommanda: ' + error.message);
          console.log(error);
          this.isVisible = true;
          this.alertSuccess = false;
          this.type = 'error';
          this.Message = 'Errore loadCommanda' + '\n' + error.message;
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

async loadSelezioneTaglieIncasso() {
  let res = await this.cassawcService.getAllTagliebyCommanda(this.idCommanda).subscribe(
    response => {
          if(response['rc'] === 'ok') {
            this.tagliei = response['data'];
          }
      },
    error => {
      alert('loadSelezioneTaglieIncasso: ' + error.message);
      console.log(error);
      this.isVisible = true;
      this.alertSuccess = false;
      this.type = 'error';
      this.Message = 'Errore loadSelezioneTaglieIncasso' + '\n' + error.message;
      this.showNotification(this.type, this.Message);
    });
}

// salvo su comodo il valore della moneta per preimpostare il resto a mappa
async loadSelezioneTaglieRestobyMoneta() {
  let res = await this.cassawcService.getAllTagliebyCommanda(this.idCommanda).subscribe(
    response => {
          if(response['rc'] === 'ok') {
            this.taglier = response['data'];
            for(let riga of this.taglier) {
              if(riga.idTaglia === 6) {
                  this.cassawc = riga;
                }
             }
          }
      },
    error => {
      alert('lloadSelezioneTaglieRestobyMoneta: ' + error.message);
      console.log(error);
      this.isVisible = true;
      this.alertSuccess = false;
      this.type = 'error';
      this.Message = 'Errore loadSelezioneTaglieRestobyMoneta' + '\n' + error.message;
      this.showNotification(this.type, this.Message);
    });
}

async loadSelezioneTaglieResto() {
  let res = await this.cassawcService.getAllTagliebyCommanda(this.idCommanda).subscribe(
    response => {
          if(response['rc'] === 'ok') {
            this.taglier = response['data'];
            this.visibleResto = true;
            this.visibleresetResto = true;
          }
      },
    error => {
      alert('loadSelezioneTaglieResto: ' + error.message);
      console.log(error);
      this.isVisible = true;
      this.alertSuccess = false;
      this.type = 'error';
      this.Message = 'Errore loadSelezioneTaglieResto' + '\n' + error.message;
      this.showNotification(this.type, this.Message);
    });
}

async resetincasso() {
  let res = await this.cassawcService.azzeraCassaFull(this.idCommanda).subscribe(
    response => {
          if(response['rc'] === 'ok') {
            this.commandaw.importoPagato = 0;
            this.aggiornaCommanda(this.commandaw);
            this.loadSelezioneTaglieIncasso();
            this.visibleresetIncasso = false;
          }
      },
    error => {
      alert('resetincasso: ' + error.message);
      console.log(error);
      this.isVisible = true;
      this.alertSuccess = false;
      this.type = 'error';
      this.Message = 'Errore resetincasso' + '\n' + error.message;
      this.showNotification(this.type, this.Message);
    });
}

async resetresto() {
  let res = await this.cassawcService.azzeraCassaResto(this.idCommanda).subscribe(
    response => {
          if(response['rc'] === 'ok') {
            this.loadSelezioneTaglieResto();
            this.visibleresetResto = false;
          }
      },
    error => {
      alert('resetresto: ' + error.message);
      console.log(error);
      this.isVisible = true;
      this.alertSuccess = false;
      this.type = 'error';
      this.Message = 'Errore resetresto' + '\n' + error.message;
      this.showNotification(this.type, this.Message);
    });
}

incassa() {
  console.log('incassa - appena dentro');
  this.commandaw.resto = (this.commandaw.importodaPagare - this.commandaw.importoPagato) * -1;
  this.aggiornaCommanda(this.commandaw);
  this.loadSelezioneTaglieRestobyMoneta();  // salvo la eventale moneta inserita in pagamento
  this.ImpostaTagliperresto(this.commandaw.id, this.commandaw.resto);
}

async ImpostaTagliperresto(id: number, resto: number) {

//  console.log('ImpostaTagliperresto - appena dentro -- Giornata che sto passando : ' + this.idDay);
  let res = await this.cassawcService.getAllTaglieNoMoneybyCommanda(id).subscribe(
    response => {
          if(response['rc'] == 'ok') {
            this.cassewc = response['data'];
            this.totReso =  0;
            console.log('---------->    ImpostaTagliperresto -- cassa: ' + JSON.stringify(response['data']) + '  resto: ' + resto);

            for(let riga of this.cassewc) {

                  if(riga.valore_taglia > resto) {
                          console.log(' salto ' + riga.valore_taglia + ' con resto: ' + resto);
                    } else {
                      console.log(' resto da calcolare n.ro pezzi per la taglia ' + riga.valore_taglia + ' con resto: ' + resto);
                      this.npezzi = Math.floor(resto / riga.valore_taglia);
                      resto = resto - (this.npezzi * riga.valore_taglia);
                      console.log('nropezzi calcolati: ' + this.npezzi + ' resto ricalcolato: ' + resto );
                      riga.qtaRes = this.npezzi;
                      riga.valoreRes = riga.qtaRes * riga.valore_taglia;
                      this.totReso = this.totReso + riga.valoreRes;
                      riga.tipoMov = 'R';
                      console.log(`ImpostaTagliperresto: ------- pronto per aggiornare taglia della cassa  ----- cassawc ----------->  ${JSON.stringify(riga)} `);
                      this.aggiornaTagliaRestoCassawc(riga);
                 }
              }
            if(resto > 0) {
                this.cassawc.qtaRes = resto;
                this.cassawc.valoreRes = resto;
                this.totReso = this.totReso + resto;
                this.aggiornaTagliaRestoCassawc(this.cassawc);
                console.log('moneta preimpostata: ' +  JSON.stringify(this.cassawc));
              }
            this.loadSelezioneTaglieResto();
          }
      },
    error => {
      alert('ImpostaTagliperresto: ' + error.message);
      console.log(error);
      this.isVisible = true;
      this.alertSuccess = false;
      this.type = 'error';
      this.Message = 'Errore ImpostaTagliperresto' + '\n' + error.message;
      this.showNotification(this.type, this.Message);
    });

}

async aggiornaTagliaRestoCassawc(cassawc: Cassawc) {

  let res = await this.cassawcService.updateCassaResto(cassawc).subscribe(
    response => {
          if(response['rc'] == 'ok') {
           // non faccio niente
          }
      },
    error => {
      alert('aggiornaTagliaRestoCassawc: ' + error.message);
      console.log(error);
      this.isVisible = true;
      this.alertSuccess = false;
      this.type = 'error';
      this.Message = 'Errore aggiornaTagliaRestoCassawc' + '\n' + error.message;
      this.showNotification(this.type, this.Message);
    });

}

totaleIncassato(totInc: number) {
   alert('passato da figlio a padre: ' + totInc);
   console.log('totaleIncassato: -  passato da figlio: ' + totInc);

   this.visibleresetIncasso = true;
   this.commandaw.importoPagato = totInc;
   this.aggiornaCommanda(this.commandaw);
  //  this.totincassato =  totInc;

   if(totInc < this.commandaw.importodaPagare) {
     this.visibleResto = false;
   } else {
     this.visibleResto = true;
   }

 }

 totaleReso(totInc: number) {
  alert('passato da figlio a padre: ' + totInc);
  console.log('totaleIncassato: -  passato da figlio: ' + totInc);
  this.totReso =  totInc;

  this.visibleresetResto = true;
  if(this.totReso < this.commandaw.importodaPagare) {
    this.visibleStampa = false;
  }

}


async aggiornaCommanda(commandaw: Commandaw) {
  let res = await this.commandawService.updateCommanda(commandaw).subscribe(
      response => {
           // this.commandaw = response['data'];
        },
      error => {
        alert('commanda-registrazione-cassa  --aggiornaCommanda: ' + error.message);
        console.log(error);
        this.isVisible = true;
        this.alertSuccess = false;
        this.type = 'error';
        this.Message = 'Errore aggiornaCommanda' + '\n' + error.message;
        this.showNotification(this.type, this.Message);
      });

}

async caclcolanumProdottibyTipologia() {
    let res = await this.commandawrigaService.getProdottiOrdinati(this.commandaw.id).subscribe(
    response => {
      if(response['rc'] === 'ok') {
        this.nProdCucina = 0;
        this.nProdBevande = 0;
        this.commandawrighe = response['data'];
        for(let riga of this.commandawrighe) {
            if(riga.competenza === 1) {
              this.nProdCucina += 1;
            }
            if(riga.competenza === 2) {
              this.nProdBevande += 1;
            }
          }
        }
      },
      error => {
          alert('commanda-registrazione-cassa  --caclcolanumProdottibyTipologia: ' + error.message);
          console.log(error);
          this.isVisible = true;
          this.alertSuccess = false;
          this.type = 'error';
          this.Message = 'Errore caclcolanumProdottibyTipologia' + '\n' + error.message;
          this.showNotification(this.type, this.Message);
      });
}


async creaCommanda() {

        if(this.commandaStampata === true) {
          this.isVisible = true;
          this.alertSuccess = false;
          this.type = 'error';
          this.Message = 'Commanda già Stampata - Funzione non eseguibile' + '\n' + '';
          this.showNotification(this.type, this.Message);
          return;
        }

// leggere le commandarighe e loop per ricalcolare il numero dei prodotti per tipologia
        this.caclcolanumProdottibyTipologia();

        this.idGiornata = this.commandaw.idGiornata;

        this.commanda = new Commanda();
        this.commanda.idSanfra = this.commandaw.idSanfra;
        this.commanda.idprenotazione = this.commandaw.idprenotazione;
        this.commanda.idpersona = this.commandaw.idpersona;
        this.commanda.anagrafica_cliente  = this.commandaw.anagrafica_cliente;
        this.commanda.idGiornata = this.commandaw.idGiornata;
        this.commanda.buonoPasto = this.commandaw.buonoPasto;
        this.commanda.numTavolo  = this.commandaw.numTavolo;
        this.commandaw.stato = this.commandaw.stato;
        /*
        if(this.commandaw.numTavolo === 0) {
          this.commandaw.stato = 1;
        } else {
          this.commandaw.stato = 2;
        }
*/
        this.commanda.numPersone  = this.commandaw.numPersone;
        this.commanda.numProdotti  = this.commandaw.numProdotti;
        this.commanda.importoProdotti  = this.commandaw.importoProdotti;
        this.commanda.importoCoperto  = this.commandaw.importoCoperto;
        this.commanda.importodaPagare = this.commandaw.importodaPagare;
        this.commanda.importoPagato  = this.commandaw.importoPagato;
        this.commanda.resto  = this.commandaw.resto;
        this.commanda.noteCommanda  = this.commandaw.noteCommanda;
        this.commanda.numProdottiBevande = this.nProdBevande;
        this.commanda.numProdottiCucina = this.nProdCucina;
        this.commanda.key_utenti_operation = +localStorage.getItem('id');

        let res = await this.commandaService.createCommanda(this.commanda).subscribe(
          response => {
            if(response['rc'] === 'ok') {
              this.loadlastCommanda();
              }
            },
          error => {
            alert('commanda-registrazione-cassa  --creaCommanda: ' + error.message);
            console.log(error);
            this.isVisible = true;
            this.alertSuccess = false;
            this.type = 'error';
            this.Message = 'Errore creaCommanda' + '\n' + error.message;
            this.showNotification(this.type, this.Message);
          });

}

async loadlastCommanda() {
  let res = await this.commandaService.getLastCommandaid().subscribe(
    response => {
      if(response['rc'] === 'ok') {
        this.commanda = response['data'];
        console.log('lastnumber: ------------------------------- is  ' + JSON.stringify(this.commanda));
        this.inseriscicommandarighe(this.commandaw.id, this.commanda.id);
        this.inseriscicassaCommanda(this.commandaw.id, this.commanda.id);
        this.commandaStampata = true;
        this.isVisible = true;
        this.alertSuccess = false;
        this.type = 'success';
        this.Message = 'Commanda pagata regolarmente';
        this.showNotification(this.type, this.Message);

      }
    },
    error => {
      alert('commanda-registrazione-cassa  --loadlastCommanda: ' + error.message);
      console.log(error);
      this.isVisible = true;
      this.alertSuccess = false;
      this.type = 'error';
      this.Message = 'Errore loadlastCommanda' + '\n' + error.message;
      this.showNotification(this.type, this.Message);
    });
}


async inseriscicassaCommanda(idw: number, id: number) {

  console.log('inseriscicassaCommanda - appena entrato' );
  let res = await this.cassawcService.getAllTagliebyCommanda(idw).subscribe(
    response => {
        if(response['rc'] === 'ok') {
           console.log(`inseriscicassaCommanda: ----------------------->  ${JSON.stringify(response['data'])} `);
           this.cassewc = response['data'];
           this.totalexx = 0;
           this.prg = id * 10;
           for(let riga of this.cassewc) {
                this.cassac = new Cassac();
                if(riga.qtaInc === 0  && riga.qtaRes === 0) {

                } else {
                  this.prg = this.prg + 1;
                  this.cassac.id = this.prg;
                  this.cassac.idCommanda = id;
                  this.cassac.idTaglia = riga.idTaglia;
                  this.cassac.tipoMov = riga.tipoMov;
                  this.cassac.qtaInc = riga.qtaInc;
                  this.cassac.valoreInc = riga.valoreInc;
                  this.cassac.qtaRes = riga.qtaRes;
                  this.cassac.valoreRes = riga.valoreRes;
                  this.totalexx = this.totalexx + riga.valoreInc - riga.valoreRes;
                  this.cassac.key_utenti_operation =  +localStorage.getItem('id');
                  console.log(`inseriscicassaCommanda: ------- pronto per inserire ----- cassac ----------->  ${JSON.stringify(this.cassac)} `);
                  this.inseriscirigaCassa(this.cassac);
                  this.aggiornaCassa(riga.idTaglia, riga.qtaInc, riga.valoreInc, riga.qtaRes, riga.valoreRes);
           }
         }
           this.aggiornaGiornata(this.idGiornata, this.totalexx);
           // visualizzo preview
           this.router.navigate(['prewcommanda/' + id]);

        }
     },
    error => {
      alert('commanda-registrazione-cassa  --inseriscicassaCommanda: ' + error.message);
      console.log(error);
      this.isVisible = true;
      this.alertSuccess = false;
      this.type = 'error';
      this.Message = 'Errore inseriscicassaCommanda' + '\n' + error.message;
      this.showNotification(this.type, this.Message);
    });
}

async aggiornaGiornata(idGiornata: number, totalexx: number) {

  console.log('aggiornaGiornata - appena entrato --- giornata: ' + idGiornata );
  let res = await this.giornataService.getGiornata(idGiornata).subscribe(
    response => {
        if(response['rc'] === 'ok') {
           this.giornata = response['data'];
           this.giornata.cassaAttuale += totalexx;
           this.aggiornaImportiGiornata(this.giornata);
        }
     },
    error => {
      alert('commanda-registrazione-cassa  --aggiornaGiornata: ' + error.message);
      console.log(error);
      this.isVisible = true;
      this.alertSuccess = false;
      this.type = 'error';
      this.Message = 'Errore aggiornaGiornata' + '\n' + error.message;
      this.showNotification(this.type, this.Message);
    });


}

async aggiornaImportiGiornata(giornata: Giornata) {

  console.log('aggiornaImportiGiornata - appena entrato' );
  let res = await this.giornataService.updateGiornata(giornata).subscribe(
    response => {
        if(response['rc'] === 'ok') {
          // nulla
        }
     },
    error => {
      alert('commanda-registrazione-cassa  --aggiornaImportiGiornata: ' + error.message);
      console.log(error);
      this.isVisible = true;
      this.alertSuccess = false;
      this.type = 'error';
      this.Message = 'Errore aggiornaImportiGiornata' + '\n' + error.message;
      this.showNotification(this.type, this.Message);
    });
}

async inseriscirigaCassa(cassac: Cassac) {
  let res = await this.cassacService.createCassac(cassac).subscribe(
    response => {
        if(response['rc'] === 'ok') {

         }
     },
    error => {
      alert('commanda-registrazione-cassa  --inseriscirigaCassa: ' + error.message);
      console.log(error);
      this.isVisible = true;
      this.alertSuccess = false;
      this.type = 'error';
      this.Message = 'Errore inseriscirigaCassa' + '\n' + error.message;
      this.showNotification(this.type, this.Message);
    });
}

async aggiornaCassa(idTaglia: number, qtaInc: number, valoreInc: number, qtaRes: number, valoreRes: number) {

  let res = await this.cassaService.getbyidTagliaeGiorno(this.idGiornata, idTaglia).subscribe(
    response => {
        if(response['rc'] === 'ok') {
           console.log(`aggiornaCassa: ----------------------->  ${JSON.stringify(response['data'])} `);
           this.cassa = response['data'];
           if(qtaInc !== 0) {
              this.cassa.qtaAc += qtaInc;
              this.cassa.valoreAc += valoreInc;
           }
           if(qtaRes !== 0) {
            this.cassa.qtaAc -= qtaRes;
            this.cassa.valoreAc -= valoreRes;
          }
           this.cassa.key_utenti_operation =  +localStorage.getItem('id');
           console.log(`inseriscicassaCommanda: ------- pronto per inserire ----- cassac - giorno --->   ${this.idGiornata}`);
           console.log(`inseriscicassaCommanda: ------- pronto per inserire ----- cassac ---->  ${JSON.stringify(this.cassac)} `);
           this.aggiornaCassaday(this.idGiornata, this.cassa);
        }
     },
    error => {
      alert('commanda-registrazione-cassa  --aggiornaCassa: ' + error.message);
      console.log(error);
      this.isVisible = true;
      this.alertSuccess = false;
      this.type = 'error';
      this.Message = 'Errore aggiornaCassa' + '\n' + error.message;
      this.showNotification(this.type, this.Message);
    });
}


async aggiornaCassaday(idDay: number, cassa: Cassa) {

  let res = await this.cassaService.updateCassa(cassa, idDay).subscribe(
    response => {
         // this.commandaw = response['data'];
      },
    error => {
      alert('commanda-registrazione-cassa  --aggiornaCassaday: ' + error.message);
      console.log(error);
      this.isVisible = true;
      this.alertSuccess = false;
      this.type = 'error';
      this.Message = 'Errore aggiornaCassaday' + '\n' + error.message;
      this.showNotification(this.type, this.Message);
    });

}






async inseriscicommandarighe(idw: number, id: number) {
//  console.log('inserisciCommandarighe - appena entrato - giornata' + id);
  let res = await this.commandawrigaService.getProdottiOrdinati(idw).subscribe(
    response => {
        if(response['rc'] === 'ok') {
       //    console.log(`createCassawc: ----------------------->  ${JSON.stringify(response['data'])} `);
           this.commandawrighe = response['data'];
           for(let riga of this.commandawrighe) {
                this.commandariga = new Commandariga();
                this.commandariga.idCommanda = id;
                this.commandariga.idProdotto = riga.idProdotto;
                this.commandariga.prezzo = riga.prezzo_day;
                this.commandariga.categoria = riga.categoria;
                this.commandariga.competenza = riga.competenza;
                this.commandariga.descrizione_prodotto = riga.descrizione_prodotto;
                if(riga.tipologia === 4) { // bevande
                  this.commandariga.stato = 1;
                }
                this.commandariga.qta_ord = riga.qta;
                this.commandariga.key_utenti_operation =  +localStorage.getItem('id');

        //        console.log(`inseriscicommandarighe: ------- pronto per inserire ---------------->  ${JSON.stringify(this.commandariga)} `);

                this.inserisciriga(this.commandariga);
                this.aggiornadisponibilitaProdotto(riga.idProdotto, riga.qta);
           }
         }
     },
    error => {
      alert('commanda-registrazione-cassa  --inseriscicommandarighe: ' + error.message);
      console.log(error);
      this.isVisible = true;
      this.alertSuccess = false;
      this.type = 'error';
      this.Message = 'Errore inseriscicommandarighe' + '\n' + error.message;
      this.showNotification(this.type, this.Message);
    });

  }


async inserisciriga(commandariga: Commandariga) {

  let res = await this.commandarigaService.createCommandariga(commandariga).subscribe(
    response => {
        if(response['rc'] === 'ok') {

         }
     },
    error => {
      alert('commanda-registrazione-cassa  --inserisciriga: ' + error.message);
      console.log(error);
      this.isVisible = true;
      this.alertSuccess = false;
      this.type = 'error';
      this.Message = 'Errore inserisciriga' + '\n' + error.message;
      this.showNotification(this.type, this.Message);
    });

}


async aggiornadisponibilitaProdotto(id: number, qta: number) {

 // console.log(`aggiornadisponibilitaProdotto: ----appena entrato ----prodotto: -------> ${id} qta: ${qta} `);

  let res = await this.prodottoService.getProdotto(id).subscribe(
    response => {
         if(response['rc'] === 'ok') {
           this.prodotto = response['data'];
           if(this.prodotto.disponibile_Day !== 999) {
              this.prodotto.disponibile =  this.prodotto.disponibile - qta;
              this.prodotto.disponibile_Day =  this.prodotto.disponibile_Day - qta;
              this.prodotto.qta_vendute = this.prodotto.qta_vendute + qta;
              this.prodotto.residuo = this.prodotto.disponibile_Day;
           } else {
             this.prodotto.qta_vendute = this.prodotto.qta_vendute + qta;
           }
     //      console.log('aggiornadisponibilitaProdotto: ----pronto per aggiornamento : -------> ' + JSON.stringify(this.prodotto));
           this.aggiornadisp(this.prodotto);
         }
     },
    error => {
      alert('commanda-registrazione-cassa  --inserisciriga: ' + error.message);
      console.log(error);
      this.isVisible = true;
      this.alertSuccess = false;
      this.type = 'error';
      this.Message = 'Errore inserisciriga' + '\n' + error.message;
      this.showNotification(this.type, this.Message);
    });
}

async aggiornadisp(prodotto: Prodotto) {
//  console.log('`aggiornadisp  --appena entrato ----prodotto: -------> ' + JSON.stringify(prodotto));
  let res = this.prodottoService.updateProdotto(prodotto).subscribe(
    response => {
        if(response['rc'] === 'ok') {
          console.log(`aggiornadisp  --fatto aggiornamento  `);
        } else {
          this.isVisible = true;
          this.alertSuccess = false;
          this.type = 'error';
          this.Message = 'Errore aggiornadisp' + '\n' + ' Return Code: ' + response['rc'];
          this.showNotification(this.type, this.Message);
        }
    },
    error => {
      alert('commanda-registrazione-cassa  --aggiornadisp: ' + error.message);
      console.log(error);
      this.isVisible = true;
      this.alertSuccess = false;
      this.type = 'error';
      this.Message = 'Errore aggiornadisp' + '\n' + error.message;
      this.showNotification(this.type, this.Message);
    });
}






}







