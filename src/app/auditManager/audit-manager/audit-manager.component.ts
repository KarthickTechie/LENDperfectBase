import { GlobalService } from './../../global/global.service';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { AuditLogService } from '../../AuditLogger/audit-log.service';
import { FormBuilder, FormControl, FormGroup, Validators, Form } from '@angular/forms';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';


@Component({
  selector: 'app-audit-manager',
  templateUrl: './audit-manager.component.html',
  styleUrls: ['./audit-manager.component.scss'],
})
export class AuditManagerComponent implements OnInit {
  @Input() URL: string = "";
  logFileName: string;
  ErrCounter: number;
  versionDetails: string;
  auditLogData = [];
  today: any = new Date();
  startmaxdate: any;
  startmindate: any;
  endmaxdate: any;
  endmindate: any;
  auditLog: FormGroup;
  fileTransfer: FileTransferObject = this.transfer.create();
  constructor(public auditLoger: AuditLogService, public formBuilder: FormBuilder, public file: File, private appVersion: AppVersion, private transfer: FileTransfer, public global: GlobalService) {
    this.logFileName = "Audit_Logs_" + localStorage.getItem('username') + ".txt";
    this.appVersion.getVersionNumber().then(version => {
      this.versionDetails = version;
    })
    this.auditLog = this.formBuilder.group({
      startDate: ['', Validators.compose([Validators.required])],
      endDate: ['', Validators.compose([Validators.required])]
    });
    this.callmaxdate();
    this.checkLogFolder();
  }
  checkLogFolder() {
    this.file.checkDir(this.file.externalApplicationStorageDirectory, 'AUDITLOGS').then(result => {
    }).catch(error => {
      this.file.createDir(this.file.externalApplicationStorageDirectory, 'AUDITLOGS', false).then(res => {
      }, error => alert('Error While Creating Directory AUDITLOGS Directory'))
    })
  }

  ngOnInit() { }


  auditgen(value) {
    if (this.URL != null && this.URL != "" && this.URL != undefined) {
      this.auditLoger.globalLodingPresent("Please wait...");
      if (this.auditLoger.getNetworkStatus() != 'none') {
        this.auditLoger.getAuditTrailbydate(value).then(data => {
          if (data.length > 0) {
            this.auditLogData = data;
            this.createlogfile();
          }
          else {
            this.auditLoger.globalLodingDismiss();
            this.global.presentAlert("Alert", "No Logs found within this Dates");
          }
        }).catch(Error => {
          this.auditLoger.globalLodingDismiss();
          console.log("Failed!");
        });
      }
      else {
        this.auditLoger.globalLodingDismiss();
        this.global.presentAlert("Alert", "Please Enable internet connection.");
      }
    } else {
      this.global.presentAlert("Alert", "Valid URL Required in component input <app-audit-manager [URL]='uploadURL'></app-audit-manager>.")
    }
  }

  createlogfile() {
    this.file.checkFile(this.file.externalApplicationStorageDirectory + "AUDITLOGS/", this.logFileName)
      .then(() => {
        this.file.removeFile(this.file.externalApplicationStorageDirectory + "AUDITLOGS/", this.logFileName)
          .then(() => {
            console.log("file removed");
            this.createlogfile();
          }).catch((err) => {
            this.auditLoger.globalLodingDismiss();
            console.log("remove file:" + err);
          });
      }).catch((err) => {
        console.log("file not avaliable");
        this.file.createFile(this.file.externalApplicationStorageDirectory + "AUDITLOGS", this.logFileName, true)
          .then(() => {
            console.log("file Created.");
            this.generateLogs(0);
          }).catch((err) => {
            this.auditLoger.globalLodingDismiss();
            console.log("create file:" + err);
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
    this.file.writeFile(this.file.externalApplicationStorageDirectory + "AUDITLOGS/", this.logFileName, logs, { replace: false, append: true }).then(data => {
      if (ilen != this.auditLogData.length - 1) {
        ilen = ilen + 1;
        this.generateLogs(ilen);
      }
      else {
        this.ErrCounter = 0;
        this.callzipupload();
      }
    })

  }

  callzipupload() {
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
    this.fileTransfer.upload(logPath, this.URL, options).then((data) => {
      // console.log("doc Upload==>" + data);
      if (data.responseCode == 200) {
        this.removelogFile();
        this.auditLoger.globalLodingDismiss();
        this.global.presentAlert("Success", "Audit Logs Sent Successfully.");
      } else {
        this.auditLoger.globalLodingDismiss();
        this.global.presentAlert("Alert", `Request could not be processed due to a server error. The request may succeed if you try again.`);
      }
      // success
    }, (err) => {
      this.auditLoger.globalLodingDismiss();
      this.ErrCounter = this.ErrCounter + 1;
      if (this.ErrCounter <= 3) {
        this.auditLoger.globalLodingPresent('Retrying the document to Upload..Please wait a while');
        this.auditLoger.globalTosat(`${this.ErrCounter}) Retrying the document to Upload..Please wait a while`);
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
    this.startmaxdate = maxdate
    this.startmindate = moment().subtract(30, 'days').format("YYYY-MM-DD");
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
