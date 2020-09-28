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
  selector: 'app-past-training-database',
  templateUrl: './past-training-database.component.html',
  styleUrls: ['./past-training-database.component.css'],
})
export class PastTrainingDatabaseComponent implements OnInit,  AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];
  // MatTabledataSource podrazumijeva da ce dobiti podatke u obliku polje
  // stoga ne treba pisati new MatTableDataSource<Vjezba[]>(); !!!
  dataSource = new MatTableDataSource<Vjezba>();
  subMemoryLeakProtect: Subscription;
  // @ViewChild daje pristup template podacima
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private vjezbaService: VjezbeService) {}

  ngOnInit(): void {
    // povlacimo sev podatke za rad u tablici
    this.dataSource.data = this.vjezbaService.getSveZapisaneVjezbe();

    this.subMemoryLeakProtect = this.vjezbaService.vjezbaPromjenaStanja.subscribe(
      (data) => {
        this.dataSource.data = this.vjezbaService.getSveZapisaneVjezbe();
        // this.dataSource.sort = this.sort;
      }
    );
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
  }
}
