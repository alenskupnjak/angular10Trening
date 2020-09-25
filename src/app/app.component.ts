import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  moduleId: 'module.id',
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  openSidenav = false;
  private mediaSub: Subscription;
  constructor(
    private cdRef: ChangeDetectorRef,
    private mediaObserver: MediaObserver
  ) {}

  ngOnInit() {
    this.mediaSub = this.mediaObserver.asObservable().subscribe((res) => {
      console.log(res);
    });
  }

  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }
}
