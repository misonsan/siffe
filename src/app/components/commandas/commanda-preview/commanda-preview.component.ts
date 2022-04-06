import { Component, OnInit } from '@angular/core';
// Component
import { Commanda } from '../../../classes/Commanda';
import { Commandariga } from '../../../classes/Commandariga';
import { Giornata } from '../../../classes/Giornata';
import { Cassac } from '../../../classes/cassac';
import { ActivatedRoute, Router } from '@angular/router';
// Services
import { CommandaService } from './../../../services/commanda.service';
import { CommandarigaService } from './../../../services/commandariga.service';
import { GiornataService } from './../../../services/giornata.service';
import { CassacService } from './../../../services/cassac.service';

@Component({
  selector: 'app-commanda-preview',
  templateUrl: './commanda-preview.component.html',
  styleUrls: ['./commanda-preview.component.css']
})
export class CommandaPreviewComponent implements OnInit {

  public commanda: Commanda;
  public commandariga: Commandariga;
  public commandarighe: Commandariga[] = [];
  public cassec: Cassac[]= [];
  public cassac: Cassac;
  public giornata: Giornata;

  public keyCommanda = 0;
  public title = 'Sanfra in Festa';
  public cassiere = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private commandaService: CommandaService,
              private commandarigaService: CommandarigaService,
              private giornataService: GiornataService,
              private cassacService: CassacService
             ) { }

  ngOnInit(): void {
    this.cassiere = 'Moreno'; //localStorage.getItem('cognome');
    this.route.paramMap.subscribe(p => {
    this.keyCommanda = +p.get('id');
    // -------  leggo i dati della commanda di lavoro
    this.loadCommanda(this.keyCommanda);
     });
  }

  async loadCommanda(id: number) {

    alert('loadCommanda : ' + id);

    await this.commandaService.getCommanda(id).subscribe(
      response => {
        this.commanda = response['data'];
        this.loadGiornata(this.commanda.idGiornata);
        this.loadCommandarighe(this.commanda.id);
        this.loadCassac(this.commanda.id);
       },
      error => {
      alert('Print-Layout  --loadCommanda: ' + error.message);
      console.log(error);
      }
    )
  }

  async loadGiornata(id: number) {
   //    alert('loadGiornata - id:' + id);
    await this.giornataService.getGiornata(id).subscribe(
    response => {
      this.giornata = response['data'];
       },
    error => {

    alert('Print-Layout  --loadGiornata: ' + error.message);
    console.log(error);
    }
  )
 }


 async loadCommandarighe(id: number) {
   // crea le righe commanda da commandawrighe   con qta > 0
   await this.commandarigaService.getrighebyCommanda(id).subscribe(
     response => {
         if(response['number'] > 0) {            //  response['success']
           this.commandarighe = response['data'];
         }
     },
     error =>
     {
       console.log(error);
     }
   );
 }

 async loadCassac(id: number)  {
  await this.cassacService.getbyidCommanda(id).subscribe(
    response => {
        if(response['number'] > 0) {
          console.log('---------------------------------------------------------  loadCassac: ' + JSON.stringify(response['data']));
          this.cassec = response['data'];
        }
    },
    error =>
    {
      console.log(error);
    }
  );
 }



}
