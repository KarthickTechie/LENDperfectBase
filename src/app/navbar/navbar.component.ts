import { Component, OnInit } from '@angular/core';
import { DatacenterService } from './../services/datacenter.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers:[DatacenterService]
})
export class NavbarComponent implements OnInit {

  notSubmittedCount:number;
  constructor(private dataCenter:DatacenterService) { 

    this.notSubmittedCount = this.dataCenter.getNotSubmittedApplicationCount()

    window.addEventListener('submitted',()=>{
      this.notSubmittedCount--;
    })
  }

  ngOnInit() {
  }



}
