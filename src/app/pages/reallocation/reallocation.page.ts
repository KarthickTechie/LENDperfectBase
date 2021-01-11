import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reallocation',
  templateUrl: './reallocation.page.html',
  styleUrls: ['./reallocation.page.scss'],
})
export class ReallocationPage implements OnInit {
  reallocate: any;

  constructor() { }

  ngOnInit() {

    this.reallocate = [
      { name: "Rajesh", appNo: "1561372134234", Pan: "BIRTH7997G" },
      { name: "Praveen", appNo: "1561372134234", Pan: "GIRTH7997G" }
    ]
  }

}
