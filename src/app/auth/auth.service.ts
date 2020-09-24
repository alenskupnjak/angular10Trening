import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { User } from './user.model';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private router: Router) {

  }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };

    this.authChange.next(true);
    // nakon registracije korisnika preusmjeravamo stranicu
    this.router.navigate(['/login'])
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.authChange.next(true);
    this.router.navigate(['/training'])
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login'])
  }

  getUser() {
    // raditi sa kopijom...
    return { ...this.user };
  }

  isAuth() {
    console.log('xx',this.user);

    if (this.user) {
      return true;
    } else {
      return false;
    }
  }
}
