import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  moduleId: 'module.id',
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  @Output() treningExit = new EventEmitter();
  progress: number = 0;
  timer: number;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.startStopTimer();
  }

  // pokreni ili stopiraj mjerac vremena
  startStopTimer() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progres: this.progress,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.treningExit.emit();
      } else {
        this.startStopTimer();
      }
    });
  }
}
