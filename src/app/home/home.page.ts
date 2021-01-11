import { GlobalService } from 'src/app/providers/global.service';
import { HandlingError } from './../utility/ErrorHandling';
import { AuthService } from './../providers/auth.service';
import { MenuController } from '@ionic/angular';
import { MasterService } from './../providers/master.service';
import { ErrorhandlingService } from './../providers/errorhandling.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { RestService } from "src/app/providers/rest";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  setting: any;
  logout: Subscription;

  pinInputType: string = "password";
  inputType: string = "password";
  setLogoImg: LogoInfo = {
    logoImg: 'assets/imgs/baroda.png',
  }
  logoImg: string;

  setLoginInfo: LoginInfo = {
    logincheck: true,
    loginpin: false,
    loginset: false,
    forgotPwd: false
  };

  setPinInfo: pinInfo = {
    pina: '',
    pinb: '',
  }

  pin: any;

  setUserInfo: userInfo = {
    username: '',
    password: ''
  }

  currentUser: string;

  constructor(
    public router: Router,
    public authService: AuthService,
    private errorHandling: HandlingError,
    public globalService: GlobalService,
    public master: MasterService,
    // public sqlite: SqliteProvider,
    public menuCtrl: MenuController,
    public activatedRoute: ActivatedRoute,
    public rest: RestService,

  ) {
    // this.setting = environment.settings;
    this.logoImg = this.setLogoImg.logoImg;
  }
  ngOnInit() {
    this.menuCtrl.enable(false);
    this.logout = this.globalService.logout.subscribe(data => {
      if (data == 'logout') {
        this.logout.unsubscribe()
        this.dologout();
      }
    });
    // if (localStorage.getItem("loginpin")) {
    //   this.setLoginInfo.logincheck = false;
    //   this.setLoginInfo.loginpin = false;
    //   this.setLoginInfo.loginset = true;
    //   this.setLoginInfo.forgotPwd = false;
    // }
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }


  dologout() {

    this.setLoginInfo.logincheck = true;
    this.setLoginInfo.loginpin = false;
    this.setLoginInfo.loginset = false;
    this.setLoginInfo.forgotPwd = false;
    this.setUserInfo.username = '';
    this.setUserInfo.password = '';
    this.setPinInfo.pina = '';
    this.setPinInfo.pinb = '';
    this.pin = '';

  }

  ngDoCheck() {


    localStorage.getItem('logo') ? (this.logoImg = localStorage.getItem('logo')) : this.logoImg = this.setLogoImg.logoImg;
  }

  doLogin() {
    this.authService.userservice(this.setUserInfo).then(loginservice => {



      //    let body = {
      //     "Login": {
      //     "Loginuser": "2020LO",
      //     "Loginpasswd": "Laps@123",
      //     "DeviceId": this.globalService.getDeviceId(),
      //     "IMEI": this.globalService.getIMEI() || "",
      //     "Token": this.globalService.genToken(),
      //     "ReqTime":"",
      //     "ResTime":""
      //   }
      // }  
      let body = {
        "Login": {
          "Loginuser": "9999JFS",
          "Loginpasswd": "laps1234",
          "IMEI": "865207034284534",
          "LLdate": "2020-07-10 16:28:45",
          "Version": "1.0.25",
          "Brach_code": "",
          "Module": "I"
        }
      }



      // this.rest.restApiCall('AuthenticateFromMobileService', 'Login', body).then(data=>{
      //   localStorage.setItem("filter", "");
      //   localStorage.setItem("sort", "");
      //   localStorage.setItem('username', this.globalService.basicEnc('test'));
      //   // this.router.navigate(['/homescreen'], { relativeTo: this.activatedRoute, skipLocationChange: true });
      // },error=>{
      // })
      this.router.navigate(['/homescreen'], { relativeTo: this.activatedRoute, skipLocationChange: true });


      // this.router.navigate(['/homescreen'], { relativeTo: this.activatedRoute, skipLocationChange: true });


      // this.router.navigate(["/dashboard"]);
      // this.setLoginInfo.logincheck = false;
      // this.setLoginInfo.loginpin = true;
      // this.setLoginInfo.loginset = false;
      // this.setLoginInfo.forgotPwd = false;
    }, error => {
      this.errorHandling.getUserPass();
    });
  }


  setPin() {
    this.authService.loginpinservice(this.setPinInfo).then(loginservice => {
      this.setLoginInfo.logincheck = false;
      this.setLoginInfo.loginpin = false;
      this.setLoginInfo.loginset = true;
      this.setLoginInfo.forgotPwd = false;
    }, error => {
      error == 'PinValid' ? this.errorHandling.pinCheck() : error == 'PinNotMatch' ? this.errorHandling.pinNotMatch() : this.errorHandling.pinField()
    });
  }

  login() {
    this.authService.loginservice(this.pin).then(loginSuccess => {
      // this.sqlite.insertLoginDetails(this.setUserInfo.username, this.setUserInfo.password, new Date());
      this.router.navigate(["/dashboard"]);
      localStorage.setItem('loginpin', this.pin);
    }, error => {
      this.errorHandling.getValidPin();
    });
  }

  settings() {
    this.router.navigate(["/setting"]);
  }


  inputChng() {
    if (this.inputType == "password") {
      this.inputType = 'text';
    } else {
      this.inputType = 'password';
    }
  }

  pinInputChng() {
    if (this.pinInputType == "password") {
      this.pinInputType = 'text';
    } else {
      this.pinInputType = 'password';
    }
  }

  ngOnDestroy() {
    this.logout.unsubscribe();
  }

}

interface LoginInfo {
  logincheck: boolean,
  loginpin: boolean,
  loginset: boolean,
  forgotPwd: boolean
}
interface LogoInfo {
  logoImg: string,
}
interface userInfo {
  username: string,
  password: string
}
interface pinInfo {
  pina: string,
  pinb: string
}