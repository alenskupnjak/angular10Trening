import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Vjezba } from '../vjezba.model';
import { VjezbeService } from '../vjezbe.service';

@Component({
  moduleId: 'module.id',
  selector: 'app-newtraining',
  templateUrl: './newtraining.component.html',
  styleUrls: ['./newtraining.component.css'],
})
export class NewTrainingComponent implements OnInit {
  @Output() treningStart = new EventEmitter<any>();
  vjezbe: Vjezba[] = [];

  constructor(private vjezbeService: VjezbeService) {}

  ngOnInit(): void {
    // inicijalno povlacimo sve definirano vjezbe za meni
    this.vjezbe = this.vjezbeService.getAvailableExercises();
  }

  onStartTrening(form: NgForm) {
    // pocinjemo vjezbu, saljemo u servis obavijest koja je tocno vjezba
    this.vjezbeService.startVjezba(form.value.vjezba);

    // ostavljeno za primjer za ukljucivanje/isklucivanje EMIT TAB-a
    this.treningStart.emit();
  }
}
