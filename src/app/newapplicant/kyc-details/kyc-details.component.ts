import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SqliteProvider } from './../../global/sqlite';
import { MasterData } from './../masterservice';
import { FormControlData } from "../formcontrol";
import { HandlingError } from "../../utility/ErrorHandling";
import { KycScanAPI, ScannerOptions } from 'src/app/utility/kyc-scan-api';
import { Subject, Subscription } from 'rxjs';


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


  constructor(
    private formctrl: FormControlData,
    private sqlite: SqliteProvider,
    private master: MasterData,
    private errorHandling: HandlingError,
  ) { }

  ngOnInit() {
    this.kycDetails = this.formctrl.kycform();
    this.kycProofType = this.master.getKycProofType();
    this.kycproofList = this.master.getKycproofList();
    this.errorMessage = this.errorHandling.kycFormValidation();

  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    // this.sqlite.createtable("KYC_DETAILS", "kycId", Object.keys(this.master.getKycTable()), Object.values(this.master.getKycTable()));
  }

  kycSave(kycFormData) {

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


  ngOnDestroy() {
    // console.log(
    //   this.proofValueEmitted.closed, "hahahahahahahahahahahahahahahaha"
    // );
    // this.proofValueEmitted.unsubscribe();
    // this.proofValueEmittedDL.unsubscribe();
    if (this.proofvalsubmitted) {
      this.proofValueEmitted.unsubscribe();
      //this.proofValueEmittedDL.unsubscribe();
    }
  }


}
