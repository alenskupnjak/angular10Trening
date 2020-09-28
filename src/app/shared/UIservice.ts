import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UIService {
  constructor(private snackBar: MatSnackBar) {}
  showSnackbar(message, action, duration) {
    let snackBarRef = this.snackBar.open(message, action, {
      duration: duration,
    });

    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack-bar was dismissed');
    });
  }
}
