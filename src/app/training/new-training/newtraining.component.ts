import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Vjezba } from '../vjezba.model';
import { VjezbeService } from '../vjezbe.service';

@Component({
  moduleId: 'module.id',
  selector: 'app-newtraining',
  templateUrl: './newtraining.component.html',
  styleUrls: ['./newtraining.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  @Output() treningStart = new EventEmitter<any>();
  vjezbe: Vjezba[] = [];
  vjezbeDB: Vjezba[] = [];

  isLoading: boolean = true;

  // za ngOndestroy...
  subMemoryLeakProtect: Subscription;

  constructor(private vjezbeService: VjezbeService, private router: Router) {}

  ngOnInit(): void {
    // on ce prosljediti informaviju preko vjezbaPromjenaStanjaBaza Observer-a!
    this.vjezbeService.fetchAvailableExercisesBase();
    // Povlacimo SVE podatke vjezbeDB iz baze
    this.subMemoryLeakProtect = this.vjezbeService.vjezbaPromjenaStanjaBaza.subscribe(
      (popisVjezbiIzBaze) => {
        this.vjezbeDB = popisVjezbiIzBaze;
        this.isLoading = false;
      }
    );
  }

  onStartTrening(form: NgForm) {
    // pocinjemo vjezbu, saljemo u servis obavijest koja je tocno vjezba
    this.vjezbeService.startVjezba(form.value.vjezba);

    // ostavljeno za primjer za ukljucivanje/isklucivanje EMIT TAB-a
    this.treningStart.emit();
  }

  fetchVjezbe() {
    this.vjezbeService.fetchAvailableExercisesBase();
  }

  ngOnDestroy() {
    this.subMemoryLeakProtect.unsubscribe();
  }
}
