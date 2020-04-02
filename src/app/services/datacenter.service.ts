import { Injectable } from '@angular/core';
import { Applications } from './../model/Applications';

@Injectable()
export class DatacenterService {

  applications:Applications[] = [
    new Applications(1,'John','50000','notsubmitted'),
    new Applications(2,'Mike','50000','notsubmitted'),
    new Applications(3,'Steve','50000','notsubmitted'),
    new Applications(4,'Bob','50000','notsubmitted'),
    new Applications(5,'Tom','50000','notsubmitted'),
    new Applications(6,'Jerry','50000','notsubmitted'),
  ]

  constructor() { }

  getApplications():Applications[]{
    return this.applications;
  }

  getNotSubmittedApplicationCount():number{
      
    return this.applications.filter(item=>item.status=='notsubmitted').length;
  }
  
  getSubmittedApplicationCount():number{
      
    return this.applications.filter(item=>item.status=='submitted').length;
  }

}
