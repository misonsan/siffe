import { Component, OnInit } from '@angular/core';

import { faPlusSquare, faSearch, faInfoCircle, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService} from '../../../services/user.service';
import { AbilitazioneService } from '../../../services/abilitazione.service';
import { Abilitazione} from '../../../classes/abilitazione';
import { User } from '../../../classes/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-abilitazioni',
  templateUrl: './abilitazioni.component.html',
  styleUrls: ['./abilitazioni.component.css']
})
export class AbilitazioniComponent implements OnInit {

  public d_manifestazione: string;
  public title = "elenco abilitazioni concesse - abilitazioni";
  // icone
  faPlusSquare = faPlusSquare;
  faSearch = faSearch;
  faInfoCircle = faInfoCircle;
  faUserEdit = faUserEdit;

  public abilitazioni: Abilitazione[] = [];
  public abilitazione: Abilitazione;
  public user: User;
  public nRecMan = 0;
  public nRec = 0;
  public trovatoRec = false;
  public tipoRichiesta = '?';
  public ricManif = 0;
  public validSearch = false;
  private textMessage = '';

  options = [
    'Tutte',
    'Nessuna',
    'Inqu',
    'Edit'
  ];

  public Message = '';
  public isVisible = false;
  public alertSuccess = false;

   // per paginazone
p: number = 1;


//  posso aprire la popoup con dimensioni diverse:
//  this.modal.open(modalProdotto,{size:'sm'});    <----  piccola
//  this.modal.open(modalProdotto,{size:'lg'});    <----  ampia
//  this.modal.open(modalProdotto,{size:'xl'});    <----  grandissima

  constructor(private userService: UserService,
              private abilitazioneService: AbilitazioneService,
              private route: ActivatedRoute,
              private router: Router,
              private modal: NgbModal) { }

  ngOnInit(): void {
    this.validSearch = false;
    this.route.paramMap.subscribe(p => {
      // leggo i dati della messa
      this.loadUser(+p.get('id'));
          // -------  leggo tutte le abilitazioni concesse all'utente
        //  this.loadAbilitazionibyUser(+p.get('id'));
      });
  }

// recupero i dati dell Utente
async loadUser(id: number) {
  const rc = await  this.userService.getuser(id).subscribe(
     response => {
       this.user = response['data'];
       this.loadAbilitazionibyUser(id);
   },
   error => {
      alert('Abilitazioni  --loadUser: ' + error.message);
      console.log(error);
   }
 );

}

// metodo fatto da Moreno per selezionare le giornate della manifestazione

async loadAbilitazionibyUser(id: number) {

   this.trovatoRec = false;
   this.isVisible = true;
   const rc = await  this.abilitazioneService.getAllbyUser(id).subscribe(
       response => {
          console.log('frontend - loadAbilitazionibyuser ' + response['data']);
          this.abilitazioni = response['data'];
          this.nRec = response['number'];
          this.textMessage = response['message'];
          this.trovatoRec = true;
          this.alertSuccess = true;
          this.Message = response['message'] //'Situazione Attuale  abilitazioni rilasciate';
          /*
          if(this.nRec > 0){
            this.Message = 'Situazione Attuale';
          }  */

       //   alert('loadGiornateFromManif - dovrei aver letto le giornate' + this.nRec + ' Messaggio: ' + this.textMessage);
       //   console.log('loadGiornateFromManif - dovrei aver letto le giornate' + this.nRec + ' Messaggio: ' + this.textMessage);
      },
      error => {
         alert('Abilitazioni  -- loadAbilitazionibyUser: ' + error.message);
         console.log(error);
         this.alertSuccess = false;
         this.Message = error.message;
      }
    );
}



// imposto il filtro di ricerca dei fedeli
onSelectionChange(timanif: string)   {
  this.tipoRichiesta = timanif.substring(0,1);
// per impostare il campo corretto di ricerca per i fedele entrati
  this.validSearch = true;

}



registra() {
  alert('funzione da fare - vedi sif2020')
}



}
