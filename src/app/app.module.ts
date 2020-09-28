import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // za template driven forms
import { ReactiveFormsModule } from '@angular/forms'; // za template driven forms
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';

import { AuthLoginComponent } from './auth/auth-login.component';

import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

// SERVICE
import { AuthService } from './auth/auth.service';
import { VjezbeService } from './training/vjezbe.service';
import { UIService } from './shared/UIservice';

import { environment } from '../environments/environment';

//MODULE
import { AuthModule } from './auth/auth.module';
import { TrainingModule } from './training/training.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    AuthLoginComponent,

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    TrainingModule
  ],
  providers: [AuthService, VjezbeService, UIService],
  bootstrap: [AppComponent],
  // entryComponents: [StopTrainingComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
