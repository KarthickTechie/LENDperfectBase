import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SqliteProvider } from './../../global/sqlite';
import { MasterData } from './../masterservice';
import { FormControlData } from "../formcontrol";
import { HandlingError } from "../../utility/ErrorHandling";
import { KycScanAPI, ScannerOptions } from 'src/app/utility/kyc-scan-api';
import { Subject, Subscription } from 'rxjs';
import { AppDashboardPage } from '../app-dashboard/app-dashboard.page';
import {GlobalService} from "../../global/global.service";



@Component({
  selector: 'app-kyc-details',
  templateUrl: './kyc-details.component.html',
  styleUrls: ['./kyc-details.component.scss'],
})
export class KycDetailsComponent implements OnInit {

  kycDetails: FormGroup;
  kycProofType: any[];
  kycproofList: any[];
  errorMessage: any;
  hideScanOption: boolean = true;
  scanner: KycScanAPI;
  proofvalsubmitted = false;
  proofValueEmitted: Subscription;
  proofValueEmittedDL: Subscription;
  refId : any;
  id:any;
  kycId: any;
applicantType : any;
slideCheck : Subscription;
@Output() saveStatus = new EventEmitter();


  constructor(
    private formctrl: FormControlData,
    private sqlite: SqliteProvider,
    private master: MasterData,
    private errorHandling: HandlingError,
    public dashboard:AppDashboardPage,
    public global:GlobalService
  ) {
    this.refId = this.global.getRefId();
    this.id = this.global.getId();
    this.applicantType = this.global.getApplicantType();
    if (this.refId) {
      this.getkycDetails();
    } else {
      this.refId = "";
    }

   }

  ngOnInit() {
    
    this.kycDetails = this.formctrl.kycform();
    this.kycProofType = this.master.getKycProofType();
    this.kycproofList = this.master.getKycproofList();
    this.errorMessage = this.errorHandling.kycFormValidation();
    this.slideCheck = this.dashboard.value.subscribe(slide=>{
      if(slide == "kyc"){
        this.refId = this.global.getRefId();
        
        // if(this.applicantType == "A"){
          this.id = this.global.getId();
    this.applicantType = this.global.getApplicantType();

          console.log(this.id,"incccccccccome id"); 
        // }
        
      }
    });
    

  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit kyc details');
    
  }

  

  checkFilledStatus() {
    if (this.kycDetails.get('kycProofType').valid && this.kycDetails.get('kycIdType').valid)
      return true;
    else
      return false;
  }

  showScannerOption() {
    if (this.checkFilledStatus())
      this.hideScanOption = !this.hideScanOption;
    else
      this.errorHandling.chooseProofDocument();
  }

  calAPIMethods(scannerType) {

    this.hideScanOption = true;
    const selecterProof = this.kycDetails.get('kycIdType').value;
    this.scanner = new KycScanAPI();
    const scanoptions: ScannerOptions = {
      scannerType: scannerType,
      proofType: selecterProof
    }

    this.proofValueEmitted = this.scanner.scanDocument(scanoptions).subscribe(scanoutput => {
      console.log(scanoutput, 'hahahahahahahahahahaha');
      this.kycDetails.get('kycIdvalue').setValue(scanoutput)
      this.proofvalsubmitted = true;
    });

  }



  setValidation() {
    //clear value., setDirectiveName for validation., set Min Max length
    this.kycDetails.get('kycIdvalue').reset();
  }

  /* Venkateswari code */


  async kycSave(kycValues) {
    let saveStatus;
    saveStatus =  this.global.getEditSaveStatus();
    if(saveStatus == "personalSaved"){
      this.global.globalLodingPresent("Please wait...");
    if (this.kycId) {
      const update = await this.sqlite.updateDetails("kycDetails", kycValues, this.refId,this.id);
      this.global.globalLodingDismiss();
      this.saveStatus.emit({value:"kycTick",slide:"Y"});
      this.global.presentAlert("Alert","KYC Details updated successfully!");

    } else {
      const insert = await this.sqlite.insertDetails("kycDetails", kycValues, this.applicantType, this.refId,this.id);
      this.kycId = insert.insertId;
      this.saveStatus.emit({value:"kycTick",slide:"Y"});
      this.global.globalLodingDismiss();
      this.global.presentAlert("Alert","KYC Details saved successfully!");

    }
  }else{
    this.global.presentAlert("Alert","Please fill personal details first!");
  }

  }

  async getkycDetails() {
    let getKycData = await this.sqlite.getDetails("kycDetails", this.refId,this.id);
    if(getKycData.length){
    for (let value in this.kycDetails.controls) {
      if (getKycData[0].hasOwnProperty(value)) {
        this.kycDetails.get(value).setValue(getKycData[0][value]);
      }
    }
    this.refId = getKycData[0].refId;
    this.id = getKycData[0].id;
    this.kycId = getKycData[0].kycId;
    this.saveStatus.emit({value:"kycTick",slide:"N"});


    
  }
}

  ngOnDestroy() {
    if (this.proofvalsubmitted) {
      this.proofValueEmitted.unsubscribe();
      
    }
    this.slideCheck.unsubscribe();
    
  }
  

}
