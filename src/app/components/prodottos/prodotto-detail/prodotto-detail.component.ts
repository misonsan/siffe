import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faPlusSquare, faSearch, faSave, faUserEdit, faMinus, faPlus, faWindowClose, faTrash, faReply } from '@fortawesome/free-solid-svg-icons';

import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
// component
import { Prodotto } from '../../../classes/Prodotto';
import { TstatoProdotto } from '../../../classes/T_stato_prodotto';
import { TcompetenzaProdotto } from '../../../classes/T_competenza_prodotto';
import { TcategoriaProdotto } from '../../../classes/T_categoria_prodotto';
import { Ttipologia } from '../../../classes/T_tipologia';
// service
import { ProdottoService } from './../../../services/prodotto.service';
import { TstatoprodottoService } from './../../../services/tstatoprodotto.service';
import { TcategoriaProdottoService } from './../../../services/tcategoria-prodotto.service';
import { TcompetenzaProdottoService } from './../../../services/tcompetenza-prodotto.service';
import { TtipologiaService } from './../../../services/ttipologia.service';
import { UploadFilesService } from './../../../services/upload-files.service';

import { CtrfuncService } from '../../../services/ctrfunc.service';

// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-prodotto-detail',
  templateUrl: './prodotto-detail.component.html',
  styleUrls: ['./prodotto-detail.component.css']
})
export class ProdottoDetailComponent implements OnInit {

  // per upload image
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  messageimage = '';
  fileInfos?: Observable<any>;
  messageupload = '';
  public folderImage = '';   // salvo la cartella in cui salvare immagine
// per upload image -- fine

  prodotto: Prodotto;
  stati: TstatoProdotto[] = [];

  tipologie: Ttipologia[] = [];
  categorie: TcategoriaProdotto[] = [];
  competenze: TcompetenzaProdotto[] = [];

  public title = "Gestione Prodotto";

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
public idProdotto = 0;
public functionSelected = '';

public selectedTit = 0;
public selectedRuo = 0;
public selectedweb = 0;
public selectedSta = 0;

// per gestione abilitazione funzioni con service Moreno

public functionUrl = '';


public searchInqu = 'Inqu';
public searchEdit = 'Edit';
public searchEdits = 'Edits';
public searchNew = 'New';

public functionUrlUp = '';
public functionUserUp = '';
public selectedStato = 0;
public selectedCompetenza = 0;
public selectedCategoria = 0;
public selectedTipologia = 0;

constructor(public modalService: NgbModal,
            private prodottoService: ProdottoService,
            private tstatoprodottoService: TstatoprodottoService,
            private tcategoriaProdottoService: TcategoriaProdottoService,
            private tcompetenzaProdottoService: TcompetenzaProdottoService,
            private ttipologiaService: TtipologiaService,
            private ctrfuncService: CtrfuncService,
            private uploadService: UploadFilesService,
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

            // console.log('frontend - checkFunctionbylevel -- step_01');

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
                   // leggo le tabelle correlate
                   this.loadstatiprodotto();
                   this.loadcategorie();
                   this.loadcompetenze();
                   this.loadtipologie();




                   if(this.functionNew) {
                     this.prodotto = new Prodotto();
                     this.prodotto.key_utenti_operation = +localStorage.getItem('id');
                     this.title = 'Inserimento Prodotto';
                     this.fase = 'N';
                     this.Message = `Inserire i dati del prodotto`;
                   } else {
                       this.route.paramMap.subscribe(p => {
                         this.idProdotto = +p.get('id');
                         console.log('id recuperato: ' + this.idProdotto);
                         // -------  leggo i dati della giornata

                         this.loadProdotto(this.idProdotto);
                         if(this.functionEdit || this.functionEdits) {
                           this.title = 'Aggiornamento Prodotto';
                           this.fase = 'M';
                          } else {
                           this.title = 'Visualizzazione Prodotto';
                           this.fase = 'I';
                          }
                         this.Message = 'Situazione Attuale Prodotto';
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
                     this.Message = 'Errore cancellazione Prodotto' + '\n' + error.message;
                     this.showNotification(this.type, this.Message);
                     console.log(error);
                   });

            }




      async  loadstatiprodotto() {

      let rc = await this.tstatoprodottoService.getAll().subscribe(
          resp => {
                console.log('statiprodotto: ' + JSON.stringify(resp['data']));
                if(resp['rc'] === 'ok') {
                  this.stati = resp['data'];
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

            async  loadcategorie() {

              let rc = await this.tcategoriaProdottoService.getAll().subscribe(
                  resp => {
                        console.log('statiprodotto: ' + JSON.stringify(resp['data']));
                        if(resp['rc'] === 'ok') {
                          this.categorie = resp['data'];
                        }
                     },
                  error => {
                       alert('sono in loadcategorie');
                       this.isVisible = true;
                       this.alertSuccess = false;
                       console.log('loadcategorie - errore: ' + error);
                       this.type = 'error';
                       this.Message = error.message;
                       this.alertSuccess = false;
                   });
               }


               async  loadcompetenze() {

                let rc = await this.tcompetenzaProdottoService.getAll().subscribe(
                    resp => {
                          console.log('statiprodotto: ' + JSON.stringify(resp['data']));
                          if(resp['rc'] === 'ok') {
                            this.competenze = resp['data'];
                          }
                       },
                    error => {
                         alert('sono in loadcompetenze');
                         this.isVisible = true;
                         this.alertSuccess = false;
                         console.log('loadcompetenze - errore: ' + error);
                         this.type = 'error';
                         this.Message = error.message;
                         this.alertSuccess = false;
                     });
                 }

                 async  loadtipologie() {

                  let rc = await this.ttipologiaService.getAll().subscribe(
                      resp => {
                            console.log('statiprodotto: ' + JSON.stringify(resp['data']));
                            if(resp['rc'] === 'ok') {
                              this.tipologie = resp['data'];
                            }
                         },
                      error => {
                           alert('sono in loadcompetenze');
                           this.isVisible = true;
                           this.alertSuccess = false;
                           console.log('loadcompetenze - errore: ' + error);
                           this.type = 'error';
                           this.Message = error.message;
                           this.alertSuccess = false;
                       });
                   }


       async     loadProdotto(id: number) {
          console.log(`loadProdotto - appena entrato`);
          let rc = await this.prodottoService.getProdotto(id).subscribe(
               resp => {
                     console.log(`loadProdotto: ${resp['data']}`);
                     this.prodotto = resp['data'];
                     this.prodotto.key_utenti_operation = +localStorage.getItem('id');

                     console.log('fatto lettura prodotto: ' + this.prodotto.id);
                     this.type = 'success';
                     this.Message = 'situazione attuale Prodotto';
                     this.alertSuccess = true;
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

 async conferma() {
   console.log('conferma - fase: ' + this.fase);

   switch (this.fase)  {
       case 'N':
         let rc = await  this.prodottoService.createProdotto(this.prodotto).subscribe(
         res => {
               this.prodotto = res['data'];
               this.type = 'success';
               this.Message =  res['message'];                               //'utente  creato con successo';
               this.alertSuccess = true;
            },
           error => {
              console.log(error);
              this.type = 'error';
              this.Message = error.message;
              this.alertSuccess = false;
           });
         break;
     case 'M':

     console.log(`Prodotto-detail -- conferma (upd) : ${JSON.stringify(this.prodotto)}`);


     let rc1 = await this.prodottoService.updateProdotto(this.prodotto).subscribe(
         res => {
               this.prodotto = res['data'];
               this.type = 'success';
               this.Message = res['message'];          //'utente aggiornato con successo del cazzo';
               this.alertSuccess = true;
               this.router.navigate(['/prodotto']);
            },
           error => {
              console.log(error);
              this.type = 'error';
              this.Message = error.message;
              this.alertSuccess = false;
           });
         break;
     default:
       alert('nav - funzione non ancora attivata');
       break;
   }
   this.showNotification(this.type, this.Message);
 }

 reset() {
   switch (this.fase)  {
       case 'N':
       this.prodotto = new Prodotto();
       this.type = 'success';
       this.Message = 'Inserire i dati della Prodotto';
       this.alertSuccess = true;
       break;
     case 'M':
       this.prodottoService.getProdotto(this.prodotto.id).subscribe(
       res => {
             this.prodotto = res['data'];
             this.type = 'success';
             this.Message = 'situazione attuale Prodotto';
             this.alertSuccess = true;
          },
         error => {
            console.log(error);
            this.type = 'error';
            this.Message = error.message;
            this.alertSuccess = false;
         });
       break;
     default:
       alert('nav - funzione non ancora attivata');
       break;
   }
   this.showNotification(this.type, this.Message);
 }

 goback() {
   this.router.navigate(['prodotto']);
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



  open(content) {
   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
     this.closeResult = `Closed with: ${result}`;
     // alert('controllo la modalità di chiusura della popup - chiusura su tasto save: ' + result);
     if(result ===  'Cancel click') {
        this.cancellazioneAbort();
     }
     if(result ===  'Delete click') {
       // gestire uscita da popup
       this.cancellaUser(this.prodotto);
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


 cancellaUser(prodotto: Prodotto) {

   this.prodottoService.deleteProdotto(prodotto).subscribe(
       response => {
         if(response['ok']) {
           this.isVisible = true;
           this.alertSuccess = true;
           this.type = 'success';
           this.Message = 'Prodotto cancellato correttamente';
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
             this.Message = 'Prodotto non cancellabile - presenti legami con altre tabelle';
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

 onSelectedStato(selectedValue: number) {
  //  alert('selezionato: ' + selectedValue);
   if(selectedValue ===  0) {
     this.type = 'error';
     this.Message = 'selezione non corrette';
     this.showNotification(this.type, this.Message);
     this.alertSuccess = false;
     this.isVisible = true;
     return;
  } else {
   this.selectedStato = selectedValue;
  }

}



onSelectedTipologia(selectedValue: number) {
  //  alert('selezionato: ' + selectedValue);
   if(selectedValue ===  0) {
     this.type = 'error';
     this.Message = 'selezione non corrette';
     this.showNotification(this.type, this.Message);
     this.alertSuccess = false;
     this.isVisible = true;
     return;
  } else {
   this.selectedTipologia = selectedValue;
  }

}

onSelectedCategoria(selectedValue: number) {
  //  alert('selezionato: ' + selectedValue);
   if(selectedValue ===  0) {
     this.type = 'error';
     this.Message = 'selezione non corrette';
     this.showNotification(this.type, this.Message);
     this.alertSuccess = false;
     this.isVisible = true;
     return;
  } else {
   this.selectedCategoria = selectedValue;
  }

}

onSlectedCompetenza(selectedValue: number) {
  //  alert('selezionato: ' + selectedValue);
   if(selectedValue ===  0) {
     this.type = 'error';
     this.Message = 'selezione non corrette';
     this.showNotification(this.type, this.Message);
     this.alertSuccess = false;
     this.isVisible = true;
     return;
  } else {
   this.selectedCompetenza = selectedValue;
  }

}


 // --------------   metodi per upload

 selectFile(event: any): void {
  this.selectedFiles = event.target.files;
  console.log('selectfile - nome file: ' + JSON.stringify(this.selectedFiles));
}

upload(): void {
  this.progress = 0;

  if (this.selectedFiles) {
    const file: File | null = this.selectedFiles.item(0);
    console.log('.............................................. upload - file pronto per upload in backend: ' + file.name);


    if (file) {
      this.prodotto.photo = file.name;   // salvo su record il nome del file selezionato
      this.folderImage = 'products';    // imposto la cartella in cui passare
      this.currentFile = file;

      this.uploadService.upload(this.currentFile, this.folderImage).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.messageimage = event.body.message;
            this.fileInfos = this.uploadService.getFiles();
          }
        },
        (err: any) => {
          console.log(err);
          this.progress = 0;

          if (err.error && err.error.message) {
            this.messageimage = err.error.message;
          } else {
            this.messageimage = 'Could not upload the file!';
          }

          this.currentFile = undefined;
        });
    }

    this.selectedFiles = undefined;
  }
}






}
