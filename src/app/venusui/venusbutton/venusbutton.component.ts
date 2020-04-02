import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'venusbutton',
  templateUrl: './venusbutton.component.html',
  styleUrls: ['./venusbutton.component.css']
})
export class VenusbuttonComponent implements OnInit {

  @Input()color:string;
  @Input()cornor:string;
  @Input()size:string;

  constructor() {

   }

  ngOnInit() {
  }

}
