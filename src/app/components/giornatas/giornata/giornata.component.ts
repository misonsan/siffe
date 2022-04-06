import { Component, Input, OnInit } from '@angular/core';
import { GiornataService } from './../../../services/giornata.service';
import { ProdottoService } from './../../../services/prodotto.service';
import { PersonaService } from './../../../services/persona.service';
import { Giornata} from '../../../classes/Giornata';
import { faUserEdit, faTrash, faInfo, faEuroSign, faUtensils, faStream, faChartBar, faList, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
// per gestire inserimento/Modifica con popup
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
//  import { GiornatapopComponent } from './../../components/popups/giornatapop/giornatapop.component';   gestire non con popup
import { DatePipe } from '@angular/common';
// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'tr[app-giornata]',
  templateUrl: './giornata.component.html',
  styleUrls: ['./giornata.component.css']
})
export class GiornataComponent implements OnInit {

  @Input('giornata-data') giornata: Giornata;
  @Input('giornata-prog') i: number;
  @Input('functionUser') functionUser: string;

  faUserEdit = faUserEdit;
  faTrash = faTrash;
  faInfo = faInfo;
  faEuroSign = faEuroSign;
  faUtensils = faUtensils;
  faStream = faStream;
  faChartBar = faChartBar;
  faList = faList;
  faCalendarAlt = faCalendarAlt;

  routeGiornata = '';

  private dataOdierna: Date;
  private datepipe: DatePipe = new DatePipe('en-US');

  private dt1: string;
  private dt2: string;

  // variabili per visualizzazione messaggio di esito con notifier
  public type = '';
  public Message = '';


  constructor(public modal: NgbModal,
              private giornataService: GiornataService,
              private prodottoService: ProdottoService,
              private personaService: PersonaService,
              private route: Router,
              public notifier: NotifierService) {
                this.notifier = notifier;
              }


  ngOnInit(): void {
    this.dataOdierna = new Date();
  }

  // ---------  funziona
  showGiornataDetail(giornata: Giornata) {


    this.routeGiornata = '/giornata/Info/' + this.functionUser + '/' + giornata.id + '/' + giornata.idManifestazione;

    console.log('showGiornataDetail - rotta: ' + this.routeGiornata);


    localStorage.removeItem("SanfraGiornata");
    localStorage.setItem("SanfraGiornata", this.routeGiornata);
    this.route.navigate([`${this.routeGiornata}`]);


    }

    showGiornataDetailCassa(giornata: Giornata) {

      this.dt1 = this.datepipe.transform(giornata.dtGiornata, 'dd/MM/yyyy');
      this.dt2 = this.datepipe.transform(this.dataOdierna, 'dd/MM/yyyy');


      if(this.dt1 !== this.dt2) {

        this.type = 'error';
        this.Message = 'Data selezionata non Operativa';
        this.showNotification(this.type, this.Message);
        return;
      }

      this.routeGiornata = '/giornata/Cassa/' + this.functionUser + '/' + giornata.id + '/' + giornata.idManifestazione;
      localStorage.removeItem("SanfraGiornata");
      localStorage.setItem("SanfraGiornata", this.routeGiornata);
      this.route.navigate([`${this.routeGiornata}`]);

      }

      showGiornataDetailCassa1(giornata: Giornata) {

        this.dt1 = this.datepipe.transform(giornata.dtGiornata, 'dd/MM/yyyy');
        this.dt2 = this.datepipe.transform(this.dataOdierna, 'dd/MM/yyyy');


        if(this.dt1 !== this.dt2) {

          this.type = 'error';
          this.Message = 'Data selezionata non Operativa';
          this.showNotification(this.type, this.Message);
          return;
        }

        this.routeGiornata = '/giornata/Cassa1/' + this.functionUser + '/' + giornata.id + '/' + giornata.idManifestazione;
        localStorage.removeItem("SanfraGiornata");
        localStorage.setItem("SanfraGiornata", this.routeGiornata);
        this.route.navigate([`${this.routeGiornata}`]);

        }





      showGiornataDetailProdotti(giornata: Giornata) {

        this.dt1 = this.datepipe.transform(giornata.dtGiornata, 'dd/MM/yyyy');
        this.dt2 = this.datepipe.transform(this.dataOdierna, 'dd/MM/yyyy');


        if(this.dt1 !== this.dt2) {

          this.type = 'error';
          this.Message = 'Data selezionata non Operativa';
          this.showNotification(this.type, this.Message);
          return;
        }

      // se statoUtenti = 0 inizializzo tutti i prodotti sul campo amenu il carattere * per inizializzazione delle scelte
        if(giornata.statoMagazzino === 0) {
          this.prodottoService.resettaamenu().subscribe(
            resp => {
                if(resp['Rc'] === 'OK') {
                  localStorage.removeItem("SanfraGiornata");
                  localStorage.setItem('SanfraGiornata', JSON.stringify(this.giornata));
                  // vecchia personalizzazione - non + valida dal 10/03/2021
                 // localStorage.setItem("SanfraGiornata", this.routeGiornata);
                // --------  this.route.navigate(['giormanifpersone', giornata.id]);
                }
            },
            error => {
              this.type = 'error';
              this.Message = error.message;
              this.showNotification(this.type, this.Message);
              return;
            }
          );
       }
        this.routeGiornata = '/giornata/Prod/' + this.functionUser + '/' + giornata.id + '/' + giornata.idManifestazione;
        localStorage.removeItem("SanfraGiornata");
        localStorage.setItem("SanfraGiornata", this.routeGiornata);
        this.route.navigate([`${this.routeGiornata}`]);

        /* ----------------------------------------   attenzione
             sospesa temporaneamente fino a quando non completato prodottoservice

        if(giornata.statoMagazzino === 0) {
            this.prodottoService.resettaamenu().subscribe(
              resp => {
                  if(resp['Rc'] === 'OK') {
                    localStorage.removeItem("SanfraGiornata");
                    localStorage.setItem('SanfraGiornata', JSON.stringify(this.giornata));
                    // vecchia personalizzazione - non + valida dal 10/03/2021
                   // localStorage.setItem("SanfraGiornata", this.routeGiornata);
                 }
              },
              error => {
                this.type = 'error';
                this.Message = error.message;
                this.showNotification(this.type, this.Message);
                return;
              });
           }
           this.route.navigate(['giormanifprodotti', giornata.id]);

*/






        /*   vecchia modalità di passaggio a form di dettaglio  prima del 2021/05/18
       this.routeGiornata = 'giormanif/' + giornata.id;

       localStorage.removeItem("SanfraGiornata");
       localStorage.setItem('SanfraGiornata', JSON.stringify(this.giornata));
       // vecchia personalizzazione - non + valida dal 10/03/2021
      // localStorage.setItem("SanfraGiornata", this.routeGiornata);
       this.route.navigate(['giormanifprodotti', giornata.id]);
*/


       }


       showGiornataDetailPersone(giornata: Giornata) {


        this.dt1 = this.datepipe.transform(giornata.dtGiornata, 'dd/MM/yyyy');
        this.dt2 = this.datepipe.transform(this.dataOdierna, 'dd/MM/yyyy');


        if(this.dt1 !== this.dt2) {

          this.type = 'error';
          this.Message = 'Data selezionata non Operativa';
          this.showNotification(this.type, this.Message);
          return;

      //    alert('data attuale non operativa dtGiornata: ' + this.dt1 + ' dataodierna: ' + this.dt2);
      //    return;
        }

      // se statoUtenti = 0 inizializzo tutti i prodotti sul campo amenu il carattere * per inizializzazione delle scelte
        if(giornata.statoUtenti === 0) {
          /*   resettare il flag persone
          this.prodottoService.resettaamenu().subscribe(
            resp => {
                if(resp['Rc'] === 'OK') {
                  localStorage.removeItem("SanfraGiornata");
                  localStorage.setItem('SanfraGiornata', JSON.stringify(this.giornata));
                  // vecchia personalizzazione - non + valida dal 10/03/2021
                 // localStorage.setItem("SanfraGiornata", this.routeGiornata);
                // --------  this.route.navigate(['giormanifpersone', giornata.id]);
                }
            },
            error => {
              this.type = 'error';
              this.Message = error.message;
              this.showNotification(this.type, this.Message);
              return;
            });*/
       }
        this.routeGiornata = '/giornata/Pers/' + this.functionUser + '/' + giornata.id + '/' + giornata.idManifestazione;
        localStorage.removeItem("SanfraGiornata");
        localStorage.setItem("SanfraGiornata", this.routeGiornata);
        this.route.navigate([`${this.routeGiornata}`]);
       }



       showGiornataDetailCommande(giornata: Giornata) {

        this.dt1 = this.datepipe.transform(giornata.dtGiornata, 'dd/MM/yyyy');
        this.dt2 = this.datepipe.transform(this.dataOdierna, 'dd/MM/yyyy');

        if(this.dt1 !== this.dt2) {

          this.type = 'error';
          this.Message = 'Data selezionata non Operativa';
          this.showNotification(this.type, this.Message);
          return;
        }

      // controllo se giornata aperta

        if(this.giornata.stato !==  2) {

          this.type = 'error';
          this.Message = 'Giornata non Operativa - Registrazione commande non consentita';
          this.showNotification(this.type, this.Message);
          return;
        }


        this.routeGiornata = '/giornata/Commande/' + this.functionUser + '/' + giornata.id + '/' + giornata.idManifestazione;
        localStorage.removeItem("SanfraGiornata");
        localStorage.setItem("SanfraGiornata", this.routeGiornata);
        this.route.navigate([`${this.routeGiornata}`]);


      }

      // visualizzo la popup con la selezione della giornata
      showGiornata(giornata: Giornata) {

      const test = 'giornata/edits/' + giornata.id + '/' + this.giornata.idManifestazione + '/' + this.giornata.dtGiornata;
      console.log('go merda ---------->  ' + test);

      alert('effettuo il lancio al dettaglio ');

      if(this.functionUser === 'Inqu') {
        this.route.navigate(['giornata/inqu/' + giornata.id + '/' + this.giornata.idManifestazione]);
       }
      if(this.functionUser === 'Edit') {
        this.route.navigate(['giornata/edit/' + giornata.id + '/' + this.giornata.idManifestazione]);
       }
      if(this.functionUser === 'Edits') {
        this.route.navigate(['giornata/edits/' + giornata.id + '/' + this.giornata.idManifestazione]);
       }


      /*    se effettuo uso con form popup

        const ref = this.modal.open(GiornatapopComponent, {size:'lg'});
        ref.componentInstance.selectedUser = giornata;

        ref.result.then(
          (yes) => {
            console.log('Click YES');
          },
          (cancel) => {
            console.log('click Cancel');
          }
        )
*/

      }

      /**
* Show a notification
*
* @param {string} type    Notification type
* @param {string} message Notification message
*/

showNotification( type: string, message: string ): void {
  this.notifier.notify( type, message );
}

/*      da controllare   -- è da buttare

      if(giornata.statoUtenti === 0) {
          //  mettere reset persone
          /*
          this.prodottoService.resettaamenu().subscribe(
            resp => {
                if(resp['Rc'] === 'OK') {
                  localStorage.removeItem("SanfraGiornata");
                  localStorage.setItem('SanfraGiornata', JSON.stringify(this.giornata));
                  // vecchia personalizzazione - non + valida dal 10/03/2021
                 // localStorage.setItem("SanfraGiornata", this.routeGiornata);
                // --------  this.route.navigate(['giormanifpersone', giornata.id]);
                }
            },
            error => {
              this.type = 'error';
              this.Message = error.message;
              this.showNotification(this.type, this.Message);
              return;
            }
          );
       }

       this.routeGiornata = '/giornata/Pers/' + this.functionUser + '/' + giornata.id + '/' + giornata.idManifestazione;
       localStorage.removeItem("SanfraGiornata");
       localStorage.setItem("SanfraGiornata", this.routeGiornata);
       this.route.navigate([`${this.routeGiornata}`]);




*/




}

