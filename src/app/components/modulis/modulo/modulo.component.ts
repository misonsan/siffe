import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ModuloService } from '../../../services/modulo.service';
import { Modulo } from '../../../classes/Modulo';
import { faUserEdit, faTrash, faInfo, faInfoCircle, faWindowClose, faSave } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'tr[app-modulo]',
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.css']
})
export class ModuloComponent implements OnInit {

    // variabili passate dal componente padre
    @Input('modulo-data') modul: Modulo;
    @Input('modulo-prog') i: number;
    @Input('functionUser') functionUser: string;


    modulo: Modulo;

     // icone
    faUserEdit = faUserEdit;
    faTrash = faTrash;
    faInfo = faInfo;
    faInfoCircle = faInfoCircle;
    faSave = faSave;
    faWindowClose = faWindowClose;

    // -----
    public textMessage1 = '';
    public textMessage2 = '';
    public textUser = '';
    public headerPopup = '';
    public perDebug = 'utente passato: ';
    public Message = '';
    public presenti = false;
    public isVisible = false;
    public alertSuccess = false;
    public function = 0;
    public nRec = 0;

// da users

 // variabili per gestione inqu/edit/new

 public href = '';
 public functionInqu = false;
 public functionEdit = false;
 public functionNew = false;
 public functionElenco = false;

 public searchInqu = 'show';
 public searchEdit = 'edit';
 public searchNew = 'new';
 public searchElenco = 'read';

 // funzioni di navigazione
 public navigateInqu = 'inqu';
 public navigateEdit = 'edit';
 public navigateEdits = 'edits';
 public navigateNew = 'new';

 closeResult = '';    // per la cancellazione
 public type = '';


//  fine da users

constructor(private modalService: NgbModal,
            private moduloService: ModuloService,
            private route: Router,
            private notifier: NotifierService) {
              this.notifier = notifier;
            }



ngOnInit(): void {

   //   per gestire eventuale popup
   this.headerPopup = 'Abilitazioni User';
   this.textMessage1 = '?????????? ';
//   this.textUser = this.messa.demessa;
   this.textMessage2 = 'Registrazione non possibile';

  // this.loadManifestazioni();

}


  editUserDetail(modulo) {
    this.function = parseInt(localStorage.getItem('user_ruolo'));
    if(this.function === -1) {
      this.route.navigate(['modulis/' + modulo.id + '/edit']);
    } else {
      this.route.navigate(['modulis/' + modulo.id + '/inqu']);
    }
  }


  navigate(pathNavigate: string, modulo: Modulo) {

    console.log(`navigate ---- funzione: ${pathNavigate}`);

    switch (pathNavigate) {

         case 'inqu':
       //  let aa = this.router.navigate(['/users/id/inqu', id]);
       //  console.log('aaaaa ' + aa);

        this.route.navigate(['modulis/inqu/' + modulo.id]);
        break;
      case 'edit':
        this.route.navigate(['modulis/edit/' + modulo.id]);
        break;
      case 'edits':
        this.route.navigate(['modulis/edits/' + modulo.id]);
        break;
      default:
        alert('scelta errata \n navigazione non possibile');
        break;
    }
  }

  abilitazioni()
 {
  this.route.navigate(['abilfunctione']);
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
        this.cancella(this.modul);
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


cancella(modulo: Modulo) {

this.moduloService.delete(modulo.id).subscribe(
    response => {
      if(response['rc'] === 'ok') {
        window.location.reload();  // per fare reload dopo cancellazione    --------   funziona  !!
        this.isVisible = true;
        this.alertSuccess = true;
        this.type = 'success';
        this.Message = 'Modulo cancellato correttamente';
        this.showNotification(this.type, this.Message);
      }
  },
  error =>
      {
        this.isVisible = true;
        this.alertSuccess = false;
        this.type = 'error';
        this.Message = 'Errore cancellazione User' + '\n' + error.message;
        this.showNotification(this.type, this.Message);
        console.log(error);
      });
}



/*
* Show a notification
*
* @param {string} type    Notification type
* @param {string} message Notification message
*/

showNotification( type: string, message: string ): void {
  //   alert('sono in showNot - ' + message);
     this.notifier.notify( type, message );
   }


}
