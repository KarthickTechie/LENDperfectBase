import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../../providers/global.service';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.scss'],
})
export class ListviewComponent implements OnInit {

  viewTick: string;
  constructor(public global: GlobalService) {
    this.viewTick = localStorage.getItem("view");
  }

  ngOnInit() { }

  popoverClick(value, data) {
    this.global.filterEmit(value, data);
  }

}
