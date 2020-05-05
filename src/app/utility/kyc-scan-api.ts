import { BarcodeScannerOptions, BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import * as X2JS from 'x2js';


export class KycScanAPI {
    constructor(
        private barcodeScanner: BarcodeScanner
    ) {

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

}