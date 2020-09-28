import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { Vjezba } from '../vjezba.model';
import { VjezbeService } from '../vjezbe.service';

@Component({
  moduleId: 'module.id',
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css'],
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = [
    'date',
    'name',
    'calories',
    'duration',
    'state',
    'actions',
  ];

  // MatTabledataSource podrazumijeva da ce dobiti podatke u obliku polje
  // stoga ne treba pisati new MatTableDataSource<Vjezba[]>(); !!!
  dataSource = new MatTableDataSource<Vjezba>();
  subMemoryLeakProtect: Subscription;
  subfinishedExerciseChanged: Subscription;

  // @ViewChild daje pristup template podacima
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ovaVjezba: Vjezba;

  constructor(private vjezbaService: VjezbeService) {}

  ngOnInit(): void {
    // povlacimo sev podatke za rad u tablici
    this.vjezbaService.fetchSveZapisaneVjezbe(); // nastavla se dalje..
    this.subfinishedExerciseChanged = this.vjezbaService.finishedExerciseChanged.subscribe(
      (vjezba) => {
        this.dataSource.data = vjezba;
      }
    );

    this.subMemoryLeakProtect = this.vjezbaService.vjezbaPromjenaStanjaFile.subscribe(
      (data) => {
        this.subfinishedExerciseChanged = this.vjezbaService.finishedExerciseChanged.subscribe(
          (vjezba) => {
            this.dataSource.data = vjezba;
          }
        );
      }
    );
  }

  brisiZapis(id: string) {
    this.vjezbaService.deleteDataToDatabase(id);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.subMemoryLeakProtect.unsubscribe();
    this.subfinishedExerciseChanged.unsubscribe();
  }
}
