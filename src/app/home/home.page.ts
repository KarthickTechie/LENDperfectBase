import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

import { GlobalService } from '../global/global.service';
import { AuthService } from '../auth.service';
import { HandlingError } from "./../utility/ErrorHandling";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  logoImg: any = 'assets/imgs/abudhabi.jpg';
  logoInfo: LogoInfo = {
    abudhabi: 'assets/imgs/abudhabi.jpg',
    profile: 'assets/imgs/profile.png',
    round_headshot: 'assets/imgs/round_headshot.png'
  }

  setLoginInfo: LoginInfo = {
    logincheck: true,
    loginpin: false,
    loginset: false,
  };

  name = "almasraf";

  pina: any;
  pinb: any;
  pin: any;
  username: any;
  password: any;

  constructor(
    public router: Router,
    public authService: AuthService,
    private errorHandling: HandlingError
  ) {
    this.logoImg = localStorage.getItem('logo');
  }


  doLogin() {
    this.authService.userservice(this.username, this.password).then(loginservice => {
      this.setLoginInfo.logincheck = false;
      this.setLoginInfo.loginpin = true;
      this.setLoginInfo.loginset = false;
    }, error => {
      this.errorHandling.getUserPass();
    });
  }


  setPin() {
    this.authService.loginpinservice(this.pina, this.pinb).then(loginservice => {
      this.setLoginInfo.logincheck = false;
      this.setLoginInfo.loginpin = false;
      this.setLoginInfo.loginset = true;
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

  logoChange(value) {
    this.logoImg = this.logoInfo[value];
    localStorage.setItem('logo', this.logoInfo[value]);
  }

}

interface LoginInfo {
  logincheck: boolean,
  loginpin: boolean,
  loginset: boolean,
}
interface LogoInfo {
  abudhabi: string,
  profile: string,
  round_headshot: string
}
