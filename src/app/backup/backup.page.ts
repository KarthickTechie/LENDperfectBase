import { Component, OnInit, ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SqliteProvider } from '../global/sqlite';
import { HandlingError } from '../utility/ErrorHandling';
import { GlobalService } from '../global/global.service';
import { resolve } from 'url';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
// import { BackgroundMode } from '@ionic-native/background-mode';
// import { BackgroundMode } from '@ionic-native/background-mode/ngx';

import { BackupAndSync } from '../utility/backup-sync';


@Component({
  selector: 'app-backup',
  templateUrl: './backup.page.html',
  styleUrls: ['./backup.page.scss'],
})
export class BackupPage implements OnInit {

  listOfApplication: any[] = [];
  selectedItems = [];
  backUpAndSync: BackupAndSync;

  constructor(
    private sqlite: SqliteProvider,
    private errorHandler: HandlingError,
    private http: HttpClient,
    private global: GlobalService,
    private elementRef: ElementRef,
    private platform: Platform,
    private storage: Storage,
    // private backgroundMode: BackgroundMode
    // private backgroundProc: typeof BackgroundMode
  ) {
    this.backUpAndSync = new BackupAndSync(this.http, this.sqlite);

    this.platform.ready().then(rdy => {
      this.backUpAndSync.localNotifications.on('try').subscribe((notification) => {
        console.log("Backup Notification Subscribed");
        this.storage.get('backupData').then(backupJSONString => {
          this.doBackup(backupJSONString);
        })
      })

    })
  }

  ngOnInit() {
    // this.getNotBackupApplication();
  }

  ionViewDidEnter() {
    this.getNotBackupApplication();
  }

   getNotBackupApplication() {
    this.sqlite.getNotBackupApplication().then(data =>{
      this.listOfApplication =  data;
    })
  }

  checkSelectedStatus(i) {
    let checkBoxCheck = (document.querySelectorAll("#back-item-checkbox")[i] as HTMLInputElement).checked;
    if (!checkBoxCheck) {
      if (this.selectedItems.length >= 10) {
        this.errorHandler.backupListExceeds();
        (document.querySelectorAll("#back-item-checkbox")[i] as HTMLInputElement).checked = true;
      } else {
        this.selectedItems.push(i);
        console.log(this.selectedItems);
      }
    } else {
      this.selectedItems = this.removeSelectedElement(this.selectedItems, i);
      console.log(this.selectedItems);
    }

  }

  removeSelectedElement(array, value) {
    return array.filter(item => {
      return item != value;
    })
  }

  startBackupProcess() {
    if (this.selectedItems.length > 0) {

      this.selectedItems.map(id =>
        (document.querySelectorAll("#back-item-checkbox")[id] as HTMLInputElement).checked = false
      )
      this.backUpAndSync.localNotifications.clearAll().then(async res => {
        this.backUpAndSync.localNotification(
          {
            id: 1,
            title: 'Back-up',
            text: 'Processing...',
            progressBar: { enabled: true, maxValue: 0 }
          })

        let backUpDataJson = await this.mapBackupJSON();
        this.doBackup(JSON.stringify(backUpDataJson));
        // this.selectedItems = [];
      })
    } else
      this.errorHandler.backupListMinCount();
  }

  reset() {
    this.sqlite.resetBackup();
  }

   removeBackupData() {
    let index = 0;
    for (let itemNumber of this.selectedItems) {
      // this.listOfApplication.splice(itemNumber, 1, 0);
      this.sqlite.updateBackUpStatus(this.listOfApplication[itemNumber].tempAppNo);
      // await this.updateBackUpStatus(this.listOfApplication[itemNumber].tempAppNo);
        if (index == this.selectedItems.length - 1) {
          this.getNotBackupApplication();
        }
        index++;

    }

  }

  doBackup(backupJSONString) {

    this.backUpAndSync.backupAPICall(backupJSONString).subscribe(data => {

      this.removeBackupData();

        this.backUpAndSync.localNotifications.clearAll().then(_ => {
          this.backUpAndSync.localNotification({
            id: 2,
            title: 'Back-up',
            text: `Process done successfully!`,
            // trigger: { at: new Date(new Date().getTime() + 250) }
          })
        }).then(_ => {
          this.global.presentAlert('Back-up', `${this.selectedItems.length} Application(s) Backed up`);
          this.selectedItems = [];
        })

      

    }, err => {
      console.log(err);
      this.selectedItems = [];
      this.backUpAndSync.localNotifications.clearAll().then(_ => {
        this.backUpAndSync.localNotification({
          id: 2,
          title: 'Back-up',
          text: `Back-up Failed!. Error, ${err.split(':').pop()}`,
          actions: [{ id: 'try', title: 'Re-try' }],
          // trigger: { at: new Date(new Date().getTime() + 250) }
        })
      })
    })
  }


 async mapBackupJSON() {
    let backupJSON = {};
    let index = 0;
    for (let itemNumber of this.selectedItems) {
      let reqObj = this.listOfApplication[itemNumber];
      debugger;
      backupJSON[reqObj['tempAppNo']] = await this.backUpAndSync.backupApplicationObj(reqObj);
      let val = Math.round(((index + 1) / this.selectedItems.length) * 100);
      this.backUpAndSync.localNotifications.update(
        {
          id: 1,
          title: 'Back-up',
          text: `loaded ${index + 1} of ${this.selectedItems.length} Application`,
          progressBar: { value: val },
        }
      )
      if (index == this.selectedItems.length - 1) {
        this.storage.set('backupData', JSON.stringify(backupJSON));
        return backupJSON;
      }
      index++;
    }
  }

  getData() {
    this.sqlite.getCustomerRecByREF(1, 'A').then(data =>{
      console.log(data);
    })
  }


}


