import { Subscription } from 'rxjs';
import { SqliteProvider } from './../../global/sqlite';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { FormControlData } from "../formcontrol";
import { MasterData } from "../masterservice";
import { HandlingError } from "../../utility/ErrorHandling";
import { GlobalService } from "../../global/global.service";
import { AppDashboardPage } from '../app-dashboard/app-dashboard.page';


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
  id:any;
  incomeId: any;
  applicantType: any;
  slideCheck : Subscription;
  @Output() saveStatus = new EventEmitter();

  constructor(public formctrl: FormControlData, public formBuilder: FormBuilder, public master: MasterData,
    public sqlite: SqliteProvider, private errorHandling: HandlingError, public global: GlobalService, public dashboard: AppDashboardPage) {
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      this.refId = this.global.getRefId();
      this.id = this.global.getId();
      this.applicantType = this.global.getApplicantType();
      if (this.refId) {
        this.getIncomeDetails();
      } else {
        this.refId = "";
      }


  }


  ngOnInit() {
    this.incomeDetails = this.formctrl.incomeform();
    this.validation_messages = this.errorHandling.incomevalid();
    this.empCategoryList = this.master.getempCategoryList();
    this.incomeTypeList = this.master.getincomeTypeList();
    this.incomeList = this.master.getincomeList();
    this.slideCheck = this.dashboard.value.subscribe(slide => {
      if (slide == "income") {
        this.refId = this.global.getRefId();
        this.applicantType = this.global.getApplicantType();
        // if(this.applicantType == "A"){
          this.id = this.global.getId();
        // }
        
      }
    })
    

  }
  ngAfterViewInit() {
    console.log('ngAfterViewInit income details');
    // console.log(Object.keys(this.personalDetails.controls)[0]);
    
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnteriiiiiiiiiiiicccccccccccccccccccccccccccccccccccccccc");
  }

  ionViewWillEnter() {
    console.log("ionviewwillenter");
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
    let saveStatus;
    saveStatus =  this.global.getEditSaveStatus();
    console.log(saveStatus,"income save status............");
    // .forEach(element => {
    //   if (element == "personalSaved") {
    //     saveStatus = "personalSaved";
    //   }
    // });a
    if(saveStatus == "personalSaved"){
      this.global.globalLodingPresent("Please wait...");
      if (this.incomeId) {
        const update = await this.sqlite.updateDetails("incomeDetails", incomeValues, this.refId,this.id);
        this.global.globalLodingDismiss();
        this.saveStatus.emit({value:"incomeTick",slide:"Y"});
        this.global.presentAlert("Alert","Income Details updated successfully!");

      } else {
        const insert = await this.sqlite.insertDetails("incomeDetails", incomeValues, this.applicantType, this.refId,this.id);
        this.incomeId = insert.insertId;
        this.saveStatus.emit({value:"incomeTick",slide:"Y"});
        this.global.globalLodingDismiss();
        this.global.presentAlert("Alert","Income Details saved successfully!");
      }
    }else{
      this.global.presentAlert("Alert","Please fill personal details first!");
    }

  }

  async getIncomeDetails() {
    console.log(this.refId,"inside getincome details");
    let getIncomeData = await this.sqlite.getDetails("incomeDetails", this.refId,this.id);
    debugger;
    if(getIncomeData.length){
    for (let value in this.incomeDetails.controls) {
      if (getIncomeData[0].hasOwnProperty(value)) {
        this.incomeDetails.get(value).setValue(getIncomeData[0][value]);
      }
    }
    this.refId = getIncomeData[0].refId;
    this.id = getIncomeData[0].id;
    this.incomeId = getIncomeData[0].incomeId;
    this.saveStatus.emit({value:"incomeTick",slide:"N"});

  }
}

  ngOnDestroy(){
    this.slideCheck.unsubscribe();
  }


}
