import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global/global.service';


@Component({
  selector: 'app-popoverinfo',
  templateUrl: './popoverinfo.component.html',
  styleUrls: ['./popoverinfo.component.scss'],
})
export class PopoverinfoComponent implements OnInit {

  constructor(public global: GlobalService) { }

  ngOnInit() { }

  popoverInfoClick(info) {
    this.global.infoDetails(info)
  }

}
