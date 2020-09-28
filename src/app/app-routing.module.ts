import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { TrainingComponent } from './training/training.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'training', component: TrainingComponent, canActivate: [AuthGuard] },
  // {
  //   path: "auth",
  //   loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  //   // loadChildren: './auth/auth.module#AuthModule', staro rijesenje
  // },
    // '**' mora biti zadnji u nizu
  // { path: "**", component: NoPageFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard], // obavezno ovdje dodajemo zastitu za rute ako to zelimo
})
export class AppRoutingModule {}
