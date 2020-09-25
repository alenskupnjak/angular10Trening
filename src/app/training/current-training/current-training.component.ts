import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VjezbeService } from '../vjezbe.service';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  moduleId: 'module.id',
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  // @Output() treningExit = new EventEmitter();

  // postotak izvedene vjezbe
  progress: number = 0;
  timer: number;

  constructor(
    private dialog: MatDialog,
    private vjezbeService: VjezbeService
  ) {}

  ngOnInit(): void {
    // pocinje vjezba i odbrojavanje do 100%
    this.startTimer();
  }

  // pokreni ili stopiraj mjerac vremena
  startTimer() {
    // povlacimo podatak trenutne vjezbe i dejelimo sa 100 da dobijemo jedan korak i mnozimo sa milisekundama
    const step = (this.vjezbeService.getTrenutnaVjezba().duration / 100) * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.vjezbeService.gotovaVjezba();
        clearInterval(this.timer);
      }
    }, step);
  }

  // pokreni ili stopiraj mjerac vremena
  onStartStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progres: this.progress,
      },
    });
    // true zaustavlja vjezbu i vraca u training.component
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        // zaustavili smo vjezbanje
        this.vjezbeService.prekinutaVjezba(this.progress)
        // this.treningExit.emit();
      } else {
        // nastavljamo vjezbanje
        this.startTimer();
      }
    });
  }
}
