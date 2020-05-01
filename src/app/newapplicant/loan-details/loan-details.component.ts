import { SqliteProvider } from './../../global/sqlite';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";

import { FormControlData } from "../formcontrol";
import { MasterData } from "../masterservice";
import { HandlingError } from "../../utility/ErrorHandling";


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

  constructor(public formctrl: FormControlData, public master: MasterData, public sqlite: SqliteProvider, private errorHandling: HandlingError) { }

  ngOnInit() {
    this.loanDetails = this.formctrl.loanform();
    this.validation_messages = this.errorHandling.loanFormValidation();
    this.loanProductList = this.master.getloanProductList();
    this.interestTypeList = this.master.getinterestTypeList();
    this.repaymentModeList = this.master.getrepaymentModeList();
    this.repaymenttypeList = this.master.getrepaymenttypeList();
  }
  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    //console.log(Object.keys(this.personalDetails.controls)[0]);
    this.sqlite.createtable("LOAN_DETAILS", "loanId", Object.keys(this.master.getLoadTable()), Object.values(this.master.getLoadTable()));
  }

  loanSave(value) {
    console.log(value);
  }



}
