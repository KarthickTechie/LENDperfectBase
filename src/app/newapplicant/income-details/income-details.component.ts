import { ErrorHandlingService } from './../../error-handling.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FormControlData } from "../formcontrol";
import { SqliteProvider } from './../../global/sqlite';
import { MasterData } from "../masterservice";
import { HandlingError } from "../../utility/ErrorHandling";
import { GlobalService } from "../../global/global.service";
import { AppDashboardPage } from '../app-dashboard.page';
import { keyInsert } from './../keyinsert';


@Component({
  selector: 'app-income-details',
  templateUrl: './income-details.component.html',
  styleUrls: ['./income-details.component.scss'],
})
export class IncomeDetailsComponent implements OnInit {

  incomeDetails: FormGroup;
  validation_messages: any;

  empCategoryList: any;
  incomeTypeList: any;
  incomeList: any;
  refId: any;
  id: any;
  incomeId: any;
  applicantType: any;
  slideCheck: Subscription;
  @Output() saveStatus = new EventEmitter();
  keyInsertSub: Subscription;

  constructor(public formctrl: FormControlData, public formBuilder: FormBuilder, public master: MasterData,
    public sqlite: SqliteProvider, private errorHandling: HandlingError, public global: GlobalService, public dashboard: AppDashboardPage, public keyinsert: keyInsert,
    public errorLogService: ErrorHandlingService) {
    this.refId = this.global.getRefId();
    this.id = this.global.getId();
    this.applicantType = this.global.getApplicantType();
    (this.refId) ? this.getIncomeDetails() : this.refId = "";
  }


  ngOnInit() {

    this.keyInsertSub = this.global.dataInsert.subscribe(data => {
      if (data) {
        this.incomeDetails = this.keyinsert.incomeform();
      } else {
        this.incomeDetails = this.formctrl.incomeform();
      }
    })

    this.incomeDetails = this.formctrl.incomeform();
    this.validation_messages = this.errorHandling.incomevalid();
    this.empCategoryList = this.master.getempCategoryList();
    this.incomeTypeList = this.master.getincomeTypeList();
    this.incomeList = this.master.getincomeList();
    this.slideCheck = this.dashboard.value.subscribe(slide => {
      if (slide == "income") {
        this.refId = this.global.getRefId();
        this.applicantType = this.global.getApplicantType();
        this.id = this.global.getId();
      }
    })
  }


  getToday(): string {
    var yesterday = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];
    return yesterday;
  }

  addincomefield(): void {
    const control = <FormArray>this.incomeDetails.controls.otherincomes;
    control.push(this.initIncomeFields());
  }

  initIncomeFields(): FormGroup {
    return this.formBuilder.group({
      otherincomeid: '',
      iname: [''],
      iotamount: ['']
    });
  }

  async incomeSave(incomeValues) {
    try {
      let saveStatus;
    saveStatus = this.global.getEditSaveStatus();
    (saveStatus == "personalSaved") ? await this.incomeSaveDetails(incomeValues) : this.global.presentAlert("Alert", "Please fill personal details first!");
    } catch (error) {
      this.errorLogService.errorLog(new Error(JSON.stringify(error)));
    }
    
  }


  async incomeSaveDetails(incomeValues) {
    try {
      this.global.globalLodingPresent("Please wait...");
      (this.incomeId) ? await this.incomeUpdateDetails(incomeValues) : await this.incomeInsertDetails(incomeValues);  
    } catch (error) {
      this.errorLogService.errorLog(new Error(JSON.stringify(error)));     
    }
    
  }

  async incomeUpdateDetails(incomeValues) {
    try {   
      const update = await this.sqlite.updateDetails("incomeDetails", incomeValues, this.refId, this.id);
      this.global.globalLodingDismiss();
      this.saveStatus.emit({ value: "incomeTick", slide: "Y" });
      this.global.presentAlert("Alert", "Income Details updated successfully!");
    } catch (error) {
      this.errorLogService.errorLog(new Error(JSON.stringify(error)));
    }
  }

  async incomeInsertDetails(incomeValues) {
    try {
      const insert = await this.sqlite.insertDetails("incomeDetails", incomeValues, this.applicantType, this.refId, this.id);
      this.incomeId = insert.insertId;
      this.saveStatus.emit({ value: "incomeTick", slide: "Y" });
      this.global.globalLodingDismiss();
      this.global.presentAlert("Alert", "Income Details saved successfully!");
      
    } catch (error) {
      this.errorLogService.errorLog(new Error(JSON.stringify(error)));
    }
  }

  async getIncomeDetails() {
    try {
      let getIncomeData = await this.sqlite.getDetails("incomeDetails", this.refId, this.id);
      if (getIncomeData.length) {
        for (let value in this.incomeDetails.controls) {
          if (getIncomeData[0].hasOwnProperty(value)) {
            this.incomeDetails.get(value).setValue(getIncomeData[0][value]);
          }
        }
        this.refId = getIncomeData[0].refId;
        this.id = getIncomeData[0].id;
        this.incomeId = getIncomeData[0].incomeId;
        this.saveStatus.emit({ value: "incomeTick", slide: "N" });
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
