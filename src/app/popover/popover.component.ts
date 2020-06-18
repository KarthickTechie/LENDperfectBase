import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GlobalService } from '../global/global.service';
import { NavParams } from '@ionic/angular';


@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  filterCheck: boolean = false;
  sortCheck: boolean = false;
  filterTick: string;
  sortTick: string;

  constructor(public global: GlobalService, public NavParams: NavParams) { 
    this.filterCheck = this.NavParams.get("filterItems");
    this.sortCheck = this.NavParams.get("sortItems");

    this.filterTick = localStorage.getItem("filter");
    this.sortTick = localStorage.getItem("sort");

  }

  ngOnInit() {}


  popoverClick(value, data) {
    this.global.filterEmit(value, data);
  }

}
