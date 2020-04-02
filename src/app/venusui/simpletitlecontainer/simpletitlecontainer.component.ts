import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'venus-simpletitlecontainer',
  templateUrl: './simpletitlecontainer.component.html',
  styleUrls: ['./simpletitlecontainer.component.css']
})
export class SimpletitlecontainerComponent implements OnInit {

  @Input()title:string;
  
  constructor() { }

  ngOnInit() {
  }

}
