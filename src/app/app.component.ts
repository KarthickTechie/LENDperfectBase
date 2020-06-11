import { SqliteProvider } from './global/sqlite';
import { Component, ViewEncapsulation, isDevMode } from '@angular/core';
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from './global/global.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  navigate: any;

  constructor(
    public alertCtrl: AlertController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, public sqlite: SqliteProvider,
    public translate: TranslateService,
    public router: Router,
    public globalService: GlobalService,
  ) {
    this.initializeApp();
    this.sideMenu();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.translate.setDefaultLang('en');
      console.log(localStorage.getItem("useLang"), "from local storage");
      if (localStorage.getItem("useLang")) {
        this.translate.use(localStorage.getItem("useLang"));
      }
    });
  }

  sideMenu() {
    this.navigate =
      [
        { title: "Dashboard", url: "/dashboard", icon: "home" },
        { title: "New Applicant", url: "/newapp", icon: "person-add" },
        { title: "Existing Applicant", url: "/existapp", icon: "person" },
        { title: "Settings", url: "/setting", icon: "settings" },
        { title: "Audit Log", url: "/auditlog", icon: "clipboard" },
      ]
  }

  logout() {
    this.globalService.confirmAlert('Confirm logout?', 'Are you sure to logout?');
  }


  settingDetails() {
    // this.router.navigate('/setting');
  }

}
