import { Component, OnInit } from '@angular/core';
import { Applications } from './../model/Applications';
import { DatacenterService } from './../services/datacenter.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {



  applications:Applications[];
  username="Karthick";

  constructor(private dataCenter:DatacenterService) {
      
      this.applications = this.dataCenter.getApplications();

   }

  ngOnInit() {

    

  }

  getUsername(){
    return this.username.toUpperCase();
  }

  onClickSubmitBtn(item:Applications){

    const index = this.applications.indexOf(item);
    const _updatedApplication : Applications = new Applications(
      item.id,
      item.name,
      item.loanamount,
      'submitted'
    );
    this.applications[index] = _updatedApplication;
    window.dispatchEvent(new Event('submitted'))
    
  }

}
