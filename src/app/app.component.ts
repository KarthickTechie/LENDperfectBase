import { Location } from '@angular/common';
import { MasterData } from './newapplicant/masterservice';
import { Subscription } from 'rxjs';
import { SqliteProvider } from './global/sqlite';
import { Component, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { Router } from "@angular/router";
import { AlertController, IonRouterOutlet, Platform, ActionSheetController, ModalController, PopoverController } from "@ionic/angular";
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from './global/global.service';
import { CallNumber } from '@ionic-native/call-number/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  navigate: any;
  databaseReady: Subscription;
  @ViewChildren(IonRouterOutlet) routerOutlet: QueryList<IonRouterOutlet>;


  constructor(
    public alertCtrl: AlertController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, public sqlite: SqliteProvider,
    public translate: TranslateService,
    public router: Router,
    public globalService: GlobalService,
    public master: MasterData,
    public location: Location,
    public actionCtrl: ActionSheetController,
    public viewContainerRef: ViewContainerRef,
    public modalCtrl: ModalController,
    public popOverCtrl: PopoverController,
    public callNumber: CallNumber

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


      this.databaseReady = this.sqlite.databaseReady.subscribe(data => {
        this.sqlite.createtable("loginDetails", "id", Object.keys(this.master.getLoginTable()), Object.values(this.master.getLoginTable()));
        this.sqlite.createtable("applicationDetails", "id", Object.keys(this.master.getRootTable()), Object.values(this.master.getRootTable()));
        this.sqlite.createtable("personalDetails", "id", Object.keys(this.master.getPersonalTable()), Object.values(this.master.getPersonalTable()));
        this.sqlite.createtable("incomeDetails", "incomeId", Object.keys(this.master.getIncomeTable()), Object.values(this.master.getIncomeTable()));
        this.sqlite.createtable("loanDetails", "loanId", Object.keys(this.master.getLoadTable()), Object.values(this.master.getLoadTable()));
        this.sqlite.createtable("kycDetails", "kycId", Object.keys(this.master.getKycTable()), Object.values(this.master.getKycTable()));
        this.sqlite.createtable("documentDetails", "docId", Object.keys(this.master.getDocumentTable()), Object.values(this.master.getDocumentTable()));
        this.sqlite.createtable("documentImageDetails", "imageId", Object.keys(this.master.getImageDocumentTable()), Object.values(this.master.getImageDocumentTable()));
        this.sqlite.createtable("uploadDocuments", "uploadId", Object.keys(this.master.getUploadDocumentTable()), Object.values(this.master.getUploadDocumentTable()));
      });
      this.platform.backButton.subscribeWithPriority(0, async () => {
        // if(this.viewContainerRef){
        // console.log("inside viewcontainerref");

        // }

        const modal = await this.modalCtrl.getTop();
        if (modal) {
          console.log("inside modal");
          modal.dismiss({
            'signature': false
          });
          return
        }

        const action = await this.actionCtrl.getTop();
        if (action) {
          console.log("inside actionsheet");
          action.dismiss();
          return
        }

        const popover = await this.popOverCtrl.getTop();
        if (popover) {
          console.log("inside popover");
          // popover.dismiss();
          // return
        }


        console.log(this.viewContainerRef, "viewcontariner");
        console.log(this.popOverCtrl, "popoverCtrl");
        console.log(this.routerOutlet, "handler");

        console.log(this.router.url.split("?")[0], "url");
        this.routerOutlet.forEach((outlet: IonRouterOutlet) => {
          if (this.router.url == "/dashboard") {
            console.log("want to exit");
            this.globalService.confirmAlert('Confirm exit?', 'Are you sure to exit?', 'dashboard');
            // navigator["app"].exitApp();
          } else {
            const outLetButton = ["/existappdetails", "/detailsview", "/cibilcheck"];


            // if (outlet && outlet.canGoBack()) {
            if (outlet) {
              console.log(outlet, "routeraoutelt")
              if (outLetButton.includes(this.router.url.split("?")[0])) {
                console.log("if");
                this.router.navigate(['/existapp'], { skipLocationChange: true });
              } else if (this.router.url == "/existapp") {
                console.log("else if");
                this.router.navigate(['/dashboard'], { skipLocationChange: true });
              } else if (this.router.url.substring(this.router.url.indexOf('?')+1,this.router.url.indexOf('&')) == "flow=true") {
                this.router.navigate(['/dashboard'], { skipLocationChange: true });
              }
              else if (this.router.url == "/gallery") {
                this.router.navigate(['/newapp'], { skipLocationChange: true, queryParams: { gallery: true } });
              }
              else if (this.router.url == "/setting") {
                this.router.navigate(['/dashboard'], { skipLocationChange: true });
              }
              else if (this.router.url == "/auditlog") {
                this.router.navigate(['/dashboard'], { skipLocationChange: true });
              }
              else if (this.router.url == "/setting/theme") {
                this.router.navigate(['/setting'], { skipLocationChange: true });
              } else if (this.router.url == "/setting/language") {
                this.router.navigate(['/setting'], { skipLocationChange: true });                                   
              } else if (this.router.url == "/setting/logo") {
                this.router.navigate(['/setting'], { skipLocationChange: true });
              } else if (this.router.url == "/backup") {
                this.router.navigate(['/dashboard'], { skipLocationChange: true });
              } else if (this.router.url == "/sync") {
                this.router.navigate(['/dashboard'], { skipLocationChange: true });
              }
              else {
                outlet.pop();
              }
            }
            else {
              outlet.pop();
            }
          }
        })
        // }
        // console.log(this.router.parseUrl(this.router.url), "url");
        // const urlTree = this.router.parseUrl(this.router.url)
        // const urlWithoutParams = urlTree.root.children['primary'].segments.map(it => it.path).join('/');
        // console.log(urlWithoutParams, "withoutparams");

      })
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
        { title: "Backup", url: "/backup", icon: "cloud-upload" },
        { title: "Sync", url: "/sync", icon: "sync-circle-sharp" }
      ]
  }

  logout() {
    this.globalService.confirmAlert('Confirm logout?', 'Are you sure to logout?');
  }


  settingDetails() {
    // this.router.navigate('/setting');
  }

  calling(number) {
    this.callNumber.callNumber(number, false).then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  ngOnDestroy() {
    this.databaseReady.unsubscribe();
  }

}
