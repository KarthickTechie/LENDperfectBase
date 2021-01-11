import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receivedapplication',
  templateUrl: './receivedapplication.page.html',
  styleUrls: ['./receivedapplication.page.scss'],
})
export class ReceivedapplicationPage implements OnInit {
  recApplication: any;

  constructor() { 
    this.recApplication = [
      { name: "Rajesh", appNo: "1561372134234", Pan: "BIRTH7997G" },
      { name: "Praveen", appNo: "1561372134234", Pan: "GIRTH7997G" }
    ]
  }

  ngOnInit() {
  }

}
