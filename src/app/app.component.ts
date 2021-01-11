import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from './providers/global.service';
import { SqliteProvider } from "./providers/sqlite";
import { MasterService } from "src/app/providers/master.service";
import { Subscription } from 'rxjs';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {

  navigate: any;
  databaseReady: Subscription;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public translate: TranslateService,
    public global: GlobalService,
    public sqlite: SqliteProvider,
    public master: MasterService,
    public file: File,
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

      this.file.checkDir(this.file.externalApplicationStorageDirectory, 'AUDITLOGS').then(result => {
        console.log("Audit log created..")
      }).catch(error => {
        this.file.createDir(this.file.externalApplicationStorageDirectory, 'AUDITLOGS', false).then(res => {
        }, error => alert('Error While Creating Directory AUDITLOGS Directory'))
      })

      this.file.checkDir(this.file.externalApplicationStorageDirectory, 'Vidoes').then(result => {
        console.log("Video folder created..")
      }).catch(error => {
        this.file.createDir(this.file.externalApplicationStorageDirectory, 'Vidoes', false).then(res => {
        }, error => alert('Error While Creating Directory video Directory'))
      })


      this.databaseReady = this.sqlite.databaseReady.subscribe(data => {
        // this.sqlite.createtable("loginDetails", "id", Object.keys(this.master.getLoginTable()), Object.values(this.master.getLoginTable()));
        // this.sqlite.createtable("masterData", "static_id", Object.keys(this.master.getMasterTable()), Object.values(this.master.getMasterTable()));
        // this.sqlite.createtable("AUDIT_LOG", "auditid", Object.keys(this.master.getAuditTable()), Object.values(this.master.getAuditTable()));
        this.sqlite.createAduitTable();

      });


    });
  }


  sideMenu() {
    this.navigate =
      [
        // { title: "Dashboard", url: "/dashboard", icon: "home" },
        { title: "Home", url: "/homescreen", icon: "home" },
        // { title: "New Applicant", url: "/newapp", icon: "person-add" },
        // { title: "Existing Applicant", url: "/existapp", icon: "person" },
        // { title: "Settings", url: "/setting", icon: "settings" },
        // { title: "Audit Log", url: "/auditlog", icon: "clipboard" },
        // { title: "Backup", url: "/backup", icon: "cloud-upload" },
        // { title: "Sync", url: "/sync", icon: "sync-circle-sharp" },
        { title: "QueryInbox", url: "/queryinbox", icon: "mail-unread" },
        { title: "AuditLog", url: "/auditlog", icon: "reader" },
      ]
  }

  logout() {
    this.global.confirmAlert('Confirm logout?', 'Are you sure to logout?');
  }


  settingDetails() {
    // this.router.navigate('/setting');
  }

  calling(number) {
    // this.callNumber.callNumber(number, false).then(res => console.log('Launched dialer!', res))
    //   .catch(err => console.log('Error launching dialer', err));
  }

  ngOnDestroy() {
    this.databaseReady.unsubscribe();
  }

}
