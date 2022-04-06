import { Component, Input, OnInit } from '@angular/core';
import { Cassac} from '../../../classes/cassac';
import { TTaglia } from '../../../classes/T_taglia';
// service
import { TtagliaService } from '../../../services/ttaglia.service';
// per gestire il popup con esito operazione
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'tr[app-cassac]',
  templateUrl: './cassac.component.html',
  styleUrls: ['./cassac.component.css']
})
export class CassacComponent implements OnInit {

  public ttaglia: TTaglia;
  public ttaglianull = new TTaglia();

  public entrata = 'Incassato';
  public resto = 'Resto';

  @Input('cassac-data') cassac: Cassac;
  @Input('cassac-prog') i: number;

  public idTaglia = 0;
  // variabili per visualizzazione messaggio di esito con notifier
  public type = '';
  public Message = '';

  constructor(private ttagliaService: TtagliaService,
              private notifier: NotifierService) {
                    this.notifier = notifier;
              }

  ngOnInit(): void {

      console.log('------------->  cassac  -- OnInit ' + JSON.stringify(this.cassac));


    this.idTaglia = this.cassac.idTaglia;
    this.loadTaglia(this.idTaglia);

  }


  async  loadTaglia(id: number) {
    console.log(`loadTaglia - appena entrato - taglia: ${id}`);
    let rc = await this.ttagliaService.getbyId(id).subscribe(
     resp => {
           console.log(`loadTaglia:  ${JSON.stringify(resp['data'])} `);
           if(resp['rc'] === 'ok') {
             this.ttaglia = resp['data'];
           }
           if(resp['rc'] === 'nf') {
             this.ttaglia = this.ttaglianull;
           }
        },
     error => {
          alert('sono in loadTaglia - errore');
          console.log('loadTaglia - errore: ' + error);
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


   getColor(tipo: string) {
    switch (tipo) {
      case 'Incassato':
        return 'green';
      case 'Resto':
        return 'red';
    }
  }


}
