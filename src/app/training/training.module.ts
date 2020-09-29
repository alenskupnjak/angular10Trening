import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MaterialModule } from '../material.module';

import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { NewTrainingComponent } from './new-training/newtraining.component';
import { PaginacijaComponent } from './paginacija/paginacija.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { TrainingComponent } from './training.component';
import { EmitTrainingComponent } from './emit-training/emit-training.component';

@NgModule({
  declarations: [
    PastTrainingComponent,
    PaginacijaComponent,
    PastTrainingComponent,
    StopTrainingComponent,
    NewTrainingComponent,
    TrainingComponent,
    CurrentTrainingComponent,
    EmitTrainingComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFirestoreModule,
  ],
  entryComponents: [StopTrainingComponent],
})
export class TrainingModule {}
