import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

import { GlobalService } from '../global/global.service';
import { AuthService } from '../auth.service';
import { HandlingError } from "./../utility/ErrorHandling";
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
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
    public globalService: GlobalService
  ) {
    this.logoImg = this.setLogoImg.logoImg;

  }
  ngOnInit() {
    this.logout = this.globalService.logout.subscribe(data => {
      if (data == 'logout') {
        this.dologout();
      }
    })
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
    this.authService.loginservice(this.pin).then(loginservice => {
      this.router.navigate(["/dashboard"]);
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