import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: 'module.id',
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
  stanjeTreninga: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
