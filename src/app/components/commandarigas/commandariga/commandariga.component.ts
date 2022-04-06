import { Component, Input, OnInit } from '@angular/core';
import { Commandariga} from '../../../classes/Commandariga';
import { Ttipologia } from '../../../classes/T_tipologia';
// service
import { TtipologiaService} from '../../../services/ttipologia.service';
// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'tr[app-commandariga]',
  templateUrl: './commandariga.component.html',
  styleUrls: ['./commandariga.component.css']
})
export class CommandarigaComponent implements OnInit {

  public tipologia: Ttipologia;
  public tipologianull = new Ttipologia();

  @Input('commandariga-data') commandariga: Commandariga;
  @Input('commandariga-prog') i: number;

  public idTipologia = 0;
  // variabili per visualizzazione messaggio di esito con notifier
  public type = '';
  public Message = '';


  constructor(private ttipologiaService: TtipologiaService,
              private notifier: NotifierService) {
                    this.notifier = notifier;
              }

  ngOnInit(): void {

      console.log('------------->  commandariga  -- OnInit ' + JSON.stringify(this.commandariga));


    this.idTipologia = this.commandariga.tipologia;
    this.loadTipologia(this.idTipologia);
  }


  async  loadTipologia(id: number) {
    console.log(`loadTipologia - appena entrato`);
    let rc = await this.ttipologiaService.getbyid(id).subscribe(
     resp => {
           console.log(`loadTipologia:  ${JSON.stringify(resp['data'])} `);
           if(resp['rc'] === 'ok') {
             this.tipologia = resp['data'];
           }
           if(resp['rc'] === 'nf') {
             this.tipologia = this.tipologianull;
           }
        },
     error => {
          alert('sono in loadTipologia - errore');
          console.log('loadCommanda - errore: ' + error);
          this.type = 'error';
          this.Message = error.message;
          this.showNotification(this.type, this.Message);
        });
   }

   showNotification( type: string, message: string ): void {
    // alert('sono in showNot - ' + message);
     this.notifier.notify( type, message );
     console.log(`sono in showNotification  ${type}`);
  //   alert('sono in notifier' + message);
   }


   getColor(tipologia: number) {
    switch (tipologia) {
      case 1:   // primi
        return 'yellow';
      case 2:  // secondi
        return 'blue';
      case 3:  // contorni
        return 'red';
      case 4:  // bevande
        return 'green';
      case 5:  // dolci
        return 'orange';
    }
  }

}
