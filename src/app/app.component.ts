import { Component, ViewChild } from '@angular/core';

@Component({
  moduleId:"module.id",
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  openSidenav = false;

  // @ViewChild('sidenav')

  onToggle() {

  }
}
