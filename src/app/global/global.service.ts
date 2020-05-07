import { Injectable } from '@angular/core';
import { AlertController } from "@ionic/angular"
import { BarcodeScannerOptions, BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import * as X2JS from 'x2js';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(
    public alertCtrl: AlertController,
    private barcodeScanner: BarcodeScanner
    ) { }


  async presentAlert(title, subtitle) {
    let alert = await this.alertCtrl.create({
      header: title,
      subHeader: subtitle,
      buttons: ['OK']
    });
    await alert.present();
  }

 async qrScanner() {
  await this.barcodeScanner.scan().then(barcodeData => {
    alert(JSON.stringify(barcodeData))
      var x2js = new X2JS();
      var qrResponse = x2js.xml2js(barcodeData.text);
      alert('hi'+ qrResponse);
      return qrResponse;
    }).catch(err => {
      return err;
    });
  }


}
