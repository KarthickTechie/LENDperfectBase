import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-queryinbox',
  templateUrl: './queryinbox.page.html',
  styleUrls: ['./queryinbox.page.scss'],
})
export class QueryinboxPage implements OnInit {
  queryList: any;

  constructor() {
    this.queryList = [
      { id: 1, name: "Rajesh", position: "left" },
      { id: 2, name: "Praveen", position: "right" },
      { id: 3, name: "Mani", position: "left" },
    ]
   }

  ngOnInit() {
  }

}
