import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  moduleId: 'module.id',
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
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
