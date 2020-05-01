import { Injectable } from '@angular/core';
import { AlertController } from "@ionic/angular"


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(public alertCtrl: AlertController) { }


  async presentAlert(title, subtitle) {
    let alert = await this.alertCtrl.create({
      header: title,
      subHeader: subtitle,
      buttons: ['OK']
    });
    await alert.present();
  }


}
