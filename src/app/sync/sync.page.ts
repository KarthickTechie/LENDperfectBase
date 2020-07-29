import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { BackupAndSync } from '../utility/backup-sync';
import { SqliteProvider } from '../global/sqlite';
import { GlobalService } from '../global/global.service';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.page.html',
  styleUrls: ['./sync.page.scss'],
})
export class SyncPage implements OnInit {
  listOfApplication: any[] = [];
  backUpAndSync: BackupAndSync;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private platform: Platform,
    private sqlite: SqliteProvider,
    private global: GlobalService,
  ) {
    this.backUpAndSync = new BackupAndSync(this.http, this.sqlite);
  }

  ngOnInit() {
    // this.getSyncedAppList();
  }

  ionViewDidEnter() {
    this.getSyncedAppList();
  }

  getSyncedAppList() {
    this.sqlite.getSyncedApplications().then(data => {
      this.listOfApplication = data;
    })
  }

  async mapSyncedApplication(applicantionData) {
    let coApplicantsData = applicantionData.COAPPLICANT;
    let guarantorsData = applicantionData.GUARANTOR;

    let refId = await this.insertRootData(applicantionData);

    await this.insertTable(applicantionData.APPLICANT, refId, "A");

    if (coApplicantsData.length > 0) {
      coApplicantsData.forEach(async coApp => {
        await this.insertTable(coApp, refId);
      });

    }

    if (guarantorsData.length > 0) {
      guarantorsData.forEach(async guarantor => {
        await this.insertTable(guarantor, refId);
      });
    }

  }


  async insertRootData(applicantDataData) {
    // debugger;
    let rootTableData = {
      createdDate: applicantDataData.CREATEDON,/*`${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,*/
      deviceId: this.global.getDeviceId(),
      createdUser: localStorage.getItem("username"),
      sync: 'Y',
      tempAppNo: new Date().getTime()
    }

    return (await this.sqlite.insertSyncedApplication('applicationDetails', Object.keys(rootTableData), Object.values(rootTableData))).insertId;

  }

  async insertTable(applicationData, refId, type?) {
    let id = (await this.sqlite.insertSyncedApplication('personalDetails', Object.keys(applicationData.PERSONAL_DETAILS).concat('refId'), Object.values(applicationData.PERSONAL_DETAILS).concat(refId))).insertId;
    await this.sqlite.insertSyncedApplication('incomeDetails', Object.keys(applicationData.INCOME_DETAILS).concat('refId', 'id'), Object.values(applicationData.INCOME_DETAILS).concat(refId, id));
    await this.sqlite.insertSyncedApplication('kycDetails', Object.keys(applicationData.KYC_DETAILS).concat('refId', 'id'), Object.values(applicationData.KYC_DETAILS).concat(refId, id));
   
    applicationData.DOCUMENT_DETAILS.length > 0 ?
     (applicationData.DOCUMENT_DETAILS).forEach(async documentObject => {
      await this.sqlite.insertSyncedApplication('documentDetails', Object.keys(documentObject).concat('refId', 'id'), Object.values(documentObject).concat(refId, id));
    }) : null;

    if (type == 'A') {
      await this.sqlite.insertSyncedApplication('loanDetails', Object.keys(applicationData.LOAN_DETAILS).concat('refId', 'id'), Object.values(applicationData.LOAN_DETAILS).concat(refId, id));
    }

    return;
  }

  startSyncProcess() {
    this.backUpAndSync.localNotifications.clearAll().then(_ => {
      this.backUpAndSync.localNotification({
        id: 3,
        title: 'Sync',
        text: `Application sync is in Progress..`,
      })
    })

    this.backUpAndSync.syncAPICall().subscribe(async data => {
      console.log(data);
      // let cloudData = JSON.parse(data["-MAakzSLkSMIOwujl-ok"]["reqData"]);
      let cloudData = JSON.parse(data[Object.keys(data).pop()]["reqData"]);
      let syncArray = Object.values(cloudData);

      let index = 0;

      for (let application of syncArray) {
        await this.mapSyncedApplication(syncArray[index]);

        if (index == syncArray.length - 1) {
          this.getSyncedAppList();
          this.backUpAndSync.localNotifications.update(
            {
              id: 3,
              text: `Application sync done!`,
            }
          )

          this.global.presentAlert('Sync', `${syncArray.length} Application(s) synced`)

        } else {
          this.backUpAndSync.localNotifications.update(
            {
              id: 3,
              text: `${index + 1} Application synced`,
            }
          )

          index++
        }

      }

    }, err => {
      this.backUpAndSync.localNotifications.update(
        {
          id: 3,
          text: `Application sync Failed!. Error: ${err.split(':').pop()}`,
        }
      )
    })
  }

  removeALlSync() {
    this.sqlite.removeSyncStatus()
  }


}
