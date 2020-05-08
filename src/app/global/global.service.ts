import { Injectable } from '@angular/core';
import { AlertController } from "@ionic/angular"


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(public alertCtrl ?: AlertController) { }

  async presentAlert(title, subtitle, msg?) {
    let alert = await new AlertController().create({
      header: title,
      subHeader: subtitle,
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }



}
