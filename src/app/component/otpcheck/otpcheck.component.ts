import { RestService } from 'src/app/providers/rest';
import { ModalController, NavParams } from '@ionic/angular';
import { GlobalService } from './../../providers/global.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-otpcheck',
  templateUrl: './otpcheck.component.html',
  styleUrls: ['./otpcheck.component.scss'],
})
export class OtpcheckComponent implements OnInit {

  time: BehaviorSubject<string> = new BehaviorSubject('00:30')
  timer: number;
  resend = false;
  otp = false;
  verfication: any;
  otpNumber: any;
  reqID: any;
  beforeverify = true;
  newReqId: any;
  mobileNumber: any;
  constructor(public router: Router, public global: GlobalService, public modalCtrl: ModalController, public navParams: NavParams, public restService: RestService) {
    this.verfication = this.navParams.get('value');
    this.reqID = this.navParams.get('otpRequest');
    this.mobileNumber = this.navParams.get('mobile');
    console.log(navParams.get('value'));
  }

  ngOnInit() {
    this.startTimer(0.5);
  }
  startTimer(duration) {
    this.timer = duration * 60;
    setInterval(() => {
      this.updateTime();
    }, 1000)
  }
  updateTime() {
    let seconds: any = this.timer % 60;
    seconds = String('0' + Math.floor(seconds)).slice(-2);
    const text = `00:${seconds}`;
    this.time.next(text);
    --this.timer;

    if (this.timer < 26) {
      this.otp = true;
    }
    if (this.timer == 0) {
      // this.startTimer(0.5);
      // this.resend = true;
    }
  }
  onClick() {
    this.resend = false;
    this.startTimer(0.5);
  }
  ramp() {
    // this.global.presentAlert('Alert', 'Successfully Verified your OTP Number');
    if (this.verfication == 'aadhar') {

      this.global.verifyAadhar();
    } else if (this.verfication == 'gst') {
      this.global.verifyGst();
    }
    else {
      this.global.verifyOtp();
      this.proceedOTP();

    }
    this.modalCtrl.dismiss();
    //this.router.navigate(['/breramp'], { skipLocationChange: true });
    // this.router.navigate()
  }

  checkOTPStatus() {
    if (this.otpNumber != '') {
      let data =
        {
          "otp": this.otpNumber,
          "request_id": this.reqID
        }
      this.restService.restApiCall('', 'karza/DigitalEssentials/MobileStatus', data).then(resData => {
        console.log(resData, "otp");
        if (resData['status-code'] == '101') {
          if (resData['result']['sim_details'].otp_validated == true) {
            this.newReqId = resData['request_id'];
            this.beforeverify = false;
          } else {
            this.resend = true;
            this.beforeverify = true;
          }


        } else {
          this.resend = true;
          this.beforeverify = true;
          this.global.presentToast("OTP check failed");
        }

      }, error => {
        this.resend = true;
        console.log(error, "response errir");
        this.global.presentAlert('Alert', error.error);
      })
    } else {
      this.global.presentToast("Please Enter the OTP number.");

    }
  }


  proceedOTP() {
    let data =
      {
        "request_id": this.reqID
      }
    this.restService.restApiCall('', 'karza/DigitalEssentials/MobileDetails', data).then(resData => {
      console.log(resData, "otp");
      debugger;
      if (resData['status-code'] == '101') {
        if (resData['result']['sim_details'].otp_validated == true) {
          this.global.otpCheck(resData['result']);

        } else {
          this.global.presentToast("OTP check failed");

        }


      } else {

        this.global.presentToast("OTP check failed");
      }

    }, error => {
      console.log(error, "response errir");
      this.global.presentAlert('Alert', error.error);
    })
  }

  reSendOTP() {
    let data =
      {
        "consent": "Y",
        "mobile": this.mobileNumber
      }
    this.restService.restApiCall('', 'karza/DigitalEssentials/MobileOTP', data).then(resData => {
      console.log(resData, "otp");
      if (resData['status-code'] == '101') {

        this.newReqId = resData['request_id'];
        this.global.presentToast(resData['result'].message);
        this.resend = false;
        this.beforeverify = true;
      } else {
        this.beforeverify = false;
        this.resend = true;
        this.global.presentToast(resData['result'].message);
      }

    }, error => {
      this.beforeverify = false;
      this.resend = true;
      console.log(error, "response errir");
      this.global.presentAlert('Alert', error.error);
    })

  }

}
