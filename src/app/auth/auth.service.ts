import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AuthLoginComponent } from './auth-login.component';

import { AuthData } from './auth-data.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  userChange = new Subject<string>();
  isAuthenticated: boolean = false;
  userMenu: string;

  constructor(
    private router: Router,
    private firebaseAuth: AngularFireAuth,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  // REGISTRACIJA korisnika
  registerUser(authData: AuthData) {
    this.firebaseAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.authChange.next(true);
        // nakon registracije korisnika preusmjeravamo stranicu
        this.router.navigate(['/login']);
      })
      .catch((err) => {
        let snackBarRef = this.snackBar.open(err.message, 'U redu', {
          duration: 5000,
        });

        snackBarRef.afterDismissed().subscribe(() => {
          console.log('The snack-bar was dismissed');
        });
      });
  }

  login(authData: AuthData) {
    return this.firebaseAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.isAuthenticated = true;
        // nakon uspjesne registracije preusmjeravamo se na trening stranicu
        this.router.navigate(['/training']);
        this.authChange.next(true);
        this.userChange.next(authData.email);
      })
      .catch((err) => {
        let dialogRef = this.dialog.open(AuthLoginComponent, {
          data: {
            poruka: 'Upisan krivi password',
          },
        });
        setTimeout(() => {
          console.log('tu treba', err);
          dialogRef.close();
        }, 3000);
      });
  }

  // odjava iz programa
  logout() {
    this.authChange.next(false);
    this.router.navigate(['/login']);
    this.isAuthenticated = false;
  }

  getUser() {
    return;
  }

  isAuth() {
    // ako je korisnik logiran vracam true
    return this.isAuthenticated;
  }
}
