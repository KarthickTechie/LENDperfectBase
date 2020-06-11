import { MasterData } from 'src/app/newapplicant/masterservice';
import { SqliteProvider } from './../global/sqlite';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
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
  databaseReady : Subscription;

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
    public sqlite:SqliteProvider
  ) {
    this.setting = environment.settings;
    this.logoImg = this.setLogoImg.logoImg;
    console.log(this.setting, 'yo mama');
  }
  ngOnInit() {
    this.databaseReady =  this.sqlite.databaseReady.subscribe(data=>{
      this.sqlite.createtable("loginDetails", "id", Object.keys(this.master.getLoginTable()), Object.values(this.master.getLoginTable()));
      this.sqlite.createtable("applicationDetails", "id", Object.keys(this.master.getRootTable()), Object.values(this.master.getRootTable()));
    this.sqlite.createtable("personalDetails", "id", Object.keys(this.master.getPersonalTable()), Object.values(this.master.getPersonalTable()));
    this.sqlite.createtable("incomeDetails", "incomeId", Object.keys(this.master.getIncomeTable()), Object.values(this.master.getIncomeTable()));
    this.sqlite.createtable("loanDetails", "loanId", Object.keys(this.master.getLoadTable()), Object.values(this.master.getLoadTable()));
    this.sqlite.createtable("kycDetails", "kycId", Object.keys(this.master.getKycTable()), Object.values(this.master.getKycTable()));
    });
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
      localStorage.setItem('username', this.setUserInfo.username);
      this.sqlite.insertLoginDetails(this.setUserInfo.username,this.setUserInfo.password,"","","",new Date());
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
    this.databaseReady.unsubscribe();
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