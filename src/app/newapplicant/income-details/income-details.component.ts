import { SqliteProvider } from './../../global/sqlite';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { FormControlData } from "../formcontrol";
import { MasterData } from "../masterservice";
import { HandlingError } from "../../utility/ErrorHandling";


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

  constructor(public formctrl: FormControlData, public formBuilder: FormBuilder, public master: MasterData, public sqlite: SqliteProvider, private errorHandling: HandlingError) { }

  ngOnInit() {
    this.incomeDetails = this.formctrl.incomeform();
    this.validation_messages = this.errorHandling.incomevalid();
    this.empCategoryList = this.master.getempCategoryList();
    this.incomeTypeList = this.master.getincomeTypeList();
    this.incomeList = this.master.getincomeList();
  }
  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    //console.log(Object.keys(this.personalDetails.controls)[0]);
    // this.sqlite.createtable("INCOME_DETAILS", "incomeId", Object.keys(this.master.getIncomeTable()), Object.values(this.master.getIncomeTable()));
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

  incomeSave(value) {
    console.log(value);
  }


}
