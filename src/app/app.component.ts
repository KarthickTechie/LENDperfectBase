import { SqliteProvider } from './global/sqlite';
import { Component, ViewEncapsulation } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
    private statusBar: StatusBar, public sqlite: SqliteProvider
  ) {
    this.initializeApp();
    this.sideMenu();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  sideMenu() {
    this.navigate =
      [
        { title: "New Applicant", url: "/newapp", icon: "person" },
        { title: "Existing Applicant", url: "/existapp", icon: "person" },
        { title: "Themes", url: "/theme", icon: "settings" },
      ]
  }

  logout() {

  }

}
