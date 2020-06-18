import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormGroup } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { Device } from "@ionic-native/device/ngx";


import { KeytextService } from './../../keytext.service';
import { FormControlData } from "../formcontrol";
import { MasterData } from "../masterservice";
import { SqliteProvider } from "../../global/sqlite"
import { HandlingError } from "../../utility/ErrorHandling";
import { GlobalService } from "../../global/global.service";
import { keyInsert } from './../keyinsert';
import { Subscription } from 'rxjs';
import { ErrorHandlingService } from 'src/app/error-handling.service';


@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
})
export class PersonalDetailsComponent implements OnInit {

  personalDetails: FormGroup;
  validation_messages: any;

  genderSelect: any;
  titleList: any;
  nationalityList: any;
  maritalStatusList: any;
  personalData: any;
  addressType: any;
  ionCheck: boolean = false;
  refId: any;
  id: any;
  applicantType: any;
  createdDate: any;
  @Output() saveStatus = new EventEmitter();
  keyInsertSub: Subscription;

  constructor(public formctrl: FormControlData, public master: MasterData, public sqlite: SqliteProvider, private errorHandling: HandlingError,
    private keyService: KeytextService, private translate: TranslateService, public global: GlobalService, public device: Device,
    public alertCtrl: AlertController, public keyinsert: keyInsert, public errorLogService: ErrorHandlingService) {

    this.refId = this.global.getRefId();
    this.applicantType = this.global.getApplicantType();
    this.id = this.global.getId();
    (this.refId) ? this.getPersonalDetails() : this.refId = "";
  }

  ngOnInit() {
    this.keyInsertSub = this.global.dataInsert.subscribe(data => {
      if (data) {
        this.personalDetails = this.keyinsert.personalform();
      } else {
        this.personalDetails = this.formctrl.personalform();
      }
    })
    this.personalDetails = this.formctrl.personalform();
    this.validation_messages = this.errorHandling.personalvalid();
    this.titleList = this.master.getTitleList();
    this.nationalityList = this.master.getNationalityList();
    this.maritalStatusList = this.master.getMaritalStatusList();
    this.createdDate = new Date();
  }


  async personalSave(personDetail) {
    try {
      this.global.getProfileImage() ? await this.personalSaveDetails(personDetail) : this.global.presentAlert("Alert", "Please add profile image!");
    } catch (error) {
      this.errorLogService.errorLog(new Error(JSON.stringify(error)));

    }

  }


  async personalSaveDetails(personDetail) {
    this.global.globalLodingPresent("Please wait...");
    personDetail.profileImage = this.global.getProfileImage();
    if (!this.refId) {
      try {
        const insert = await this.sqlite.addRootDetails(this.createdDate, this.device.uuid, localStorage.getItem("username"));
        this.refId = insert.insertId;
        this.global.setRefId(this.refId);
      } catch (error) {
        this.errorLogService.errorLog(new Error(JSON.stringify(error)));
      }

    }
    try {
      (this.id) ? await this.personalUpdateDetails(personDetail) : await this.personalInsertDetails(personDetail);
    } catch (error) {
      this.errorLogService.errorLog(new Error(JSON.stringify(error)));
    }
  }

  async personalUpdateDetails(personDetail) {
    try {
      const update = await this.sqlite.updateDetails("personalDetails", personDetail, this.refId, this.id);
      this.global.globalLodingDismiss();
      this.global.setEditSaveStatus("personalSaved");
      this.saveStatus.emit({ value: "personTick", slide: "Y" });
      // this.confirmAlert("Alert", "Personal Details updated successfully!");
      this.global.presentAlert("Alert", "Personal Details updated successfully!");
    } catch (error) {
      this.errorLogService.errorLog(new Error(JSON.stringify(error)));
    }
  }

  async personalInsertDetails(personDetail) {
    try {
      const insertDetails = await this.sqlite.insertDetails("personalDetails", personDetail, this.applicantType, this.refId);
      this.id = insertDetails.insertId;
      this.global.setId(this.id);
      this.global.setEditSaveStatus("personalSaved");
      this.saveStatus.emit({ value: "personTick", slide: "Y" });
      this.global.globalLodingDismiss();
      this.global.presentAlert("Alert", "Personal Details saved successfully!");
    } catch (error) {
      this.errorLogService.errorLog(new Error(JSON.stringify(error)));
    }

  }


  async getPersonalDetails() {
    try {
      let getPersonData = await this.sqlite.getDetails("personalDetails", this.refId, this.id);
      if (getPersonData.length) {
        for (let value in this.personalDetails.controls) {
          if (getPersonData[0].hasOwnProperty(value)) {
            this.personalDetails.get(value).setValue(getPersonData[0][value]);
          }
        }
        this.refId = getPersonData[0].refId;
        this.id = getPersonData[0].id;
        this.global.setEditSaveStatus("personalSaved");
        this.saveStatus.emit({ value: "personTick", slide: "N" });
      }
    } catch ({ error }) {
      this.errorLogService.errorLog(new Error(JSON.stringify(error)));
    }
  }


  selectGender() {
    this.genderSelect = (this.personalDetails.controls.title.value == '01' ? 'M' : "F")
  }

  genderChng() {
    this.genderSelect = (this.genderSelect === 'Male' ? 'M' : this.genderSelect === 'F' ? 'F' : 'N');
  }

  getToday(): string {
    var yesterday = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];
    return yesterday;
  }

  getCheckedStatus() {
    if (this.ionCheck == true) {
      if (this.personalDetails.value.address != undefined && this.personalDetails.value.address != '') {
      }
      else {
        this.personalDetails.get('samePerAdd').setValue(false);
        alert('Please add Permanent Address');
      }
    }
  }


  async confirmAlert(title, subtitle) {
    let alert = await this.alertCtrl.create({
      header: title,
      message: subtitle,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.saveStatus.emit({ value: "personTick", slide: "Y" });

          }
        }
      ]
    });
    await alert.present();
  }


  ngOnDestroy() {
    this.keyInsertSub ? this.keyInsertSub.unsubscribe() : "";
  }
}
