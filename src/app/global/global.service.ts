import { PersonalDetailsComponent } from './../newapplicant/personal-details/personal-details.component';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { AlertController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MenuController, LoadingController } from '@ionic/angular';


import { Subject } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  logout = new Subject();
  alertCtrl = new AlertController();
  applicantType: any;
  refId:any;
  id:any;
  profileImage:any;
  checkSave:any;
  loading:any;
  isLoading:boolean = false;
  @Output() saveStatus = new EventEmitter();

  constructor(public translate: TranslateService, public router: Router,public loadingController:LoadingController) { }


  setApplicantType(value) {
    this.applicantType = value;
  }

  getApplicantType() {
    return this.applicantType;
  }
  
  setRefId(value){
this.refId = value;
  }

  getRefId(){
    return this.refId;
  }

  setId(value){
this.id = value;
  }

  getId(){
    return this.id;
  }

  setProfileImage(image){
    this.profileImage = image;

  }

  getProfileImage(){
    return this.profileImage;
  }

  setEditSaveStatus(value){
this.checkSave = value;
  }

getEditSaveStatus(){
  return this.checkSave;
}

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


  async globalLodingPresent(msg) {
    this.isLoading = true;
    return await this.loadingController.create({
      message: msg,
      spinner: 'circles'
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async globalLodingDismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }


//   async confirmAlertSave(title, subtitle,tick) {
//     let alert = await this.alertCtrl.create({
//       header: title,
//       message: subtitle,
//       buttons: [
//          {
//           text: 'OK',
//           handler: () => {
//         this.saveStatus.emit({value:"personTick",slide:"Y"});
                        
//           }
//         }
//       ]
//     });
//     await alert.present();
//   }
}

  