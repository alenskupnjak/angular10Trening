import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { VjezbeService } from './vjezbe.service';

@Component({
  moduleId: 'module.id',
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit, OnDestroy {
  // pratimo dali je vjezba u tijeku ili ne , inicijalno je nema = false
  stanjeTreninga: boolean = false;

  // cuvanje programa od memory leak-a
  vjezbaSubscription: Subscription;

  constructor(private vjezbaService: VjezbeService) {}

  ngOnInit(): void {
    this.vjezbaSubscription = this.vjezbaService.vjezbaPromjenaStanja
    .subscribe((dataVjezbaTrenutno) => {
      // ako vjezba nije null nastavljamo sa radom
        if (dataVjezbaTrenutno) {
          this.stanjeTreninga = true;
        } else {
          this.stanjeTreninga = false;
        }
      }
    );
  }

  ngOnDestroy() {
    this.vjezbaSubscription.unsubscribe();
  }
}
