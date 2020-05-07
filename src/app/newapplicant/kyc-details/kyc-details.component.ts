import { SqliteProvider } from './../../global/sqlite';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BarcodeScannerOptions, BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";

import { MasterData } from './../masterservice';
import { FormControlData } from "../formcontrol";
import { HandlingError } from "../../utility/ErrorHandling";
import { KycScanAPI } from 'src/app/utility/kyc-scan-api';


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
  scanner: any;


  constructor(
    public formctrl: FormControlData,
    public sqlite: SqliteProvider,
    public master: MasterData,
    private errorHandling: HandlingError,
    private barcodeScanner: BarcodeScanner
  ) {
    // super(barcodeScanner);
    this.scanner = new KycScanAPI(barcodeScanner);

  }

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

  kycSave() {

  }

  calAPIMethods(scannerType) {
    this.hideScanOption = true;
    if (scannerType == '01') {
      this._qrScanner();
    } else {
      this._ocrScanner();
    }

  }

  _qrScanner() {
    this.scanner._QRScanner().then(data => {
      console.log(data, 'api');
      let qrResponse = this.scanner.formatQRResponse(data);
      this.kycDataBinding(qrResponse);
    }, err => {
      console.log(err);
    })
  }

  kycDataBinding(qrData) {
    if (!!qrData.PrintLetterBarcodeData)
      this.kycDetails.get('kycIdvalue').setValue(qrData.PrintLetterBarcodeData._uid);
    else {
      var responseStr = qrData;
      let arr = responseStr.split(',');
      let DLNO = arr.filter(val => (val.toLowerCase().includes('dlno')))[0].split(':')[1];
      this.kycDetails.get('kycIdvalue').setValue(DLNO);
    }
  }

  _ocrScanner() {

  }


}
