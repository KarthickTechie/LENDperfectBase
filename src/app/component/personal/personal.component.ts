import { MasterService } from './../../providers/master.service';
import { AlertController } from '@ionic/angular';
import { ApplicationdetailsPage } from './../../pages/applicationdetails/applicationdetails.page';
import { Subscription } from 'rxjs';
import { GlobalService } from './../../providers/global.service';
import { Router } from '@angular/router';
import { FormcontrolService } from './../../providers/formcontrol.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
})
export class PersonalComponent implements OnInit {

  personalNewDetails: FormGroup;
  genderSelect: any = 'M';
  @Output() saveStatus = new EventEmitter();
  slideCheck: Subscription;
  bioProceed: any;
  profileTypeList: any;


  constructor(public formctrl: FormcontrolService, public master: MasterService, public router: Router, public global: GlobalService,
    public appDetails: ApplicationdetailsPage, public alertCtrl: AlertController) { }

  ngOnInit() {
    this.personalNewDetails = this.formctrl.personalNewform();
    this.profileTypeList = this.master.getFieldInspectList();
    this.slideCheck = this.appDetails.value.subscribe(slide => {
      if (slide == "personal") {
        this.bioProceed = this.global.getBioProceed();
        setTimeout(() => {

          this.global.globalLodingDismiss();
        }, 1000);

        if (this.bioProceed) {
          this.personalNewDetails = this.formctrl.personalNewform('true');
        }
      }
    })


  }


  personalNewSave() {
    this.saveStatus.emit({ value: "personalTick", slide: "Y" });
    if (this.global.getApplicantType() == 'C') {
      this.global.ProccedFurther();
      this.personalNewDetails.reset();
    } else {
      this.global.addCoAppAlert();
      this.personalNewDetails.reset();
    }
    // this.global.presentAlert("Alert", "Personal details saved");
    // this.saveStatus.emit({ value: "personalTick", slide: "Y" });
    // this.confirmAlert("Alert", "Personal details saved");
    // if (this.global.getApplicantType() == 'C') {

    // }else{
    //   this.global.addCoAppAlert();
    // }

    // this.router.navigate(['/productdetails'], { skipLocationChange: true });
  }

  getToday(): string {
    var yesterday = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];
    return yesterday;
  }

  async confirmAlert(title, subtitle) {
    let alert = await this.alertCtrl.create({
      header: title,
      message: subtitle,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.saveStatus.emit({ value: "personalTick", slide: "Y" });
            if (this.global.getApplicantType() == 'C') {
              this.global.ProccedFurther();
            } else {
              this.global.addCoAppAlert();
            }

          }
        }
      ]
    });
    await alert.present();
  }


}
