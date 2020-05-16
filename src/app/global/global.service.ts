import { Injectable } from '@angular/core';
import { AlertController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MenuController } from '@ionic/angular';

import { Subject } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class GlobalService {  
  logout = new Subject();
  
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

  async confirmAlert(title, subtitle) {
    let alert = await new AlertController().create({
      header: title,
      message: subtitle,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('cancel');
          }
        }, {
          text: 'Sure',
          handler: () => {
            new MenuController().close();
            this.logout.next('logout');
            //localStorage.setItem('logout', 'success');
          }
        }
      ]
    });
    await alert.present();
  }
}
