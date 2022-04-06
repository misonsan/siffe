import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// service
import { RouteGuardService } from './services/route-guard.service';
// componenti utente
import { LoginComponent } from './components/security/login/login.component';
import { RegistrazioneComponent } from './components/security/registrazione/registrazione.component';
import { UsersComponent } from './components/users/users/users.component';

import { SignupComponent } from './components/security/signup/signup.component';
import { SignupConfermeComponent } from './components/security/signup-conferme/signup-conferme.component';
import { ForgotPasswordComponent } from './components/security/forgotPassword/forgot-password/forgot-password.component';
import { ForgotPasswordConfermeComponent } from './components/security/forgotPassword/forgot-password-conferme/forgot-password-conferme.component';
import { ChangePasswordNewUserComponent } from './components/security/change-password-new-user/change-password-new-user.component';
import { ChangePasswordConfermeComponent } from './components/security/changePassword/change-password-conferme/change-password-conferme.component';
import { ChangePasswordComponent } from './components/security/changePassword/change-password/change-password.component';
import { Page404Component } from './components/page404/page404.component';
import { AbilitazioniComponent } from './components/abilitazionis/abilitazioni/abilitazioni.component';
import { AbilitazioneDetailComponent } from './components/abilitazionis/abilitazione-detail/abilitazione-detail.component';
import { HomeComponent } from './components/home/home.component';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { ManifestazioniComponent } from './components/manifestaziones/manifestazioni/manifestazioni.component';

import { AbilfunctioniComponent } from './components/abilfunctions/abilfunctioni/abilfunctioni.component';
import { ModuliComponent } from './components/modulis/moduli/moduli.component';
import { ModuloDetailComponent } from './components/modulis/modulo-detail/modulo-detail.component';
import { AbilitazioniDetailComponent } from './components/abilitazionis/abilitazioni-detail/abilitazioni-detail.component';
import { AbilfunctioneDetailComponent } from './components/abilfunctions/abilfunctione-detail/abilfunctione-detail.component';
// import { UserDetail1Component } from './components/users/user-detail1/user-detail1.component';  // test
import { UserDetailComponent } from './components/users/user-detail/user-detail.component';
import { ManifestazioneDaysComponent } from './components/manifestaziones/manifestazione-days/manifestazione-days.component';
import { ManifestazioneDetailComponent } from './components/manifestaziones/manifestazione-detail/manifestazione-detail.component';
import { GiornataDetailComponent } from './components/giornatas/giornata-detail/giornata-detail.component';
import { GiornataDetailInfoComponent } from './components/giornatas/giornata-detail-info/giornata-detail-info.component';
import { GiornataDetailCassaComponent } from './components/giornatas/giornata-detail-cassa/giornata-detail-cassa.component';
import { GiornataCassaComponent } from './components/giornatas/giornata-cassa/giornata-cassa.component';
import { GiornataDetailProdottiComponent } from './components/giornatas/giornata-detail-prodotti/giornata-detail-prodotti.component';
import { ProdottoDetailMenuComponent } from './components/prodottos/prodotto-detail-menu/prodotto-detail-menu.component';
import { GiornataDetailPersoneComponent } from './components/giornatas/giornata-detail-persone/giornata-detail-persone.component';
import { PersonaDetailRuoloComponent } from './components/personas/persona-detail-ruolo/persona-detail-ruolo.component';
import { GiornataDetailCommandeComponent } from './components/commandas/giornata-detail-commande/giornata-detail-commande.component';
import { CommandaDetailComponent } from './components/commandas/commanda-detail/commanda-detail.component';
import { CommandaRegistrazioneAnagraficaComponent } from './components/commandas/commanda-registrazione-anagrafica/commanda-registrazione-anagrafica.component';
import { CommandaRegistrazioneProdottiComponent } from './components/commandas/commanda-registrazione-prodotti/commanda-registrazione-prodotti.component';
import { CommandaRegistrazioneCassaComponent } from './components/commandas/commanda-registrazione-cassa/commanda-registrazione-cassa.component';
import { GiornataDetailCassa1Component } from './components/giornatas/giornata-detail-cassa1/giornata-detail-cassa1.component';
import { CommandaPreviewComponent } from './components/commandas/commanda-preview/commanda-preview.component';
import { GestioneComponent } from './components/gestioneCucinaBevande/gestione/gestione.component';
import { CommandeComponent } from './components/commandas/commande/commande.component';
import { RequestPrenotazioneComponent } from './components/prenotaziones/prenotazione/request-prenotazione/request-prenotazione.component';
import { ResponsePrenotazioneComponent } from './components/prenotaziones/prenotazione/response-prenotazione/response-prenotazione.component';
import { PrenotazioniComponent } from './components/prenotaziones/prenotazione/prenotazioni/prenotazioni.component';
import { ProdottiComponent } from './components/prodottos/prodotti/prodotti.component';
import { ProdottoDetailComponent } from './components/prodottos/prodotto-detail/prodotto-detail.component';
import { FornitoriComponent } from './components/fornitores/fornitori/fornitori.component';
import { FornitoreDetailComponent } from './components/fornitores/fornitore-detail/fornitore-detail.component';
import { FornitoreDetailSpeseComponent } from './components/fornitores/fornitore-detail-spese/fornitore-detail-spese.component';
import { SpesaComponent } from './components/speses/spesa/spesa.component';
import { SpesaDetailComponent } from './components/speses/spesa-detail/spesa-detail.component';
import { SpeseComponent } from './components/speses/spese/spese.component';
import { ManifestazioneDetailBilancioComponent } from './components/manifestaziones/manifestazione-detail-bilancio/manifestazione-detail-bilancio.component';
import { PersoneComponent } from './components/personas/persone/persone.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrazioneComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'signupConferme',
    component: SignupConfermeComponent
  },

  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent
  },
  {
    path: 'forgotpasswordConferme',
    component: ForgotPasswordConfermeComponent
  },
  {
    path: 'jumbotron',
    component: JumbotronComponent
  },

  {
    path: 'giornata/inqu/:id/:idManif',
    component: GiornataDetailComponent
  },
  {
    path: 'giornata/edit/:id/:idManif',
    component: GiornataDetailComponent
  },
  {
    path: 'giornata/edits/:id/:idManif',
    component: GiornataDetailComponent
  },
  {
    path: 'giornata/new/:idManif',
    component: GiornataDetailComponent
  },
// dettaglio giornata della manifestazione  -- dettaglio Info
{
  path: 'giornata/Info/Inqu/:id/:idManif',
  component: GiornataDetailInfoComponent
},
{
  path: 'giornata/Info/Edit/:id/:idManif',
  component: GiornataDetailInfoComponent
},
{
  path: 'giornata/Info/Edits/:id/:idManif',
  component: GiornataDetailInfoComponent
},
// dettaglio giornata della manifestazione  -- dettaglio Cassa
{
  path: 'giornata/Cassa/Inqu/:id/:idManif',
  component: GiornataDetailCassaComponent
},
{
  path: 'giornata/Cassa/Edit/:id/:idManif',
  component: GiornataDetailCassaComponent
},
{
  path: 'giornata/Cassa/Edits/:id/:idManif',
  component: GiornataDetailCassaComponent
},


// dettaglio giornata della manifestazione  -- dettaglio Cassa1  nuova versione col elenco
{
  path: 'giornata/Cassa1/Inqu/:id/:idManif',
  component: GiornataDetailCassa1Component
},
{
  path: 'giornata/Cassa1/Edit/:id/:idManif',
  component: GiornataDetailCassa1Component
},
{
  path: 'giornata/Cassa1/Edits/:id/:idManif',
  component: GiornataDetailCassa1Component
},



// dettaglio giornata della manifestazione  -- dettaglio Prodotti
{
  path: 'giornata/Prod/Inqu/:id/:idManif',
  component: GiornataDetailProdottiComponent
},
{
  path: 'giornata/Prod/Edit/:id/:idManif',
  component: GiornataDetailProdottiComponent
},
{
  path: 'giornata/Prod/Edits/:id/:idManif',
  component: GiornataDetailProdottiComponent
},
// dettaglio giornata della manifestazione  -- dettaglio Persone
{
  path: 'giornata/Pers/Inqu/:id/:idManif',
  component: GiornataDetailPersoneComponent
},
{
  path: 'giornata/Pers/Edit/:id/:idManif',
  component:  GiornataDetailPersoneComponent
},
{
  path: 'giornata/Pers/Edits/:id/:idManif',
  component:  GiornataDetailPersoneComponent
},
// dettaglio giornata della manifestazione  -- dettaglio Commande
{
  path: 'giornata/Commande/Inqu/:id/:idManif',
  component: GiornataDetailCommandeComponent
},
{
  path: 'giornata/Commande/Edit/:id/:idManif',
  component:  GiornataDetailCommandeComponent
},
{
  path: 'giornata/Commande/Edits/:id/:idManif',
  component:  GiornataDetailCommandeComponent
},




// dettagli delle varie visualizzazioni di giornata
{
  path: 'giornata/ValoriCassa/Edits/:id',
  component: GiornataCassaComponent
},
{
  path: 'giornata/ProdottiMenu/Edits/:id',
  component: ProdottoDetailMenuComponent
},
{
  path: 'giornata/PersoneRuolo/Edits/:id',
  component: PersonaDetailRuoloComponent
},
{
  path: 'giornata/Commanda/Edits/:id',
  component: CommandaDetailComponent
},
// REgistrazione Commanda - Anagrafica
{
  path: 'commanda/RegistraAnag/new/:idGiornata',
  component: CommandaRegistrazioneAnagraficaComponent
},
// REgistrazione Commanda - Prodotti
{
  path: 'commanda/RegistraProd/new/:idCommanda',
  component: CommandaRegistrazioneProdottiComponent
},
// REgistrazione Commanda - Cassa
{
  path: 'commanda/RegistraCassa/new/:idCommanda',
  component: CommandaRegistrazioneCassaComponent
},

{
  path: 'prewcommanda/:id',
  component: CommandaPreviewComponent,
 // canActivate: [RouteGuardService]
},
{
  path: 'requestConfirmPrenotazione',
   component: RequestPrenotazioneComponent
},
{
  path: 'prenotazioneConferma',
   component: ResponsePrenotazioneComponent
},
{
  path: 'prenotazione',
   component: PrenotazioniComponent,
   canActivate: [RouteGuardService]
},
{
  path: 'commanda/gestioneCucina',
  component: GestioneComponent,
 // canActivate: [RouteGuardService]
},
{
  path: 'commanda/gestioneBevande',
  component: GestioneComponent,
 // canActivate: [RouteGuardService]
},
{
  path: 'commanda',
  component: CommandeComponent
},
// ----------------------------------------------------------------  Manifestazione
  {
    path: 'manif',
    component: ManifestazioniComponent
  },
  {
    path: 'manif/inqu/:id',
    component: ManifestazioneDetailComponent
  },
  {
    path: 'manif/edit/:id',
    component: ManifestazioneDetailComponent
  },
  {
    path: 'manif/edits/:id',
    component: ManifestazioneDetailComponent
  },
  {
    path: 'manif/new',
    component: ManifestazioneDetailComponent
  },
  {
    path: 'manif/:id',
    component: ManifestazioneDaysComponent
  },
  {
    path: 'manif/bilancio/:id',
    component: ManifestazioneDetailBilancioComponent
  },
// ------------------------------------------------------------------  Users


  {
    path: 'users',
    component: UsersComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'users/inqu/:id',
    component: UserDetailComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'users/edit/:id',
    component:  UserDetailComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'users/edits/:id',
    component: UserDetailComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'users/new',
    component: UserDetailComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'chgpswnuwuser',
    component: ChangePasswordNewUserComponent
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent
  },
  {
    path: 'changepasswordConferme',
    component: ChangePasswordConfermeComponent
  },
  {
    path: 'page404',
    component: Page404Component
  },
  // ----------------------------------------------------------------- Spese
  {
    path: 'spesa',
    component: SpeseComponent
  },
  {
    path: 'spesa/newf/:id',
    component: SpesaDetailComponent
  },
  {
    path: 'spesa/new',
    component: SpesaDetailComponent
  },
  {
    path: 'spesa/edits/:id',
    component: SpesaDetailComponent
  },
  // ----------------------------------------------------------------- Fornitori
  {
    path: 'fornitore',
    component: FornitoriComponent
  },
  {
    path: 'fornitore/new',
    component: FornitoreDetailComponent
  },
  {
    path: 'fornitore/edits/:id',
    component: FornitoreDetailComponent
  },
  {
    path: 'fornitore/edit/:id',
    component: FornitoreDetailComponent
  },
  {
    path: 'fornitore/inqu/:id',
    component: FornitoreDetailComponent
  },
  {
    path: 'fornitore/spese/:id',
    component: FornitoreDetailSpeseComponent
  },
  // ----------------------------------------------------------------- Prodotti
  {
    path: 'prodotto',
    component: ProdottiComponent
  },
  {
    path: 'prodotto/new',
    component: ProdottoDetailComponent
  },
  {
    path: 'prodotto/edits/:id',
    component: ProdottoDetailComponent
  },
  {
    path: 'prodotto/edit/:id',
    component: ProdottoDetailComponent
  },
  {
    path: 'prodotto/inqu/:id',
    component: ProdottoDetailComponent
  },
  // ----------------------------------------------------------------- Persona
  {
    path: 'persona',
    component: PersoneComponent
  },
 // ---------------------------------------------------------------------- Moduli
  {
    path: 'modulis',
    component: ModuliComponent
  },
  {
    path: 'modulis/inqu/:id',
    component: ModuloDetailComponent
  },
  {
    path: 'modulis/edit/:id',
    component: ModuloDetailComponent
  },
  {
    path: 'modulis/edits/:id',
    component: ModuloDetailComponent
  },
  {
    path: 'modulis/new',
    component: ModuloDetailComponent
  },



  // abilitazioni per livello -----------------------
  {
    path: 'abilfunctione',
    component: AbilfunctioniComponent
  },
  {
    path: 'abilfunctione/edits/:id',
    component: AbilfunctioneDetailComponent
  },
  {
    path: 'abilitaziones/:id',
    component: AbilitazioniComponent
  },
  {
    path: 'abilitaziones/:id/edit',
    component: AbilitazioneDetailComponent
  },
  {
    path: 'abilitazioni',
    component: AbilitazioniDetailComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: 'jumbotron',  //home   // login
    pathMatch: 'full'
  },

  //  ultimo
  {
    path: '**',
    redirectTo: 'page404',
    pathMatch: 'full'
  },

 ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }



