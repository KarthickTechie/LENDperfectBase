import { MenuController } from '@ionic/angular';
import { MasterData } from 'src/app/newapplicant/masterservice';
import { SqliteProvider } from './../global/sqlite';
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { GlobalService } from '../global/global.service';
import { AuthService } from '../auth.service';
import { HandlingError } from "./../utility/ErrorHandling";
import { Subscription } from 'rxjs';
import { environment } from './../../environments/environment';



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
    logoImg: 'assets/imgs/abudhabi.jpg',
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
    public master:MasterData,
    public sqlite:SqliteProvider,
    public menuCtrl:MenuController
  ) {
    this.setting = environment.settings;
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
    if (localStorage.getItem("loginpin")) {
      this.setLoginInfo.logincheck = false;
      this.setLoginInfo.loginpin = false;
      this.setLoginInfo.loginset = true;
      this.setLoginInfo.forgotPwd = false;
    }
  }

  ionViewWillLeave(){
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
      this.setLoginInfo.logincheck = false;
      this.setLoginInfo.loginpin = true;
      this.setLoginInfo.loginset = false;
      this.setLoginInfo.forgotPwd = false;
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
      this.sqlite.insertLoginDetails(this.setUserInfo.username,this.setUserInfo.password,new Date());
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