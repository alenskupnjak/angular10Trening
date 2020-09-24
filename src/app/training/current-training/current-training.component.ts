import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: 'module.id',
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  progress: number = 0;
  constructor() {}

  ngOnInit(): void {
    setInterval(() => {
      this.progress = this.progress + 5;
    }, 1000);
  }
}
