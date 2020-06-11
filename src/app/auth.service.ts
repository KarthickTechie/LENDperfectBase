import { Injectable } from '@angular/core';

import { GlobalService } from './global/global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private setgpin: any;

  constructor(public global: GlobalService
  ) {

  }

  setLoginPin(pin) {
    this.setgpin = pin;
  }
  getLoginPin() {
    return this.setgpin;
  }

  userservice(userInfo) {
    let promise = new Promise((resolve, reject) => {
      (userInfo.username && userInfo.password) ? resolve('success') : reject('error');
    });
    return promise;
  }


  loginpinservice(pinInfo) {
    let promise = new Promise((resolve, reject) => {
      if (pinInfo.pina && pinInfo.pinb) {
        if (pinInfo.pina.toString().length != 4 && pinInfo.pinb.toString().length != 4) {
          reject('PinValid');
        } else if (pinInfo.pina != pinInfo.pinb) {
          reject('PinNotMatch');
        }
        else {
          localStorage.setItem('setPin', pinInfo.pina);
          this.setLoginPin(pinInfo.pina);
          resolve("PinSuccess");
        }
      } else {
        reject('error');
      }
    });
    return promise;
  }

  loginservice(pin) {
    let promise = new Promise((resolve, reject) => {
      (pin == localStorage.getItem('setPin')) ? resolve('success') : reject('error')
    });
    return promise;
  }

}
