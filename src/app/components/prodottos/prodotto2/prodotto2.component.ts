import { Component, Input, OnInit } from '@angular/core';
// service
import { ProdottoService} from './../../../services/prodotto.service';
// classes
import { Prodotto} from '../../../classes/Prodotto';
import { faUserEdit, faTrash, faInfo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';


@Component({
  selector: 'tr[app-prodotto2]',
  templateUrl: './prodotto2.component.html',
  styleUrls: ['./prodotto2.component.css']
})
export class Prodotto2Component implements OnInit {

   // variabili passate dal componente padre
   @Input('prodotto2-data') prodotto: Prodotto;
   @Input('prodotto2-prog') i: number;

   faUserEdit = faUserEdit;
   faTrash = faTrash;
   faInfo = faInfo;
   faInfoCircle = faInfoCircle;

 // -----
   public textMessage1 = '';
   public textMessage2 = '';
   public textUser = '';
   public headerPopup = '';
   public perDebug = 'Prodotto passato: ';
   public Message = '';
   public presenti = false;
   public isVisible = false;
   public alertSuccess = false;

   public nRec = 0;


   constructor(private prodottoService: ProdottoService,
               private route: Router) { }

   ngOnInit(): void {

    //   per gestire eventuale popup
    this.headerPopup = 'Situazione Giornaliera Prodotti';
    this.textMessage1 = '?????????? ';
 //   this.textUser = this.messa.demessa;
    this.textMessage2 = 'Registrazione non possibile';

   // this.loadManifestazioni();

 }

}
