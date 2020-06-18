import { MasterData } from './newapplicant/masterservice';
import { Subscription } from 'rxjs';
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
  databaseReady : Subscription;


  constructor(
    public alertCtrl: AlertController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, public sqlite: SqliteProvider,
    public translate: TranslateService,
    public router: Router,
    public globalService: GlobalService,
    public master:MasterData,

  ) {
    this.initializeApp();
    this.sideMenu();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.translate.setDefaultLang('en');
      if (localStorage.getItem("useLang")) {
        this.translate.use(localStorage.getItem("useLang"));
      }


      this.databaseReady =  this.sqlite.databaseReady.subscribe(data=>{
        this.sqlite.createtable("loginDetails", "id", Object.keys(this.master.getLoginTable()), Object.values(this.master.getLoginTable()));
        this.sqlite.createtable("applicationDetails", "id", Object.keys(this.master.getRootTable()), Object.values(this.master.getRootTable()));
      this.sqlite.createtable("personalDetails", "id", Object.keys(this.master.getPersonalTable()), Object.values(this.master.getPersonalTable()));
      this.sqlite.createtable("incomeDetails", "incomeId", Object.keys(this.master.getIncomeTable()), Object.values(this.master.getIncomeTable()));
      this.sqlite.createtable("loanDetails", "loanId", Object.keys(this.master.getLoadTable()), Object.values(this.master.getLoadTable()));
      this.sqlite.createtable("kycDetails", "kycId", Object.keys(this.master.getKycTable()), Object.values(this.master.getKycTable()));
      this.sqlite.createtable("documentDetails", "docId", Object.keys(this.master.getDocumentTable()), Object.values(this.master.getDocumentTable()));
      this.sqlite.createtable("documentImageDetails", "imageId", Object.keys(this.master.getImageDocumentTable()), Object.values(this.master.getImageDocumentTable()));
    });
    });
  }

  sideMenu() {
    this.navigate =
      [
        { title: "Dashboard", url: "/dashboard", icon: "home" },
        // { title: "New Applicant", url: "/newapp", icon: "person-add" },
        // { title: "Existing Applicant", url: "/existapp", icon: "person" },
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

  ngOnDestroy() {
    this.databaseReady.unsubscribe();
  }

}
