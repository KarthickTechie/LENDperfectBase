import { ErrorHandlingService } from './../../error-handling.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup } from "@angular/forms";

import { FormControlData } from "../formcontrol";
import { MasterData } from "../masterservice";
import { HandlingError } from "../../utility/ErrorHandling";
import { AppDashboardPage } from '../app-dashboard/app-dashboard.page';
import { GlobalService } from "../../global/global.service";
import { SqliteProvider } from './../../global/sqlite';
import { keyInsert } from './../keyinsert';


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
  id: any;
  loanId: any;
  applicantType: any;
  slideCheck: Subscription;
  @Output() saveStatus = new EventEmitter();
  keyInsertSub: Subscription;

  constructor(public formctrl: FormControlData, public master: MasterData, public sqlite: SqliteProvider,
    public errorLogService: ErrorHandlingService,private errorHandling: HandlingError, public dashboard: AppDashboardPage, public global: GlobalService, public keyinsert: keyInsert,) {
    this.refId = this.global.getRefId();
    this.id = this.global.getId();
    this.applicantType = this.global.getApplicantType();
    (this.refId) ? this.getLoanDetails() : this.refId = "";
  }

  ngOnInit() {
    this.keyInsertSub = this.global.dataInsert.subscribe(data => {
      if (data) {
        this.loanDetails = this.keyinsert.loanform();
      } else {
        this.loanDetails = this.formctrl.loanform();
      }
    })
    this.loanDetails = this.formctrl.loanform();
    this.validation_messages = this.errorHandling.loanFormValidation();
    this.loanProductList = this.master.getloanProductList();
    this.interestTypeList = this.master.getinterestTypeList();
    this.repaymentModeList = this.master.getrepaymentModeList();
    this.repaymenttypeList = this.master.getrepaymenttypeList();
    this.slideCheck = this.dashboard.value.subscribe(slide => {
      if (slide == "loan") {
        this.refId = this.global.getRefId();
        this.id = this.global.getId();
      }
    });
  }

  async loanSave(loanValue) {
    try {
      let saveStatus;
      saveStatus = this.global.getEditSaveStatus();
      (saveStatus == "personalSaved") ? await this.loanSaveDetails(loanValue) : this.global.presentAlert("Alert", "Please fill personal details first!"); 
    } catch (error) {
      this.errorLogService.errorLog(new Error(JSON.stringify(error)));
    }
    
  }

  async loanSaveDetails(loanValue) {
    try {
      this.global.globalLodingPresent("Please wait...");
    (this.loanId) ? await this.loanUpdateDetails(loanValue) : await this.loanInsertDetails(loanValue);
    } catch (error) {
      this.errorLogService.errorLog(new Error(JSON.stringify(error)));
      
    }
    
  }

  async loanUpdateDetails(loanValue) {
    try {
      const update = await this.sqlite.updateDetails("loanDetails", loanValue, this.refId, this.id);
      this.global.globalLodingDismiss();
      this.saveStatus.emit({ value: "loanTick", slide: "Y" });
      this.global.presentAlert("Alert", "Loan Details updated successfully!");
    } catch (error) {
      this.errorLogService.errorLog(new Error(JSON.stringify(error)));
      
    }
   
  }

  async loanInsertDetails(loanValue) {
    try {
      const income = await this.sqlite.insertDetails("loanDetails", loanValue, this.applicantType, this.refId, this.id);
      this.loanId = income.insertId;
      this.saveStatus.emit({ value: "loanTick", slide: "Y" });
      this.global.globalLodingDismiss();
      this.global.presentAlert("Alert", "Loan Details saved successfully!");
    } catch (error) {
      this.errorLogService.errorLog(new Error(JSON.stringify(error)));
      
    }
   
  }

  async getLoanDetails() {
    try {
      let getLoanData = await this.sqlite.getDetails("loanDetails", this.refId, this.id);
      if (getLoanData.length) {
        for (let value in this.loanDetails.controls) {
          if (getLoanData[0].hasOwnProperty(value)) {
            this.loanDetails.get(value).setValue(getLoanData[0][value]);
          }
        }
        this.refId = getLoanData[0].refId;
        this.id = getLoanData[0].id;
        this.loanId = getLoanData[0].loanId;
        this.saveStatus.emit({ value: "loanTick", slide: "N" });
      }
    } catch (error) {
      this.errorLogService.errorLog(new Error(JSON.stringify(error)));
      
    }
   
  }

  ngOnDestroy() {
    this.slideCheck.unsubscribe();
    this.keyInsertSub ? this.keyInsertSub.unsubscribe() : "";
  }

}
