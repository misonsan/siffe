import { Component, Input, OnInit } from '@angular/core';
import { Commandariga} from '../../../classes/Commandariga';
import { Tstatorigacommanda } from '../../../classes/T_stato_rigacommanda';
// service
import { TstatorigacommandaService } from '../../../services/tstatorigacommanda.service';
// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'tr[app-commandariga2]',
  templateUrl: './commandariga2.component.html',
  styleUrls: ['./commandariga2.component.css']
})
export class Commandariga2Component implements OnInit {

  public tstatoriga: Tstatorigacommanda;
  public tstatoriganull = new Tstatorigacommanda();

  @Input('commandariga2-data') commandariga: Commandariga;
  @Input('commandariga2-prog') i: number;

  public idStato = 0;
  // variabili per visualizzazione messaggio di esito con notifier
  public type = '';
  public Message = '';


  constructor(private tstatorigacommandaService: TstatorigacommandaService,
              private notifier: NotifierService) {
                    this.notifier = notifier;
              }

  ngOnInit(): void {

      console.log('------------->  commandariga2  -- OnInit ' + JSON.stringify(this.commandariga));


  //  this.idStato = this.commandariga.stato;
  //  this.loadStato(this.idStato);
  }

/*
  async  loadStato(id: number) {
    console.log(`loadStato - appena entrato +++   stato: ${id}`);
    let rc = await this.tstatorigacommandaService.getbyId(id).subscribe(
     resp => {
           console.log(`loadStato:  ${JSON.stringify(resp['data'])} `);
           if(resp['rc'] === 'ok') {
             this.tstatoriga = resp['data'];
           }
           if(resp['rc'] === 'nf') {
             this.tstatoriga = this.tstatoriganull;
           }
        },
     error => {
          alert('sono in loadStato - errore');
          console.log('loadStato - errore: ' + error);
          this.type = 'error';
          this.Message = error.message;
          this.showNotification(this.type, this.Message);
        });
   }  */

   showNotification( type: string, message: string ): void {
    // alert('sono in showNot - ' + message);
     this.notifier.notify( type, message );
     console.log(`sono in showNotification  ${type}`);
  //   alert('sono in notifier' + message);
   }


   getColor(tstatoriga: number) {
    switch (tstatoriga) {
      case 0:   // primi
        return 'red';
      case 1:  // secondi
        return 'blue';
      case 2:  // contorni
        return 'green';
    }
  }


}
