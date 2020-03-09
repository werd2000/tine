import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// importar locales
import localeEsAR from '@angular/common/locales/es-AR';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// Modules
import { SharedModule } from './shared/shared.module';
// import { PagesModule } from './pages/pages.module';

// Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

// Components
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './login/login.component';

// Routes
import { APP_ROUTES } from './app.routes';
import { LogoutComponent } from './logout/logout.component';


// registrar los locales con el nombre que quieras utilizar a la hora de proveer
registerLocaleData(localeEsAR, 'es-Ar');

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    // APP_ROUTES,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    SharedModule,
    FontAwesomeModule,
    // PagesModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    SweetAlert2Module,
    HttpClientModule
  ],
  providers: [
    AngularFireStorage,
    { provide: LOCALE_ID, useValue: 'es-Ar' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
