import { ErrorHandlingService } from './../../error-handling.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';

import { SqliteProvider } from './../../global/sqlite';
import { MasterData } from './../masterservice';
import { FormControlData } from "../formcontrol";
import { HandlingError } from "../../utility/ErrorHandling";
import { KycScanAPI, ScannerOptions } from '../../utility/kyc-scan-api';
import { AppDashboardPage } from '../app-dashboard/app-dashboard.page';
import { GlobalService } from "../../global/global.service";
import { keyInsert } from './../keyinsert';



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
  refId: any;
  id: any;
  kycId: any;
  applicantType: any;
  slideCheck: Subscription;
  @Output() saveStatus = new EventEmitter();
  keyInsertSub: Subscription;

  constructor(
    private formctrl: FormControlData,
    private sqlite: SqliteProvider,
    private master: MasterData,
    private errorHandling: HandlingError,
    public dashboard: AppDashboardPage,
    public global: GlobalService,
    public keyinsert: keyInsert,
    public errorLogService: ErrorHandlingService
  ) {
    this.refId = this.global.getRefId();
    this.id = this.global.getId();
    this.applicantType = this.global.getApplicantType();
    (this.refId) ? this.getkycDetails() : this.refId = "";
  }

  ngOnInit() {

    this.keyInsertSub = this.global.dataInsert.subscribe(data => {
      if (data) {
        this.kycDetails = this.keyinsert.kycform();
      } else {
        this.kycDetails = this.formctrl.kycform();
      }
    })

    this.kycDetails = this.formctrl.kycform();
    this.kycProofType = this.master.getKycProofType();
    this.kycproofList = this.master.getKycproofList();
    this.errorMessage = this.errorHandling.kycFormValidation();
    this.slideCheck = this.dashboard.value.subscribe(slide => {
      if (slide == "kyc") {
        this.refId = this.global.getRefId();
        this.id = this.global.getId();
        this.applicantType = this.global.getApplicantType();
      }
    });
  }


  checkFilledStatus() {
    if (this.kycDetails.get('proofType').valid && this.kycDetails.get('proofDocument').valid)
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
    const selecterProof = this.kycDetails.get('proofDocument').value;
    this.scanner = new KycScanAPI();
    const scanoptions: ScannerOptions = {
      scannerType: scannerType,
      proofType: selecterProof
    }

    this.proofValueEmitted = this.scanner.scanDocument(scanoptions).subscribe(scanoutput => {
      console.log(scanoutput, 'hahahahahahahahahahaha');
      this.kycDetails.get('proofvalue').setValue(scanoutput)
      this.proofvalsubmitted = true;
    });

  }



  setValidation() {
    //clear value., setDirectiveName for validation., set Min Max length
    this.kycDetails.get('proofvalue').setValue("");
  }

  /* Venkateswari code */


  async kycSave(kycValues) {
    try {
      let saveStatus;
      saveStatus = this.global.getEditSaveStatus();
      (saveStatus == "personalSaved") ? await this.kycSaveDetails(kycValues) : this.global.presentAlert("Alert", "Please fill personal details first!"); 
    } catch (error) {
      this.errorLogService.errorLog(new Error(JSON.stringify(error))); 
    }
    
  }

  async kycSaveDetails(kycValues) {
    try {
      this.global.globalLodingPresent("Please wait...");
    (this.kycId) ? await this.kycUpdateDetails(kycValues) : await this.kycInsertDetails(kycValues); 
    } catch (error) {
      this.errorLogService.errorLog(new Error(JSON.stringify(error))); 
    }
   

  }
  async kycUpdateDetails(kycValues) {
    try {
      const update = await this.sqlite.updateDetails("kycDetails", kycValues, this.refId, this.id);
    this.global.globalLodingDismiss();
    this.saveStatus.emit({ value: "kycTick", slide: "Y" });
    this.global.presentAlert("Alert", "KYC Details updated successfully!");
    } catch (error) {
      this.errorLogService.errorLog(new Error(JSON.stringify(error))); 
      
    }
    
  }

  async kycInsertDetails(kycValues) {
    try {
      const insert = await this.sqlite.insertDetails("kycDetails", kycValues, this.applicantType, this.refId, this.id);
      this.kycId = insert.insertId;
      this.saveStatus.emit({ value: "kycTick", slide: "Y" });
      this.global.globalLodingDismiss();
      this.global.presentAlert("Alert", "KYC Details saved successfully!");
    } catch (error) {
      this.errorLogService.errorLog(new Error(JSON.stringify(error))); 
      
    }
   
  }

  async getkycDetails() {
    try {
      let getKycData = await this.sqlite.getDetails("kycDetails", this.refId, this.id);
    if (getKycData.length) {
      for (let value in this.kycDetails.controls) {
        if (getKycData[0].hasOwnProperty(value)) {
          this.kycDetails.get(value).setValue(getKycData[0][value]);
        }
      }
      this.refId = getKycData[0].refId;
      this.id = getKycData[0].id;
      this.kycId = getKycData[0].kycId;
      this.saveStatus.emit({ value: "kycTick", slide: "N" });
    }
    } catch (error) {
      this.errorLogService.errorLog(new Error(JSON.stringify(error))); 
    }
    
  }

  ngOnDestroy() {
    if (this.proofvalsubmitted) {
      this.proofValueEmitted.unsubscribe();
    }
    this.slideCheck.unsubscribe();
    this.keyInsertSub ? this.keyInsertSub.unsubscribe() : "";
  }


}
