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
import { SignupComponent } from './auth/signup/signup.component';

import { LoginComponent } from './auth/login/login.component';
import { AuthLoginComponent } from './auth/auth-login.component';

import { TrainingComponent } from './training/training.component';
import { CurrentTrainingComponent } from './training/current-training/current-training.component';
import { NewTrainingComponent } from './training/new-training/newtraining.component';
import { PastTrainingComponent } from './training/past-training/past-training.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { StopTrainingComponent } from './training/current-training/stop-training.component';
import { AuthService } from './auth/auth.service';
import { VjezbeService } from './training/vjezbe.service';
import { EmitTrainingComponent } from './training/emit-training/emit-training.component';
import { PaginacijaComponent } from './training/paginacija/paginacija.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    StopTrainingComponent,
    EmitTrainingComponent,
    PaginacijaComponent,
    AuthLoginComponent
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
  ],
  providers: [AuthService, VjezbeService],
  bootstrap: [AppComponent],
  entryComponents: [StopTrainingComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
