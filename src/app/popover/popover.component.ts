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
  viewCheck: boolean = false;

  filterTick: string;
  sortTick: string;
  viewTick: string;

  constructor(public global: GlobalService, public NavParams: NavParams) {
    this.filterCheck = this.NavParams.get("filterItems");
    this.sortCheck = this.NavParams.get("sortItems");
    this.viewCheck = this.NavParams.get("viewItems");

    this.filterTick = localStorage.getItem("filter");
    this.sortTick = localStorage.getItem("sort");
    this.viewTick = localStorage.getItem("view");

  }

  ngOnInit() { }


  popoverClick(value, data) {
    console.log(value, data, "in popover");
    this.global.filterEmit(value, data);
  }

}
