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
  alertCtrl = new AlertController();


  constructor(public translate: TranslateService, public router: Router) { }

  async presentAlert(title: string, subtitle: string, msg?: string) {
    // console.log(this.translate.instant(subtitle, "tesssssssssssssssst"));
    let header, subHeader;
    this.translate.get([title, subtitle, msg]).subscribe(async res => {
      console.log(res, "language response");

      let key = Object.keys(res);

      let alert = await this.alertCtrl.create({
        header: res[key[0]],
        subHeader: res[key[1]],
        message: (res[key[2]]) ? res[key[2]] : '',
        buttons: ['OK']
      });
      await alert.present();
    })

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
            this.router.navigate(["/home"])
            //localStorage.setItem('logout', 'success');
          }
        }
      ]
    });
    await alert.present();
  }
}
