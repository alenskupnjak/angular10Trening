import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  moduleId: 'module.id',
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

@Output() closeToggle = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }


  onClose() {
    this.closeToggle.emit();
  }



}
