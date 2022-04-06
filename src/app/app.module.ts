import { NgModule } from '@angular/core';                                                //
import { BrowserModule } from '@angular/platform-browser';                               //
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';                                 //
// da sistema
import { RouterModule, Routes} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';                                //
import { HttpClientModule } from '@angular/common/http';                                //
import { DatePipe } from '@angular/common';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';                    //
import { FormsModule, ReactiveFormsModule } from '@angular/forms';                      //




// component utente
import { AppComponent } from './app.component';                                                           //
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/security/login/login.component';
import { RegistrazioneComponent } from './components/security/registrazione/registrazione.component';
import { UserComponent } from './components/users/user/user.component';

import { UsersComponent } from './components/users/users/users.component';
import { SignupComponent } from './components/security/signup/signup.component';
// per gestione messaggio esito operazione tipo popup a tempo
import { NotifierModule, NotifierOptions } from 'angular-notifier';                                         //
// utility
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPrintModule } from 'ngx-print';    // per fare la stampa commanda da Angular
import { ModalModule } from 'ngx-bootstrap/modal';  // per aprire una seconda popup dentro alla prima  (conferma Cancellazione)

// services
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { TruoloService } from './services/truolo.service';
import { TruoloWebService } from './services/truolo-web.service';
import { TstatoutenteService } from './services/tstatoutente.service';
import { TokenStorageService } from './services/token-storage.service';
import { ForgotconfirmedService } from './services/forgotconfirmed.service';
import { ForgotconfirmedtestService } from './services/forgotconfirmedtest.service';
import { ChangepassService } from './services/changepass.service';
import { RouteGuardService } from './services/route-guard.service';
import { UploadFilesService } from './services/upload-files.service';
import { ManifestazioneService } from './services/manifestazione.service';
import { AbilfunctioneService } from './services/abilfunctione.service';
import { UserlevelService } from './services/userlevel.service';
import { CtrfuncService } from './services/ctrfunc.service';
import { GiornataService } from './services/giornata.service';
import { TtagliaService } from './services/ttaglia.service';
import { GraphprodService} from './services/graphprod.service';

// component
import { SignupConfermeComponent } from './components/security/signup-conferme/signup-conferme.component';
import { ForgotPasswordComponent } from './components/security/forgotPassword/forgot-password/forgot-password.component';
import { ForgotPasswordConfermeComponent } from './components/security/forgotPassword/forgot-password-conferme/forgot-password-conferme.component';
import { ChangePasswordConfermeComponent } from './components/security/changePassword/change-password-conferme/change-password-conferme.component';
import { ChangePasswordNewUserComponent } from './components/security/change-password-new-user/change-password-new-user.component';
import { ChangePasswordComponent } from './components/security/changePassword/change-password/change-password.component';
import { Page404Component } from './components/page404/page404.component';
import { AbilitazioneComponent } from './components/abilitazionis/abilitazione/abilitazione.component';
import { AbilitazioneDetailComponent } from './components/abilitazionis/abilitazione-detail/abilitazione-detail.component';
import { AbilitazioniComponent } from './components/abilitazionis/abilitazioni/abilitazioni.component';
import { HomeComponent } from './components/home/home.component';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { User1Component } from './components/users/user1/user1.component';
import { ManifestazioniComponent } from './components/manifestaziones/manifestazioni/manifestazioni.component';
import { ManifestazioneComponent } from './components/manifestaziones/manifestazione/manifestazione.component';
import { AbilfunctioniComponent } from './components/abilfunctions/abilfunctioni/abilfunctioni.component';
import { AbilfunctioneComponent } from './components/abilfunctions/abilfunctione/abilfunctione.component';
import { AbilfunctioneDetailComponent } from './components/abilfunctions/abilfunctione-detail/abilfunctione-detail.component';
import { ModuliComponent } from './components/modulis/moduli/moduli.component';
import { ModuloComponent } from './components/modulis/modulo/modulo.component';
import { ModuloDetailComponent } from './components/modulis/modulo-detail/modulo-detail.component';
import { AbilitazioniDetailComponent } from './components/abilitazionis/abilitazioni-detail/abilitazioni-detail.component';
import { User2Component } from './components/users/user2/user2.component';
import { UserDetail1Component } from './components/users/user-detail1/user-detail1.component';
import { UserDetailComponent } from './components/users/user-detail/user-detail.component';
import { ManifestazioneDaysComponent } from './components/manifestaziones/manifestazione-days/manifestazione-days.component';
import { GiornateComponent } from './components/giornatas/giornate/giornate.component';
import { GiornataDetailComponent } from './components/giornatas/giornata-detail/giornata-detail.component';
import { GiornataComponent } from './components/giornatas/giornata/giornata.component';
import { ManifestazioneDetailComponent } from './components/manifestaziones/manifestazione-detail/manifestazione-detail.component';
// sospeso fino a quando pronto con i conreoller
import { GiornataDetailInfoComponent } from './components/giornatas/giornata-detail-info/giornata-detail-info.component';
import { GiornataDetailCassaComponent } from './components/giornatas/giornata-detail-cassa/giornata-detail-cassa.component';
import { GiornataCassaComponent } from './components/giornatas/giornata-cassa/giornata-cassa.component';
import { GiornataDetailProdottiComponent } from './components/giornatas/giornata-detail-prodotti/giornata-detail-prodotti.component';
import { ProdottoComponent } from './components/prodottos/prodotto/prodotto.component';
import { ProdottoDetailMenuComponent } from './components/prodottos/prodotto-detail-menu/prodotto-detail-menu.component';
import { Prodotto2Component } from './components/prodottos/prodotto2/prodotto2.component';
import { GiornataDetailPersoneComponent } from './components/giornatas/giornata-detail-persone/giornata-detail-persone.component';
import { PersonaComponent } from './components/personas/persona/persona.component';
import { PersonaDetailRuoloComponent } from './components/personas/persona-detail-ruolo/persona-detail-ruolo.component';
import { GiornataDetailCommandeComponent } from './components/commandas/giornata-detail-commande/giornata-detail-commande.component';
import { CommandaComponent } from './components/commandas/commanda/commanda.component';
import { CommandaDetailComponent } from './components/commandas/commanda-detail/commanda-detail.component';
import { CommandarigaComponent } from './components/commandarigas/commandariga/commandariga.component';
import { Commandariga1Component } from './components/commandarigas/commandariga1/commandariga1.component';
import { CommandaRegistrazioneAnagraficaComponent } from './components/commandas/commanda-registrazione-anagrafica/commanda-registrazione-anagrafica.component';
import { PrenotazioneComponent } from './components/prenotaziones/prenotazione/prenotazione.component';
import { Persona1Component } from './components/personas/persona1/persona1.component';
import { CommandaRegistrazioneProdottiComponent } from './components/commandas/commanda-registrazione-prodotti/commanda-registrazione-prodotti.component';
import { Prodotto3Component } from './components/prodottos/prodotto3/prodotto3.component';
import { CommandawrigaComponent } from './components/commandawrigas/commandawriga/commandawriga.component';
import { CommandaRegistrazioneCassaComponent } from './components/commandas/commanda-registrazione-cassa/commanda-registrazione-cassa.component';
import { CassawComponent } from './components/cassaws/cassaw/cassaw.component';
import { Cassaw1Component } from './components/cassaws/cassaw1/cassaw1.component';
import { GiornataDetailCassa1Component } from './components/giornatas/giornata-detail-cassa1/giornata-detail-cassa1.component';
import { CassaComponent } from './components/cassas/cassa/cassa.component';
import { CassawcComponent } from './components/cassawcs/cassawc/cassawc.component';
import { Cassawc1Component } from './components/cassawcs/cassawc1/cassawc1.component';
import { CommandaPreviewComponent } from './components/commandas/commanda-preview/commanda-preview.component';
import { GestioneComponent } from './components/gestioneCucinaBevande/gestione/gestione.component';
import { CommandeComponent } from './components/commandas/commande/commande.component';
import { InfoComponent } from './components/popups/info/info.component';
import { Commanda1Component } from './components/commandas/commanda1/commanda1.component';
import { Commandariga2Component } from './components/commandarigas/commandariga2/commandariga2.component';
import { CassacComponent } from './components/cassacs/cassac/cassac.component';
import { RequestPrenotazioneComponent } from './components/prenotaziones/prenotazione/request-prenotazione/request-prenotazione.component';
import { ResponsePrenotazioneComponent } from './components/prenotaziones/prenotazione/response-prenotazione/response-prenotazione.component';
import { PrenotazioniComponent } from './components/prenotaziones/prenotazione/prenotazioni/prenotazioni.component';
import { Prenotazione1Component } from './components/prenotaziones/prenotazione1/prenotazione1.component';
import { ProdottiComponent } from './components/prodottos/prodotti/prodotti.component';
import { Prodotto4Component } from './components/prodottos/prodotto4/prodotto4.component';
import { ProdottoDetailComponent } from './components/prodottos/prodotto-detail/prodotto-detail.component';
import { FornitoriComponent } from './components/fornitores/fornitori/fornitori.component';
import { FornitoreComponent } from './components/fornitores/fornitore/fornitore.component';
import { FornitoreDetailComponent } from './components/fornitores/fornitore-detail/fornitore-detail.component';
import { FornitoreDetailSpeseComponent } from './components/fornitores/fornitore-detail-spese/fornitore-detail-spese.component';
import { SpesaComponent } from './components/speses/spesa/spesa.component';
import { SpesaDetailComponent } from './components/speses/spesa-detail/spesa-detail.component';
import { SpeseComponent } from './components/speses/spese/spese.component';
import { Spesa1Component } from './components/speses/spesa1/spesa1.component';
import { Spesa2Component } from './components/speses/spesa2/spesa2.component';
import { ManifestazioneDetailBilancioComponent } from './components/manifestaziones/manifestazione-detail-bilancio/manifestazione-detail-bilancio.component';
import { Giornata1Component } from './components/giornatas/giornata1/giornata1.component';
import { Spesa3Component } from './components/speses/spesa3/spesa3.component';
import { PersoneComponent } from './components/personas/persone/persone.component';
import { Persona2Component } from './components/personas/persona2/persona2.component';



/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 90,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 8000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    RegistrazioneComponent,
    UserComponent,
    UsersComponent,
    SignupComponent,
    SignupConfermeComponent,
    ForgotPasswordComponent,
    ForgotPasswordConfermeComponent,
    ChangePasswordConfermeComponent,
    ChangePasswordNewUserComponent,
    ChangePasswordComponent,
    Page404Component,
    AbilitazioneComponent,
    AbilitazioneDetailComponent,
    AbilitazioniComponent,
    HomeComponent,
    JumbotronComponent,
    User1Component,
    ManifestazioniComponent,
    ManifestazioneComponent,
    AbilfunctioniComponent,
    AbilfunctioneComponent,
    AbilfunctioneDetailComponent,
    ModuliComponent,
    ModuloComponent,
    ModuloDetailComponent,
    AbilitazioniDetailComponent,
    User2Component,
    UserDetail1Component,
    UserDetailComponent,
    ManifestazioneDaysComponent,
    GiornateComponent,
    GiornataDetailComponent,
    GiornataComponent,
    ManifestazioneDetailComponent,
    GiornataDetailInfoComponent,
    GiornataDetailCassaComponent,
    GiornataCassaComponent,
    GiornataDetailProdottiComponent,
    ProdottoComponent,
    ProdottoDetailMenuComponent,
    Prodotto2Component,
    GiornataDetailPersoneComponent,
    PersonaComponent,
    PersonaDetailRuoloComponent,
    GiornataDetailCommandeComponent,
    CommandaComponent,
    CommandaDetailComponent,
    CommandarigaComponent,
    Commandariga1Component,
    CommandaRegistrazioneAnagraficaComponent,
    PrenotazioneComponent,
    Persona1Component,
    CommandaRegistrazioneProdottiComponent,
    Prodotto3Component,
    CommandawrigaComponent,
    CommandaRegistrazioneCassaComponent,
    CassawComponent,
    Cassaw1Component,
    GiornataDetailCassa1Component,
    CassaComponent,
    CassawcComponent,
    Cassawc1Component,
    CommandaPreviewComponent,
    GestioneComponent,
    CommandeComponent,
    InfoComponent,
    Commanda1Component,
    Commandariga2Component,
    CassacComponent,
    RequestPrenotazioneComponent,
    ResponsePrenotazioneComponent,
    PrenotazioniComponent,
    Prenotazione1Component,
    ProdottiComponent,
    Prodotto4Component,
    ProdottoDetailComponent,
    FornitoriComponent,
    FornitoreComponent,
    FornitoreDetailComponent,
    FornitoreDetailSpeseComponent,
    SpesaComponent,
    SpesaDetailComponent,
    SpeseComponent,
    Spesa1Component,
    Spesa2Component,
    ManifestazioneDetailBilancioComponent,
    Giornata1Component,
    Spesa3Component,
    PersoneComponent,
    Persona2Component,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NotifierModule.withConfig(customNotifierOptions),
    Ng2SearchPipeModule,
    NgxPrintModule,
    ModalModule.forRoot(),
  ],
  providers: [AuthService, DatePipe, UserService, TruoloService,TokenStorageService,ForgotconfirmedService,ForgotconfirmedtestService,
              ChangepassService,RouteGuardService,TruoloWebService,TstatoutenteService,UploadFilesService,ManifestazioneService,
              AbilfunctioneService,UserlevelService,CtrfuncService,GiornataService,TtagliaService,GraphprodService],
  bootstrap: [AppComponent]
})
export class AppModule { }
