import { Component, OnInit } from '@angular/core';
// classe model
import { Prodotto } from '../../../classes/Prodotto';
import { Giornata } from '../../../classes/Giornata';
import { faPlusSquare, faSearch, faSave, faUserEdit, faMinus, faPlus, faWindowClose, faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
// services
import { GiornataService } from './../../../services/giornata.service';
import { ProdottoService } from './../../../services/prodotto.service';
import { CtrfuncService } from './../../../services/ctrfunc.service';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';



// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';
import { DatePipe } from '@angular/common';
import { Alert } from 'selenium-webdriver';

interface EnableProd {
  value: string;
  dEnable: string;
}

@Component({
  selector: 'app-prodotto-detail-menu',
  templateUrl: './prodotto-detail-menu.component.html',
  styleUrls: ['./prodotto-detail-menu.component.css']
})
export class ProdottoDetailMenuComponent implements OnInit {

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


 public prodotto: Prodotto;
 public giornata: Giornata;
 public idProdotto = 0;



 //public user: User;


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

 options = [
  'A Menu',
  'Non a Menù'
];



 enabledProd: EnableProd[] = [
   {value: '?', dEnable: 'Selezionare'},
   {value: 'N', dEnable: 'Non a Menu'},
   {value: 'S', dEnable: 'A Menu'},
  ];

  public routeGiornata = '';


 constructor(private prodottoService: ProdottoService,
             private giornataService: GiornataService,
             private ctrfuncService: CtrfuncService,
             private route: ActivatedRoute,
             private router: Router,
             private datePipe: DatePipe,
             private notifier: NotifierService) {
                this.notifier = notifier;
              }

              ngOnInit(): void {

                console.log('Prodotto-detail-Menu - sono in oninit ');

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
         this.prodotto = new Prodotto();
         this.prodotto.key_utenti_operation = +localStorage.getItem('id');
         this.title = 'Inserimento Prodotto';
         this.fase = 'N';
         this.Message = `Inserire i dati del Prodotto`;
       } else {
           this.route.paramMap.subscribe(p => {
             this.idProdotto = +p.get('id');


             // -------  leggo i dati della giornata
             this.loadGiornata(this.idGiornata);

//  continuare da qui   2022/02/06
// togliere  // su app.module    per questo componente

             this.loadProdotto(this.idProdotto);

             // modello modificato - possibile solo aggiornamento della cassa
             /*
             if(this.functionEdit || this.functionEdits) {
               this.title = 'Situazione Cassa Giornaliera';
               this.fase = 'M';
              } else {
               this.title = 'Visualizzazione Cassa Giornaliera';
               this.fase = 'I';
              }  */
             this.Message = 'Situazione Attuale Prodotto ';
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

      });
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


async   loadProdotto(id: number) {

console.log(`loadProdotto - appena entrato` + id);
let rc = await this.prodottoService.getProdotto(id).subscribe(
resp => {

     console.log(`loadProdotto: ----------------------->  ${JSON.stringify(resp['data'])} `);
     if(resp['rc'] === 'ok') {
      this.prodotto = resp['data'];

      if(this.prodotto.aMenu === 'S') {
        this.attuale = 'Prodotto a Menu';
      }
      if(this.prodotto.aMenu === 'N') {
         this.attuale = '** Prodotto NON a Menu **';
      }
      if(this.prodotto.aMenu === '*') {
        this.attuale = 'Prodotto non Impostato';
     }
      this.getColor(this.prodotto.aMenu);
      this.getColorbg(this.prodotto.aMenu);
      }
  },
error => {
    alert('sono in loadProdotto');
    this.isVisible = true;
    this.alertSuccess = false;
    console.log('loadProdotto - errore: ' + error);
    this.type = 'error';
    this.Message = error.message;
    this.alertSuccess = false;

  });

}





selectedUtilizzo(selectedValue: string) {
//      alert('ho selezionato:' + selectedValue);
this.prodottoaMenuSelected = selectedValue;
this.selectedCorrect = true;
}


onSaveValueStdChanged(value: boolean){
this.saveValueStd = value;

//    alert('esito checkbox: ' + value);
if (value) {
this.prodotto.disponibile_Day = this.prodotto.disponibile;
this.prodotto.prezzo_day = this.prodotto.prezzo;
} else {
this.prodotto.disponibile_Day = 0;
this.prodotto.prezzo_day = 0;
}
/*    controllare
this.editForm = this.formBuilder.group({
disponibile_Day: [this.selectedUser.disponibile_Day],
prezzo_day: [this.selectedUser.prezzo_day]
});
*/
}





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

backToProdotti() {

  this.routeGiornata = '/giornata/Prod/' + this.functionUser + '/' + this.giornata.id + '/' + this.giornata.idManifestazione;
  localStorage.removeItem("SanfraGiornata");
  localStorage.setItem("SanfraGiornata", this.routeGiornata);
  this.router.navigate([`${this.routeGiornata}`]);

}


async Salva() {

    let rc = await this.prodottoService.updateProdotto(this.prodotto).subscribe(
    resp => {
         if(resp['rc'] === 'ok') {
          this.type = 'success';
          this.Message = 'Aggiornato prodotto per Menu';
          this.alertSuccess = true;
          this.backToProdotti();
         }
      },
    error => {
        alert('sono in Salva');
        this.isVisible = true;
        this.alertSuccess = false;
        console.log('Salva - errore: ' + error);
        this.type = 'error';
        this.Message = error.message;
        this.alertSuccess = false;

  });

}


  }
