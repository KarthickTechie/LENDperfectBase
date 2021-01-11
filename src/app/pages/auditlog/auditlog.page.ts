import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms/forms";
import * as moment from 'moment';
import { FormcontrolService } from "src/app/providers/formcontrol.service";
import { GlobalService } from "src/app/providers/global.service";
import { SqliteProvider } from "src/app/providers/sqlite";
import { AppVersion } from '@ionic-native/app-version/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-auditlog',
  templateUrl: './auditlog.page.html',
  styleUrls: ['./auditlog.page.scss'],
})
export class AuditlogPage implements OnInit {

  startmindate: any;
  startmaxdate: any;
  endmindate: any;
  endmaxdate: any;
  auditLog: FormGroup;
  auditLogData = [];
  versionDetails: string;
  today: any = new Date();
  logFileName: string;
  ErrCounter: number;
  fileTransfer: FileTransferObject = this.transfer.create();

  constructor(
    public alertController: AlertController,
    private transfer: FileTransfer, public file: File, public formctrl: FormcontrolService, public global: GlobalService, public sqlite: SqliteProvider, public appVersion: AppVersion) {
    this.logFileName = "Boi_Audit_Logs_" + this.global.basicDec(localStorage.getItem('username')) + ".txt";
    this.auditLog = this.formctrl.getauditlogform();

    this.appVersion.getVersionNumber().then(version => {
      this.versionDetails = version;
      console.log(version,"version");
    })

    this.callmaxdate();
  }

  ngOnInit() {
  }

  callmaxdate() {
    let dd = this.today.getDate();
    let mm = this.today.getMonth() + 1; //January is 0!
    let yyyy = this.today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    let maxdate = yyyy + '-' + mm + '-' + dd;
    this.startmaxdate = maxdate;
    this.startmindate = moment().subtract(30, 'days').format("YYYY-MM-DD");
  }

  auditgen(value) {
    this.global.globalLodingPresent("Please wait...");
    // if (this.global.getNetworkStatus() != 'none') {
    this.sqlite.getAuditTrailbydate(value).then(data => {
      if (data.length > 0) {
        this.auditLogData = data;
        this.createlogfile();
      }
      else {
        this.global.globalLodingDismiss();
        this.global.presentAlert("Alert", "No Logs found within this Dates");
      }
    }).catch(Error => {
      this.global.globalLodingDismiss();
      console.log("Failed!");
    });
    // }
    // else {
    // this.global.globalLodingDismiss();
    // this.global.presentAlert("Alert", "Please Enable internet connection.");
    // }
  }



  createlogfile() {
    this.file.checkFile(this.file.externalApplicationStorageDirectory + "AUDITLOGS/", this.logFileName)
      .then(() => {
        this.file.removeFile(this.file.externalApplicationStorageDirectory + "AUDITLOGS/", this.logFileName)
          .then(() => {
            this.createlogfile();
          }).catch((err) => {
            this.global.globalLodingDismiss();
          });
      }).catch((err) => {
        this.file.createFile(this.file.externalApplicationStorageDirectory + "AUDITLOGS", this.logFileName, true)
          .then(() => {
            this.generateLogs(0);
          }).catch((err) => {
            this.global.globalLodingDismiss();
          });
      });
  }


  generateLogs(ilen) {
    let logs = "";
    if (ilen == 0) {
      logs = "App version Data:" + this.versionDetails + new Date() + ",deviceID:" + this.auditLogData[ilen].deviceID + ",Username:" + this.auditLogData[ilen].username + ",Timestamp:" + this.auditLogData[ilen].Timestamp + ",Service:" + this.auditLogData[ilen].service + ",Action:" + this.auditLogData[ilen].action + ",Value:" + this.auditLogData[ilen].value + ".\r\n\r\n";
    }
    else {
      logs = "deviceID:" + this.auditLogData[ilen].deviceID + ",Username:" + this.auditLogData[ilen].username + ",Timestamp:" + this.auditLogData[ilen].Timestamp + ",Service:" + this.auditLogData[ilen].service + ",Action:" + this.auditLogData[ilen].action + ",Value:" + this.auditLogData[ilen].value + ".\r\n\r\n";
    }
    this.file.writeFile(this.file.externalApplicationStorageDirectory + "AUDITLOGS/", this.logFileName, logs, { replace: false, append: true }).then(async data => {
      if (ilen != this.auditLogData.length - 1) {
        ilen = ilen + 1;
        this.generateLogs(ilen);
      }
      else {
        this.global.globalLodingDismiss();
        const alert = await this.alertController.create({
          header: 'Please Select Audit Log Location to write',
          inputs: [
            {
              name: 'Local Device',
              type: 'radio',
              value: 0,
            },
            {
              name: 'Server',
              type: 'radio',
              value: 1,
            }
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                // this.global.globalLodingDismiss();
              }
            }, {
              text: 'Ok',
              handler: () => {
                if (data == '0') {
                  // this.global.globalLodingDismiss();
                  this.global.globalTosat(`Log Created Successfully in Location ${this.file.externalApplicationStorageDirectory + "AUDITLOGS/" + this.logFileName}`);
                } else {
                  this.ErrCounter = 0;
                  this.callzipupload();
                }
              }
            }
          ]
        });

        await alert.present();

      }
    });

  }

  callzipupload() {
    let URL = "http://192.168.0.43:9005/laps/rest/LosDocumentServices/uploadLogFile";
    let logPath = this.file.externalApplicationStorageDirectory + "AUDITLOGS/" + this.logFileName;
    let options: FileUploadOptions = {
      fileKey: "attachment",
      fileName: this.logFileName,
      httpMethod: "POST",
      mimeType: "multipart/form-data",
      chunkedMode: false,
      params: { 'fileName': this.logFileName },
      headers: { Connection: "close" },
    }
    this.fileTransfer.upload(logPath, URL, options).then((data) => {
      // console.log("doc Upload==>" + data);
      if (data.responseCode == 200) {
        this.removelogFile();
        this.global.globalLodingDismiss();
        this.global.presentAlert("Success", "Audit Logs Sent Successfully.");
      } else {
        this.global.globalLodingDismiss();
        this.global.presentAlert("Alert", `Request could not be processed due to a server error. The request may succeed if you try again.`);
      }
      // success
    }, (err) => {
      this.global.globalLodingDismiss();
      this.ErrCounter = this.ErrCounter + 1;
      if (this.ErrCounter <= 3) {
        this.global.globalLodingPresent('Retrying the document to Upload..Please wait a while');
        this.global.globalTosat(`${this.ErrCounter}) Retrying the document to Upload..Please wait a while`);
        this.callzipupload();
      } else {
        this.global.presentAlert("Alert", `Request could not be processed due to a server error. The request may succeed if you try again.`);
        this.removelogFile();
      }
    })
  }

  removelogFile() {
    this.file.removeFile(this.file.externalApplicationStorageDirectory + "AUDITLOGS/", this.logFileName).then(data => {

    }).catch(Error => {
      console.log("Failed!");
    });
  }



  calcendDate() {
    this.endmindate = this.auditLog.controls.startDate.value;
    let check = moment(this.startmaxdate).diff(this.endmindate, 'days');
    if (check >= 7) {
      this.endmaxdate = moment(this.endmindate).add(7, 'days').format("YYYY-MM-DD");
    } else {
      this.endmaxdate = this.startmaxdate;
    }
    this.auditLog.get("endDate").setValue("");
    this.auditLog.get("endDate").updateValueAndValidity();
  }

}
