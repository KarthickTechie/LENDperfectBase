import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { AlertDirective } from './../alert.directive';
import { AlertComponent } from '../alert/alert.component';
import { AlertPage } from "../alert.page";
import { KeytextService } from '../../keytext.service';


@Component({
  selector: 'app-logo',
  templateUrl: './logo.page.html',
  styleUrls: ['./logo.page.scss'],
})
export class LogoPage implements OnInit {

  logoCheck: boolean = false;
  @ViewChild(AlertDirective, { static: false }) alertMessage: AlertDirective;

  setLogoData: setLogoInfo[] = [
    { logoImg: "assets/imgs/almasraf.png", logoName: 'Almasraf', logoId: "default" },
    { logoImg: "assets/imgs/almasraf.png", logoName: 'Almasraf', logoId: "almasraf" },
    { logoImg: "assets/imgs/JSF.png", logoName: 'JFS', logoId: "jfs" },
    { logoImg: "assets/imgs/ujjivan.png", logoName: 'Ujjivan', logoId: "ujjivan" },
    { logoImg: "assets/imgs/yeslogo.png", logoName: 'YesBank', logoId: "yesbank" },
    { logoImg: "assets/imgs/CBI.png", logoName: 'CBI', logoId: "boi" }
  ]
  labelText = KeytextService.labelDeta.logoInfo;

  constructor(
    public alertPage: AlertPage,
    public router: Router, public activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    (this.activatedRoute.snapshot.params['logoicon'] == 'home') ? this.logoCheck = false : this.logoCheck = true;
  }

  logoChange() {
    this.alertPage.getAlertControl(AlertComponent, this.alertMessage, "Appling Logo");
  }

  goBack() {
    this.router.navigate(["/setting"], { relativeTo: this.activatedRoute })
  }

  goHome() {
    this.router.navigate(["/"], { relativeTo: this.activatedRoute })
  }

}

interface setLogoInfo {
  logoImg: string,
  logoName: string,
  logoId: string,
}