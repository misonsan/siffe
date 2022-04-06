import { Component, Input, OnInit } from '@angular/core';
import { Commandariga} from '../../../classes/Commandariga';
import { Commanda} from '../../../classes/Commanda';
// service
import { CommandaService} from '../../../services/commanda.service';
// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'tr[app-commandariga1]',
  templateUrl: './commandariga1.component.html',
  styleUrls: ['./commandariga1.component.css']
})
export class Commandariga1Component implements OnInit {

  public commanda: Commanda;
  public commandaanull = new Commanda();

  private dtinizio: Date;
  private dtlavorazione: Date;

  private dataOdierna: Date;
  private datepipe: DatePipe = new DatePipe('en-US');

  @Input('commandariga-data') commandariga: Commandariga;
  @Input('commandariga-prog') i: number;


  public tempo = 0;
  public semaforo = '';


  public idCommanda = 0;
  // variabili per visualizzazione messaggio di esito con notifier
  public type = '';
  public Message = '';


  constructor(private commandaService: CommandaService,
              private notifier: NotifierService) {
                    this.notifier = notifier;
              }

  ngOnInit(): void {

    console.log('------------->  commandariga1  -- OnInit ' + JSON.stringify(this.commandariga));


    this.idCommanda = this.commandariga.idCommanda;
    this.loadCommanda(this.idCommanda);
    this.elaboraRiga();
  }


  async  loadCommanda(id: number) {
    console.log(`loadCommanda - appena entrato`);
    let rc = await this.commandaService.getCommanda(id).subscribe(
     resp => {
           console.log(`loadCommanda:  ${JSON.stringify(resp['data'])} `);
           if(resp['rc'] === 'ok') {
             this.commanda = resp['data'];
           }
           if(resp['rc'] === 'nf') {
             this.commanda = this.commandaanull;
           }
        },
     error => {
          alert('sono in loadCommanda - errore');
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

   elaboraRiga() {

         if(this.commandariga.competenza === 2) {
              this.tempo = this.commandariga.delayConsegna;
         } else {
          if(this.commandariga.stato === 0) {
            this.tempo = this.commandariga.delayLavorazione;
          } else {
            this.tempo = this.commandariga.delayConsegna;
          }
       }

    }

}
