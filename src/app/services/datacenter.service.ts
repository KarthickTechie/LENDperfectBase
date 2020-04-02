import { Injectable } from '@angular/core';
import { Applications } from './../model/Applications';

@Injectable()
export class DatacenterService {

  applications:Applications[] = [
    new Applications(1,'John','50000','notsubmitted'),
    new Applications(2,'Mike','150000','notsubmitted'),
    new Applications(3,'Steve','75000','notsubmitted'),
    new Applications(4,'Bob','250000','notsubmitted'),
    new Applications(5,'Tom','350000','notsubmitted'),
    new Applications(6,'Jerry','450000','notsubmitted'),
    new Applications(3,'Adam','90000','notsubmitted'),
    new Applications(4,'James','125000','notsubmitted'),
    new Applications(5,'David','50000','notsubmitted'),
    new Applications(6,'Alen','50000','notsubmitted'),
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
  
  getLoanAmountAppliedGreaterThan50000():Applications[]{
   
    return this.applications.filter(item=>item.loanamount>50000)
  }

}
