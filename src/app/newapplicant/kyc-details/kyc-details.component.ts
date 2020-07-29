import { Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { ErrorHandlingService } from './../../error-handling.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';

import { SqliteProvider } from './../../global/sqlite';
import { MasterData } from './../masterservice';
import { FormControlData } from "../formcontrol";
import { HandlingError } from "../../utility/ErrorHandling";
import { KycScanAPI, ScannerOptions } from '../../utility/kyc-scan-api';
import { AppDashboardPage } from '../app-dashboard.page';
import { GlobalService } from "../../global/global.service";
import { keyInsert } from './../keyinsert';
import { KycScanOptionComponent } from '../kyc-scan-option/kyc-scan-option.component';
import { take} from 'rxjs/operators';



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
  // scanner: KycScanAPI;
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
  scansubscrip: Subscription;
  maxCount: number;


  constructor(
    private formctrl: FormControlData,
    private sqlite: SqliteProvider,
    private master: MasterData,
    private errorHandling: HandlingError,
    public dashboard: AppDashboardPage,
    public global: GlobalService,
    public keyinsert: keyInsert,
    public errorLogService: ErrorHandlingService,
    public popoverController: PopoverController,
    public scanner: KycScanAPI
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

  async showScannerOption(ev) {
    if (this.checkFilledStatus()) {
      // this.hideScanOption = !this.hideScanOption;
      const popover = await this.popoverController.create({
        component: KycScanOptionComponent,
        //componentProps: { filterItems: (filter == 'filter') ? true : false, sortItems: (filter == 'sort') ? true : false },
        cssClass: 'popOver',
        event: ev,
        mode: 'ios',
        translucent: true,
        showBackdrop: true,
        animated: true,
      });
      //console.log('outside filter', filter);

      this.scansubscrip = this.global._scanTypeSelected.pipe(take(1)).subscribe(data => {
        if (data) {
          this.calAPIMethods(data);
          popover.dismiss();

        }

      })
      return await popover.present();

    }
    else
      this.errorHandling.chooseProofDocument();
  }

  calAPIMethods(scannerType) {

    this.hideScanOption = true;
    const selecterProof = this.kycDetails.get('proofDocument').value;
    // this.scanner = new KycScanAPI();
    const scanoptions: ScannerOptions = {
      scannerType: scannerType,
      proofType: selecterProof
    }

    this.scanner.scanDocument(scanoptions).pipe(take(1)).subscribe(scanoutput => {
      console.log(scanoutput, 'hahahahahahahahahahaha');
      // this.proofValueEmitted.unsubscribe();
      if (Array.isArray(scanoutput)) {
        this.kycDetails.get('proofvalue').setValue(scanoutput[0]);
        this.kycDetails.get('proofvalue').updateValueAndValidity();

      } else {
        this.kycDetails.get('proofvalue').setValue(scanoutput);
        this.kycDetails.get('proofvalue').updateValueAndValidity();
      }
      this.proofvalsubmitted = true;
    });

  }



  setValidation() {
    //clear value., setDirectiveName for validation., set Min Max length
    this.kycDetails.get('proofvalue').setValue("");
    this.kycDetails.get('proofvalue').setValidators([Validators.required]);
    this.kycDetails.get('proofvalue').updateValueAndValidity();
    let proofType = this.kycDetails.get('proofDocument');
    if (proofType.value === '01') {
      this.kycDetails.get('proofvalue').clearValidators();
      this.maxCount = 10;
      this.kycDetails.get('proofvalue').setValidators([Validators.required, Validators.pattern('^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$'), Validators.maxLength(10), Validators.minLength(10)]);
    } else if (proofType.value === '02') {
      this.kycDetails.get('proofvalue').clearValidators();
      this.maxCount = 12;
      this.kycDetails.get('proofvalue').setValidators([Validators.required, Validators.pattern('[0-9]{12}'), Validators.maxLength(12), Validators.minLength(12)]);
    } else if (proofType.value === '03') {
      this.kycDetails.get('proofvalue').clearValidators();
      this.maxCount = 10;
      this.kycDetails.get('proofvalue').setValidators([Validators.required, Validators.pattern('[A-Z]{3}[0-9]{7}'), Validators.maxLength(10), Validators.minLength(10)]);
    } else if (proofType.value === '04') {
      this.kycDetails.get('proofvalue').clearValidators();
      this.maxCount = 8;
      this.kycDetails.get('proofvalue').setValidators([Validators.required, Validators.pattern('[A-Z]{1}[0-9]{7}'), Validators.maxLength(8), Validators.minLength(8)]);
    } else if (proofType.value === '05') {
      this.kycDetails.get('proofvalue').clearValidators();
      this.maxCount = 15;
      this.kycDetails.get('proofvalue').setValidators([Validators.required, Validators.pattern('[A-Z]{2}[0-9]{2}[0-9]{11}'), Validators.maxLength(15), Validators.minLength(15)]);
    } else {
      this.kycDetails.get('proofvalue').clearValidators();
      this.kycDetails.get('proofvalue').setValidators(Validators.required);
    }
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
    // if (this.proofvalsubmitted) {
    //   this.proofValueEmitted.unsubscribe();
    // }
    this.slideCheck.unsubscribe();
    this.keyInsertSub ? this.keyInsertSub.unsubscribe() : "";
    (this.scansubscrip) ? this.scansubscrip.unsubscribe() : "";


  }


}
