import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {LoginComponent} from "./components/login/login.component";
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import {MatTreeModule} from '@angular/material/tree';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatLegacyFormFieldModule as MatFormFieldModule} from "@angular/material/legacy-form-field";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './state/reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {ENV} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {Effects} from "./state/effects";
import {MatIconModule} from "@angular/material/icon";
import {RedirectHandlerComponent} from './pages/redirect-handler/redirect-handler.component';
import {SolidClient} from "./utils/solid-client";
import {AuthorizationPage} from './pages/authorization/authorization.page';
import {MatLegacyProgressSpinnerModule as MatProgressSpinnerModule} from '@angular/material/legacy-progress-spinner';
import {StartComponent} from './pages/start/start.component';
import {ConnectServerPage} from './pages/connect-server/connect-server.page';
import {ServiceWorkerModule} from '@angular/service-worker';
import {AddSocialAgentComponent} from './pages/add-social-agent/add-social-agent.component';
import {SocialAgentsComponent} from './pages/social-agents/social-agents.component';
import {ApplicationsComponent} from './pages/applications/applications.component';
import {DataComponent} from './pages/data/data.component';
import {LanguageComponent} from './components/language/language.component';
import {AppViewComponent} from './components/app-view/app-view.component';
import {MatLegacyChipsModule as MatChipsModule} from "@angular/material/legacy-chips";
import {AccessNeedViewComponent} from './components/access-need-view/access-need-view.component';
import {MatLegacySlideToggleModule as MatSlideToggleModule} from "@angular/material/legacy-slide-toggle";
import {MatLegacyTooltipModule as MatTooltipModule} from "@angular/material/legacy-tooltip";
import {DemoMaterialModule} from "../material-module";
import {AddSocialAgentFormComponent} from './components/add-social-agent-form/add-social-agent-form.component';
import {MatLegacyCheckboxModule as MatCheckboxModule} from "@angular/material/legacy-checkbox";
import {MatLegacyRadioModule as MatRadioModule} from "@angular/material/legacy-radio";
import {I18nModule} from "./i18n.module";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginPage } from './pages/login/login.page';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    RedirectHandlerComponent,
    AuthorizationPage,
    StartComponent,
    ConnectServerPage,
    AddSocialAgentComponent,
    SocialAgentsComponent,
    ApplicationsComponent,
    DataComponent,
    LanguageComponent,
    AppViewComponent,
    AccessNeedViewComponent,
    AddSocialAgentFormComponent,
    LoginPage,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatTreeModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatTooltipModule,

    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: ENV.production}),
    EffectsModule.forRoot(Effects),

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: ENV.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    I18nModule,
    FontAwesomeModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    SolidClient,
  ],
  bootstrap: [AppComponent],
  exports: [BrowserModule, DemoMaterialModule],
})
export class AppModule { }
