import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth: boolean = false;
  authSubscription: Subscription;
  userMenu: string = 'nelogiran';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // promjena statusa, korisnik je logiran
    this.authSubscription = this.authService.authChange.subscribe(
      (authStatus) => {
        this.isAuth = authStatus;
      }
    );

    this.authService.userChange.subscribe((logiraniuser) => {
      console.log('logiraniuser=',logiraniuser);

      if(logiraniuser){
        this.userMenu = logiraniuser;
      }
    });
  }

  onToggleList() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
