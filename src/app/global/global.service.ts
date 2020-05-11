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
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public menuController: MenuController,
    public alertCtrl: AlertController,
    public translate: TranslateService) { }


  async presentAlert(title, subtitle) {
    let alert = await this.alertCtrl.create({
      header: title,
      subHeader: subtitle,
      buttons: ['OK']
    });
    await alert.present();
  }

  async confirmAlert(title, subtitle) {
    let alert = await this.alertCtrl.create({
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
            this.menuController.close();
            this.logout.next('logout')
            this.router.navigate(["/home"])
            //localStorage.setItem('logout', 'success');
          }
        }
      ]
    });
    await alert.present();
  }

}
