import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styles: ['h2 { color: blue; }']

})
export class AuthLoginComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}
}
