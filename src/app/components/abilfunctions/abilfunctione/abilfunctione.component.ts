import { Component, Input, OnInit } from '@angular/core';
import { AbilfunctioneService } from '../../../services/abilfunctione.service';
import { Abilfunctione} from '../../../classes/Abilfunctione';
import { faUserEdit, faTrash, faInfo, faInfoCircle, faWindowClose, faSave } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'tr[app-abilfunctione]',
  templateUrl: './abilfunctione.component.html',
  styleUrls: ['./abilfunctione.component.css']
})
export class AbilfunctioneComponent implements OnInit {

    // variabili passate dal componente padre
    @Input('abil-data') abil: Abilfunctione;
    @Input('abil-prog') i: number;


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

constructor(private abilfunctioneService: AbilfunctioneService,
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


  navigate(abilitazione: Abilfunctione) {

    console.log(`Abilfunctione - navigate: ${JSON.stringify(abilitazione)}`);


        this.route.navigate(['abilfunctione/edits/' + abilitazione.id]);
      }
  }



