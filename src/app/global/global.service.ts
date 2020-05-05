import { Injectable } from '@angular/core';
import { AlertController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(public alertCtrl: AlertController, public translate: TranslateService) { }


  async presentAlert(title, subtitle) {
    let alert = await this.alertCtrl.create({
      header: title,
      subHeader: subtitle,
      buttons: ['OK']
    });
    await alert.present();
  }


}
