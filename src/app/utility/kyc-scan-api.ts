import { GlobalService } from './../global/global.service';
import { ActionSheetController } from '@ionic/angular';
import { BarcodeScannerOptions, BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { OCR, OCRSourceType, OCRResult } from '@ionic-native/ocr/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera, PictureSourceType } from '@ionic-native/camera/ngx';
import { HandlingError } from './../utility/ErrorHandling';
import * as X2JS from 'x2js';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})

export class KycScanAPI {
    proofSelected: string;
    proofValue = new Subject<any>();
    proofValueDL = new Subject<any>();
    actionSheetCtrl: ActionSheetController;
    barcodeScanner: BarcodeScanner;
    ocr: OCR;
    camera: Camera;
    filePath: FilePath;
    // errorHandler: HandlingError;
    _options: ScannerOptions;
    constructor(public errorHandler: HandlingError, public global: GlobalService) {

        this.actionSheetCtrl = new ActionSheetController();
        this.barcodeScanner = new BarcodeScanner();
        this.ocr = new OCR();
        this.camera = new Camera();
        this.filePath = new FilePath();
        //    this.errorHandler = new HandlingError();

    }

    async  _QRScanner() {
        return await this.barcodeScanner.scan().then(async barcodeData => {
            return barcodeData;
        }).catch(async err => {
            return err;
        });
    }


    formatQRResponse(qrcodeData) {
        if (this.checkXMLData(qrcodeData.text)) {
            let x2js = new X2JS();
            let qrResponse = x2js.xml2js(qrcodeData.text);
            return qrResponse;
        } else {
            return qrcodeData.text;

        }
    }

    checkXMLData(stringData) {
        if (stringData.toLowerCase().includes('xml'))
            return true;
        else
            return false;
    }

    /* Venkateshwari code */

    async selectSource(value) {
        this.proofSelected = value;
        const ocrActionSheet = await this.actionSheetCtrl.create({
            backdropDismiss: true,
            buttons: [
                {
                    icon: 'image-outline',
                    text: 'Use Library',
                    role: 'Use Library',
                    handler: () => {
                        ocrActionSheet.dismiss()
                            .then(val => {
                                // if (isDismissed) {
                                this.global.globalLodingPresent("please wait");
                                this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                                // }
                                // return false;
                                console.log(val, "acionhsheet")
                            }).catch(err => console.log(err, "acionhsheet error"));

                    }
                }, {
                    icon: 'camera-outline',
                    text: 'Capture Image',
                    role: 'Capture Image',
                    handler: () => {

                        ocrActionSheet.dismiss()
                            .then(val => {
                                // if (isDismissed) { 
                                this.global.globalLodingPresent("please wait");
                                this.getPicture(this.camera.PictureSourceType.CAMERA);
                                // }
                                // return false;                        
                                console.log(val, "acionhsheet")
                            }).catch(err => console.log(err, "acionhsheet error"));

                    }
                }, {
                    icon: 'close-circle-outline',
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        await ocrActionSheet.present();
        // const isDismissed = ocrActionSheet.onDidDismiss();
        // console.log(isDismissed, "isdismissed");
    }

    getPicture(sourceType: PictureSourceType) {
        this.camera.getPicture({
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: sourceType,
            allowEdit: true,
            correctOrientation: true
        }).then(async (imageData) => {
            this.filePath.resolveNativePath(imageData).then(nativePath => {
                this.recognizeImage(nativePath).then(data => {
                    if (this.proofSelected == "01") {
                        this.scanPan(data);
                    }
                    else if (this.proofSelected == "05") {
                        this.scanDL(data);
                    }
                    else if (this.proofSelected == "02") {
                        this.scanAadhar(data);
                    }
                    else if (this.proofSelected == "03") {
                        this.scanVoter(data);
                    }
                })
            })
        })
    }

    recognizeImage(nativePath): (Promise<any>) {
        return this.ocr.recText(OCRSourceType.NORMFILEURL, nativePath)
            .then((res: OCRResult) => {
                console.log(JSON.stringify(res), "text value of image");
                return res;
            }).catch((error: any) => {
                console.log(error, "OCR: Error in capturing image.");
                this.errorHandler.ocrErrorInCapture();
            });
    }

    scanPan(data) {
        let pan_array = data.blocks["blocktext"];
        if (pan_array.join(",").includes('Permanent Account Number')) {
            let pan_str = pan_array.join(",");
            //PAN Num:
            let pan_no = pan_str.match(/[A-Z]{5}[0-9]{4}[A-Z]{1}/);
            this.proofValue.next(pan_no);
            this.global.globalLodingDismiss();
            // this.errorHandler.pinField();
            this.errorHandler.panCardSuccessAlert();
        }
        else {
            this.global.globalLodingDismiss();
            this.errorHandler.notScanPan();
        }
    }

    scanAadhar(data) {
        let aadhar_arr = data.lines["linetext"];
        if (aadhar_arr.join(",").toLowerCase().includes('government of india')) {
            let aadhar_string = aadhar_arr.join(",");
            //AADHAR num
            let aa_rep_str = aadhar_string.replace(/\s/g, '');
            let aa_num = aa_rep_str.match(/[0-9]{4}[0-9]{4}[0-9]{4}/);
            console.log(aa_num, "aadhar_api");
            this.proofValue.next(aa_num);
            this.global.globalLodingDismiss();
            this.errorHandler.aadharCardSuccessAlert();
        }
        else {
            this.global.globalLodingDismiss();
            this.errorHandler.notScanAadhar();
        }
    }

    scanVoter(data) {
        let arr_voter = data.lines["linetext"];
        if (arr_voter.join(",").toLowerCase().includes("election commission")) {
            let voter_str = arr_voter.join(",");
            //VOTER id:
            let voter_id = voter_str.match(/[A-Z]{3}[0-9]{7}/);
            this.proofValue.next(voter_id);
            this.global.globalLodingDismiss();
            this.errorHandler.voterSuccessAlert();
        }
        else {
            this.global.globalLodingDismiss();
            this.errorHandler.notScanVoter();
        }
    }

    scanDL(data) {
        let arr_dl = data.blocks["blocktext"];
        if (arr_dl.join(",").includes('Driving Licence')) {
            let aadhar_string = arr_dl.join(",");
            //LI NO:
            let fullstring = aadhar_string.replace(/ /g, '');
            let dl_no1 = fullstring.match(/[A-Z]{2}[0-9A-Z]{3}[0-9]{11}/);
            let dl_no2 = fullstring.match(/[A-Z]{2}[0-9]{2}[0-9]{11}/);

            let repstring = fullstring.replace(/O/g, '0');
            dl_no1 = repstring.match(/[A-Z]{2}[0-9A-Z]{3}[0-9]{11}/);
            dl_no2 = repstring.match(/[A-Z]{2}[0-9]{2}[0-9]{11}/);
            this.proofValueDL.next({ dl_no1, dl_no2 });
            this.global.globalLodingDismiss();
            this.errorHandler.dlSuccessAlert();
        }
        else {
            this.global.globalLodingDismiss();
            this.errorHandler.notScanDl();
        }
    }

    scanDocument(options: ScannerOptions): Subject<any> {

        this._options = options;
        if (options.scannerType == '01') {
            this._qrScanner();
            return this.proofValue;
        } else {
            this.selectSource(this._options.proofType);
            return this.proofValue;

        }

    }

    _qrScanner() {
        this._QRScanner().then(data => {
            console.log(data, 'api');
            let qrResponse = this.formatQRResponse(data);
            this.kycDataBinding(qrResponse);
        }, err => {
            console.log(err);
            this.errorHandler.qrScannerErr();
        })
    }

    _ocrScanner() {
        this.selectSource(this._options.proofType);


    }


    kycDataBinding(qrData) {
        switch (this._options.proofType) {
            case "02":
                if (!!qrData.PrintLetterBarcodeData) {
                    this.proofValue.next(qrData.PrintLetterBarcodeData._uid);
                    this.global.globalLodingDismiss();

                }
                else {

                    this.errorHandler.qrResFormatErr();
                }
                break;
            case "05":
                var responseStr = qrData;
                let arr = responseStr.split(',');
                let DLNO = arr.filter(val => (val.toLowerCase().includes('dlno')))[0].split(':')[1];
                this.proofValue.next(DLNO);
                this.global.globalLodingDismiss();
                break;
            default:
                this.global.globalLodingDismiss();
                this.errorHandler.kycNotMatchErr();
        }

    }



}

export interface ScannerOptions {
    scannerType: string;
    proofType: string;
}