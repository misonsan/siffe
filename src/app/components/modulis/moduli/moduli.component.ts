import { Component, OnInit } from '@angular/core';
// service
import { ModuloService } from '../../../services/modulo.service';
import { AbilfunctioneService } from '../../../services/abilfunctione.service';
// classi
import { Modulo } from '../../../classes/Modulo';
import { Abilfunctione} from '../../../classes/Abilfunctione';

// per gestire la notifica esito
import { NotifierService } from 'angular-notifier';
// popup per avviso cancellazione
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// icone
import { faPlusSquare, faSearch, faInfoCircle, faUserEdit } from '@fortawesome/free-solid-svg-icons';
// router
import { ActivatedRoute, Router } from '@angular/router';
// popup user Modal per gestire inserimento/Modifica/cancellazione con un solo componente
// import { EditUserComponent } from '../../popups/edit-user/edit-user.component';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@Component({
  selector: 'app-moduli',
  templateUrl: './moduli.component.html',
  styleUrls: ['./moduli.component.css']
})
export class ModuliComponent implements OnInit {

  public title = "elenco Moduli per gestione abilitazioni";
  // icone
  faPlusSquare = faPlusSquare;
  faSearch = faSearch;
  faInfoCircle = faInfoCircle;
  faUserEdit = faUserEdit;

  public moduli: Modulo[] = [];
  public modulo: Modulo;
  public abilfunctione: Abilfunctione;


  public nRecMan = 0;
  public nRec = 0;
  public trovatoRec = false;
  public tipoRichiesta = '?';
  public ricManif = 0;
  public validSearch = false;
  private textMessage = '';

   // variabili per notifica esito operazione con Notifier
  public type = '';
  public Message = '';
  public isVisible = false;
  public alertSuccess = false;

  public searchText = '';
  public ricercaIniziale = 0;
     // per paginazone
  p: number = 1;



//  non più necesari per controllo accessi

 // public testRuoloday = 0;     // test per simulare il ruolo web utente
   // variabili per gestione inqu/edit/new
/*
   public href = '';
   public functionInqu = false;
   public functionEdit = false;
   public functionNew = false;


   public functionElenco = false;

   public searchInqu = 'show';
   public searchEdit = 'edit';
   public searchNew = 'new';
   public searchElenco = 'read';

*/
// ---------------------------------------  fine campi non più necessari per controllo accessi con 2 versione


  // ------------------------------------ necessari per nuova versione accessi
  // per nuova versione accessi
  public nRecord = 0;
  public rotta = '';
  public level = 0;
  public enabledFunc = false;
  public functionUser = '';
 // funzioni di navigazione
  public navigateInqu = 'inqu';
  public navigateEdit = 'edit';
  public navigateEdits = 'edits';
  public functionNew = false;


constructor(private moduloService: ModuloService,
            private abilfunctioneService: AbilfunctioneService,
            private modalService: NgbModal,
            private route: ActivatedRoute,
            private router: Router,
            private modal: NgbModal,
            private notifier: NotifierService) {
              this.notifier = notifier;
            }


ngOnInit(): void {
  this.isVisible = true;
  this.functionNew = false;
  this.checkFunctionbylevel();

}

//  posso aprire la popoup con dimensioni diverse:
//  this.modal.open(modalProdotto,{size:'sm'});    <----  piccola
//  this.modal.open(modalProdotto,{size:'lg'});    <----  ampia
//  this.modal.open(modalProdotto,{size:'xl'});    <----  grandissima


/*

async   checkFunctionbylevel() {
  this.enabledFunc = false;
  this.functionUser = '?';
  this.rotta = this.route.snapshot.url[0].path;
  this.level = parseInt(localStorage.getItem('idruoloday'));

  console.log('checkFunctiobylevel - inizio: -- rotta ' + this.rotta + ' level:' + this.level);



  let rc =  await  this.abilfunctioneService.getFunctionbylevel(this.level,this.rotta).subscribe(
         res => {
            this.abilfunctione = res['data'];
            this.nRecord = res['number'];
     //       console.log('checkFunctiobylevel - letto ok: -- n. rec ' + res['number']);

     //       console.log('funxione.enabledNull' + this.abilfunctione.enabledNull);
     //       console.log('funxione.enabledEdit' + this.abilfunctione.enabledEdit);
    //        console.log('funxione.enabledInqu' + this.abilfunctione.enabledInqu);

            if(this.nRecord > 0) {

                  if(this.abilfunctione.enabledNull === 'Y') {
                    this.type = "error";
                    this.Message = 'Applicazione non ancora attivata';
                    this.showNotification(this.type, this.Message);
                  }
                  if(this.abilfunctione.enabledEdit === 'Y') {
                    console.log('checkFunctiobylevel - test1');
                    this.functionUser = this.navigateEdits;
                    this.enabledFunc = true;
                  }
                  if(this.abilfunctione.enabledInqu === 'Y') {
                    console.log('checkFunctiobylevel - test2');
                    this.functionUser = this.navigateInqu;
                    this.enabledFunc = true;
                  }
                   console.log('checkFunctiobylevel - fine: -- functionUser ' + this.functionUser);

                   console.log('enabledFunc' + this.enabledFunc + ' funzione impostata: ' + this.functionUser);


                  if(this.enabledFunc === true) {
                     this.loadModuli();
                    }
            } else {
              this.type = "error";
              this.Message = 'Applicazione non ancora registrata';
              this.showNotification(this.type, this.Message);
            }



        },
        error => {
           alert('Manifestazioni  -- loadManifestazioni - errore: ' + error.message);
           console.log(error);
           this.Message = error.message;
           this.alertSuccess = false;
        });

}

*/

checkFunctionbylevel() {
  this.enabledFunc = false;
  this.functionUser = '?';
  this.rotta = this.route.snapshot.url[0].path;
  this.level = parseInt(localStorage.getItem('user_ruolo'));
  if(this.level === -1){
    this.functionNew = true;
    this.functionUser = this.navigateEdits;
    this.loadModuli();
   } else {
     this.effettuaControllo();
   }

}


async effettuaControllo()  {
  console.log('checkFunctiobylevel - inizio: -- rotta ' + this.rotta + ' level:' + this.level);



  let rc =  await  this.abilfunctioneService.getFunctionbylevel(this.level,this.rotta).subscribe(
         res => {
            this.abilfunctione = res['data'];
            this.nRecord = res['number'];
                          console.log('checkFunctiobylevel - letto ok: -- n. rec ' + res['number']);

                          console.log('funxione.enabledNull' + this.abilfunctione.enabledNull);
                          console.log('funxione.enabledEdit' + this.abilfunctione.enabledEdit);
                          console.log('funxione.enabledInqu' + this.abilfunctione.enabledInqu);
            if(this.nRecord === 0) {
               this.type = "error";
               this.Message = 'Nessun Modulo presente';
               this.showNotification(this.type, this.Message);
               this.alertSuccess = false;
            } else {
              if(this.abilfunctione.enabledNull === 'Y') {
                this.type = "error";
                this.Message = 'Applicazione non ancora attivata';
                this.showNotification(this.type, this.Message);
              }
              if(this.abilfunctione.enabledEdit === 'Y') {
                console.log('checkFunctiobylevel - test1');
                this.functionUser = this.navigateEdits;
                this.enabledFunc = true;
              }
              if(this.abilfunctione.enabledInqu === 'Y') {
                console.log('checkFunctiobylevel - test2');
                this.functionUser = this.navigateInqu;
                this.enabledFunc = true;
              }
                             console.log('checkFunctiobylevel - fine: -- functionUser ' + this.functionUser);

                             console.log('enabledFunc' + this.enabledFunc + ' funzione impostata: ' + this.functionUser);
              if(this.enabledFunc === true) {
                  this.loadModuli();
                }
            }
        },
        error => {
           alert('Manifestazioni  -- loadManifestazioni - errore: ' + error.message);
           console.log(error);
           this.Message = error.message;
           this.alertSuccess = false;
        });

}






Nuovo() {
  this.router.navigate(['modulis/new']);
}


/**
  Show a notification

 @param {string} type Notification type
 @param {string} message Notification message
*/

 /*   legenda typo messaggio esito

    this.type = 'error';    --- operazione in errore
    this.type = 'success';  --- operazione conclusa correttamente
    this.type = 'default';
    this.type = 'info';
    this.type = 'warning';

   */

showNotification( type: string, message: string ): void {
  // alert('sono in showNot - ' + message);
  this.notifier.notify( type, message );
  console.log(`sono in showNotification  ${type}`);
  }

    loadModuli() {

      this.moduloService.getAlls().subscribe(
        res => {
              this.moduli = res['data'];
           },
          error => {
             alert('Moduli  -- loadModuli - errore: ' + error.message);
             console.log(error);
             this.Message = error.message;
             this.alertSuccess = false;
          });
    }





    update(modul:Modulo) {
      console.log('update - da fare');
    }

/*

ex  onInit     buttare

 this.router.url;
  this.href = this.router.url;
  console.log('href: ..................................  ' + this.href);
  console.log(this.href.includes(this.searchEdit));
  console.log(this.href.includes(this.searchElenco));
  console.log(this.href.includes(this.searchInqu));
  console.log(this.href.includes(this.searchNew));

  // attenzione
  // su navbar dopo login imposto la localstorage
  // in funzione del valore della user_ruolo effettuo la valorizzazione
  // della visibilità del campo

  // test
  this.testRuoloday = -1; // ----------------------------------------   test   test   test  test
  localStorage.setItem('user_ruolo', String(this.testRuoloday));

  if(this.testRuoloday === -1) {
    this.functionUser = this.navigateEdits;
  }
  if(this.testRuoloday === 0) {
    this.functionUser = this.navigateInqu;
  }
  if(this.testRuoloday === 1) {
    this.functionUser = this.navigateEdit;
  }


*/


/*

    delete(id:any) {
      console.log(id,'cancelllllllllllllllllllllllo --->');
      this.moduloService.delete(id).subscribe((res)=> {
        console.log(res,'res- delete -->');

        this.type = 'error';
        this.Message = res.message;
        this.showNotification(this.type, this.Message);
      });
    }

*/


}
