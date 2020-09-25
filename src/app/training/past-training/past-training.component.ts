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

import { Vjezba } from '../vjezba.model';
import { VjezbeService } from '../vjezbe.service';

@Component({
  moduleId: 'module.id',
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css'],
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'date',
    'name',
    'calories',
    'duration',
    'state',
  ];

  // MatTabledataSource podrazumijeva da ce dobiti podatke u obliku polje
  // stoga ne treba pisati new MatTableDataSource<Vjezba[]>(); !!!
  dataSource = new MatTableDataSource<Vjezba>();
  subMemoryLeakProtect: Subscription;

  // @ViewChild daje pristup template podacima
  @ViewChild(MatSort) sort: MatSort;

  constructor(private vjezbaService: VjezbeService) {}

  ngOnInit(): void {
    console.log('----------- xxx');
    this.dataSource.data = this.vjezbaService.getSveZapisaneVjezbe();

    this.subMemoryLeakProtect = this.vjezbaService.vjezbaPromjenaStanja.subscribe(
      (data) => {
        console.log('akivito se');
        this.dataSource.data = this.vjezbaService.getSveZapisaneVjezbe();
        this.dataSource.sort = this.sort;
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.subMemoryLeakProtect.unsubscribe();
  }
}
