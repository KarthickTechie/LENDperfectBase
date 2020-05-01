import { SqliteProvider } from './../../global/sqlite';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MasterData } from './../masterservice';
import { FormControlData } from "../formcontrol";
import { HandlingError } from "../../utility/ErrorHandling";


@Component({
  selector: 'app-kyc-details',
  templateUrl: './kyc-details.component.html',
  styleUrls: ['./kyc-details.component.scss'],
})
export class KycDetailsComponent implements OnInit {

  kycDetails: FormGroup;
  kycproofList: any;
  errorMessage: any;
  constructor(public formctrl: FormControlData, public sqlite: SqliteProvider, public master: MasterData, private errorHandling: HandlingError) { }

  ngOnInit() {
    this.kycDetails = this.formctrl.kycform();
    this.kycproofList = this.master.getKycproofList();
    this.errorMessage = this.errorHandling.kycFormValidation();
  }
  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    this.sqlite.createtable("KYC_DETAILS", "kycId", Object.keys(this.master.getKycTable()), Object.values(this.master.getKycTable()));
  }

  kycSave() {


  }

}
