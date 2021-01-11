import { Router } from '@angular/router';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs'
import { AlertController } from "@ionic/angular";
import { MenuController, LoadingController, ToastController } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
import { Network } from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  sys_token: string;
  _IMEI: any;

  logout = new Subject();
  otpverify = new Subject();
  cinVerify = new Subject();
  aadharVerify = new Subject();
  panVerify = new Subject();
  gstVerify = new Subject();
  LeiVerify = new Subject();
  _scanTypeSelected = new Subject<any>();
  filterItems = new Subject<any>();
  popoverclose = new Subject<any>();
  familyInfoclose = new Subject<any>();
  alertCtrl = new AlertController();
  popoverInfo = new Subject<any>();
  biocheck = new Subject<any>();
  coappcheck = new Subject<any>();
  mobileAddress = new Subject<any>();

  applicantType: any;
  refId: any;
  id: any;
  profileImage: any;
  checkSave: any;
  bioProceed: any;
  isLoading: boolean = false;

  @Output() slideTo: EventEmitter<any> = new EventEmitter(false);

  constructor(public device: Device, public loadingController: LoadingController, public network:Network, public router: Router, public toastController: ToastController) {

  }

  getNetworkStatus(){
    return this.network.type;
  }

  setApplicantType(value) {
    this.applicantType = value;
  }

  getApplicantType() {
    return this.applicantType;
  }

  setRefId(value) {
    this.refId = value;
  }

  getRefId() {
    return this.refId;
  }

  setId(value) {
    this.id = value;
  }

  getId() {
    return this.id;
  }

  slideToDetails() {
    this.slideTo.emit(true);
  }
  setBioProceed(value) {
    this.bioProceed = value;
  }

  getBioProceed() {
    return this.bioProceed;
  }

  setProfileImage(image) {
    this.profileImage = image;

  }

  getProfileImage() {
    return this.profileImage;
  }

  setEditSaveStatus(value) {
    this.checkSave = value;
  }

  getEditSaveStatus() {
    return this.checkSave;
  }

  filterEmit(value, data) {
    this.filterItems.next({ value, data });
  }
  infoDetails(value) {
    this.popoverInfo.next(value);
  }

  infoClose(value) {
    this.popoverclose.next(value);
  }
  familyInfo(value) {
    this.familyInfoclose.next(value);
  }

  bioCheck(value) {
    this.biocheck.next(value);
  }
  coAppCheck(value) {
    this.coappcheck.next(value);
  }



  async confirmAlert(title, subtitle, page?) {
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
            if (page == 'dashboard') {
              navigator["app"].exitApp();

            } else {

              new MenuController().close();
              // this.logout.next('logout');
              // this.router.navigate(["/home"])
            }
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

  async presentAlert(title: string, subtitle: string, msg?: string) {
    // console.log(this.translate.instant(subtitle, "tesssssssssssssssst"));
    let header, subHeader;
    // this.translate.get([title, subtitle, msg]).subscribe(async res => {
    //   let key = Object.keys(res);
    //   let alert = await this.alertCtrl.create({
    //     header: res[key[0]],
    //     subHeader: res[key[1]],
    //     message: (res[key[2]]) ? res[key[2]] : '',
    //     buttons: ['OK'],
    //   });
    //   await alert.present();
    let alert = await this.alertCtrl.create({
      header: title,
      subHeader: subtitle,
      message: msg ? msg : '',
      buttons: ['OK'],
    });
    await alert.present();

    // })

  }


  async addCoAppAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Personal Details Saved!',
      message: 'Would you like to add Co-Applicant ?',
      buttons: [
        {
          text: 'Skip',
          role: 'cancel',
          handler: (blah) => {
            //navigate to bre product details
            this.router.navigate(['/productdetails']);
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            this.setApplicantType('C');
            try {
              // this.router.navigate(["/dashboard"], { skipLocationChange: true }).then(val => {
              // console.log(val, 'dashboard');
              this.coappcheck.next("C");
              // this.router.navigate(["/newapp"], { skipLocationChange: true }).then(val => {
              // console.log(val, 'object');
              this.setBioProceed('');
              this.globalLodingDismiss();
              // })
              // })
            } catch (error) {
              console.log(error, 'naverror');
            }
          }
        }
      ]
    })
    await alert.present()

  }


  async ProccedFurther() {
    const alert = await this.alertCtrl.create({
      header: 'Personal Details Saved!',
      message: 'Proceed further?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: (blah) => {
            console.log(blah)
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            this.router.navigate(['/productdetails']);

          }
        }
      ]
    })
    await alert.present()
  }


  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }


  getDeviceId() {
    return this.device.uuid;
  }

  setIMEI(val) {
    this._IMEI = val;
  }

  getIMEI() {
    return this._IMEI;
  }

  genToken() {
    let timestamp = new Date().getTime();
    let RanNum = Math.floor(Math.random() * 90000000) + 10000000;
    this.sys_token = (timestamp.toString()) + "_" + (RanNum.toString());
    return this.sys_token;
  }


  basicEnc(val){
    if (val != "" && val != null && val != undefined) {
      return "MV_+"+window.btoa(val);
    }
  }

  basicDec(val){
    if (val != "" && val != null && val != undefined) {
      let vals = val.substring(4)
      return window.atob(vals);
    }else{
      return val;
    }
  }

   async globalTosat(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  verifyOtp(){
    this.otpverify.next(true);
  }
  verifyCin(){
    this.cinVerify.next(true);
  }
  verifyAadhar(){
    this.aadharVerify.next(true);
  }
  
  verifyGst(){
    this.gstVerify.next(true);
  }
  
otpCheck(value){
  this.mobileAddress.next(value);
}
}
