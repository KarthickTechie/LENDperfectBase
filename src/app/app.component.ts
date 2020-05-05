import { SqliteProvider } from './global/sqlite';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  navigate: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, public sqlite: SqliteProvider,
    public translate: TranslateService,
    public router: Router
  ) {
    this.initializeApp();
    this.sideMenu();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.translate.setDefaultLang('ti');
    });
  }

  sideMenu() {
    this.navigate =
      [
        { title: "New Applicant", url: "/newapp", icon: "person" },
        { title: "Existing Applicant", url: "/existapp", icon: "person" },
        { title: "Settings", url: "/setting", icon: "settings" }
      ]
  }

  logout() {

  }

  settingDetails() {
    // this.router.navigate('/setting');
  }

}
