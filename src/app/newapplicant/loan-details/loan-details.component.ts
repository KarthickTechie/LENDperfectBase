import { Subscription } from 'rxjs';
import { SqliteProvider } from './../../global/sqlite';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup } from "@angular/forms";

import { FormControlData } from "../formcontrol";
import { MasterData } from "../masterservice";
import { HandlingError } from "../../utility/ErrorHandling";
import { AppDashboardPage } from '../app-dashboard/app-dashboard.page';
import { GlobalService } from "../../global/global.service";


@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.scss'],
})
export class LoanDetailsComponent implements OnInit {

  loanDetails: FormGroup;
  validation_messages: any;

  loanProductList: any;
  interestTypeList: any;
  repaymenttypeList: any;
  repaymentModeList: any;
  refId: any;
  id:any;
  loanId: any;
  applicantType: any;
  slideCheck: Subscription;
  @Output() saveStatus = new EventEmitter();

  constructor(public formctrl: FormControlData, public master: MasterData, public sqlite: SqliteProvider,
    private errorHandling: HandlingError, public dashboard: AppDashboardPage, public global: GlobalService) { 
    this.refId = this.global.getRefId();
    this.id = this.global.getId();
        this.applicantType = this.global.getApplicantType();
        if (this.refId) {
          this.getLoanDetails();
        } else {
          this.refId = "";
        }

    }

  ngOnInit() {
    
    this.loanDetails = this.formctrl.loanform();
    this.validation_messages = this.errorHandling.loanFormValidation();
    this.loanProductList = this.master.getloanProductList();
    this.interestTypeList = this.master.getinterestTypeList();
    this.repaymentModeList = this.master.getrepaymentModeList();
    this.repaymenttypeList = this.master.getrepaymenttypeList();
    this.slideCheck = this.dashboard.value.subscribe(slide => {
      if (slide == "loan") {
        
        // if(this.applicantType == "A"){
    this.refId = this.global.getRefId();
          this.id = this.global.getId();
           
        // }
        
      }
    });
    
  }
  ngAfterViewInit() {
    console.log('ngAfterViewInit loan details');
    //console.log(Object.keys(this.personalDetails.controls)[0]);
   
  }

  async loanSave(loanValue) {
    
    let saveStatus;
    saveStatus =  this.global.getEditSaveStatus();
    if(saveStatus == "personalSaved"){
      this.global.globalLodingPresent("Please wait...");
    if (this.loanId) {
      const update = await this.sqlite.updateDetails("loanDetails", loanValue, this.refId,this.id);
      this.global.globalLodingDismiss();
      this.saveStatus.emit({value:"loanTick",slide:"Y"});
      this.global.presentAlert("Alert","Loan Details updated successfully!");

    } else {
      const income = await this.sqlite.insertDetails("loanDetails", loanValue, this.applicantType, this.refId,this.id);
      this.loanId = income.insertId;
      this.saveStatus.emit({value:"loanTick",slide:"Y"});
      this.global.globalLodingDismiss();
      this.global.presentAlert("Alert","Loan Details saved successfully!");

    }
  }else{
    this.global.presentAlert("Alert","Please fill personal details first!");
  }
  }

  async getLoanDetails() {
    let getLoanData = await this.sqlite.getDetails("loanDetails", this.refId,this.id);
    if(getLoanData.length){
    for (let value in this.loanDetails.controls) {
      if (getLoanData[0].hasOwnProperty(value)) {
        this.loanDetails.get(value).setValue(getLoanData[0][value]);
      }
    }
    this.refId = getLoanData[0].refId;
    this.id = getLoanData[0].id;
    this.loanId = getLoanData[0].loanId;
    this.saveStatus.emit({value:"loanTick",slide:"N"});


  }
}

ngOnDestroy(){
  this.slideCheck.unsubscribe();
}

}
