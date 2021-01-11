import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

  time: BehaviorSubject<string> = new BehaviorSubject('00:30')
  timer: number;
  resend = false;
  otp = false;
  constructor(public router: Router) { }

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
      this.resend = true;
    }
  }
  onClick() {
    this.resend = false;
    this.startTimer(0.5);
  }
  ramp() {
    this.router.navigate(['/breramp'])
  }



}
