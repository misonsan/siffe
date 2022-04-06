import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbilitazioneService } from '../../../services/abilitazione.service';
import { Abilitazione} from '../../../classes/abilitazione';
import { faUserEdit, faTrash, faInfo, faInfoCircle, faWindowClose, faSave } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'tr[app-abilitazione]',
  templateUrl: './abilitazione.component.html',
  styleUrls: ['./abilitazione.component.css']
})
export class AbilitazioneComponent implements OnInit {

    // variabili passate dal componente padre
@Input('user-data') abil: Abilitazione;
@Input('user-prog') i: number;







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



//  fine da users

constructor(private abilitazioneService: AbilitazioneService,
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

navigate(abilitazione: Abilitazione) {

  console.log(`navigate ---- esegui route.navigate`);

    this.route.navigate(['abilitaziones/' + abilitazione.id +'/edit' ]);

  }
}



