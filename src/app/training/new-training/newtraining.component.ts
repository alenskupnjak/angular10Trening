import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  moduleId: 'module.id',
  selector: 'app-newtraining',
  templateUrl: './newtraining.component.html',
  styleUrls: ['./newtraining.component.css']
})
export class NewTrainingComponent implements OnInit {
  @Output() treningStart = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onStartTrening() {
    this.treningStart.emit();
  }

}
