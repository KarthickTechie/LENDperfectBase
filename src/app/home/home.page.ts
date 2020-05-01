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

  private setLoginInfo: LoginInfo = {
    logincheck: true,
    loginpin: false,
    loginset: false,
  };

  name = "almasraf";

  private pina: any;
  private pinb: any;
  private pin: any;
  private username: any;
  private password: any;

  constructor(
    public router: Router,
    public authService: AuthService,
    private errorHandling: HandlingError
  ) {

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

}

interface LoginInfo {
  logincheck: boolean,
  loginpin: boolean,
  loginset: boolean,
}

