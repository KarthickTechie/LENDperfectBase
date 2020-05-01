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

  userservice(username: string, password: string) {
    let promise = new Promise((resolve, reject) => {
      (username && password) ? resolve('success') : reject('error');
    });
    return promise;
  }


  loginpinservice(pina: string, pinb: string) {
    let promise = new Promise((resolve, reject) => {
      if (pina && pinb) {
        debugger;
        if (pina.toString().length != 4 && pinb.toString().length != 4) {
          reject('PinValid');
        } else if (pina != pinb) {
          reject('PinNotMatch');
        }
        else {
          this.setLoginPin(pina);
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
      (pin == this.getLoginPin()) ? resolve('success') : reject('error')
    });
    return promise;
  }

}
