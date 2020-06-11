import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
import { Network } from '@ionic-native/network/ngx';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuditLogService {
  database: SQLiteObject;
  isLoading = false;
  constructor(private sqlite: SQLite, public platform: Platform, public device: Device, public loadingCtrl: LoadingController, public alertController: AlertController, public toastController: ToastController, private network: Network) {
    platform.ready().then(() => {
      this.checkAndCreateDB();
    });
  }
  checkAndCreateDB() {
    this.sqlite.create({ name: 'AuditLog.db', location: 'default' }).then((db: SQLiteObject) => {
      this.database = db;
      db.executeSql('CREATE TABLE IF NOT EXISTS AUDIT_LOG(auditid INTEGER PRIMARY KEY AUTOINCREMENT, deviceID TEXT, username TEXT, Timestamp TEXT, auditDate DATE DEFAULT CURRENT_DATE, service TEXT, action TEXT, value BLOB);', []).then(() => {
        db.executeSql('CREATE TABLE IF NOT EXISTS MASTER_APP_DATA(appid INTEGER PRIMARY KEY AUTOINCREMENT, appDate DATE);', []).then(() => {
          console.log('Executed SQL');
          this.checkappData();
        }).catch(Error => {
          console.log(Error);
        });
      }).catch(Error => {
        console.log(Error);
      });
    }).catch(e => console.log(e));
  }

  addAuditTrail(service, action, value) {
    let data = [localStorage.getItem('username'), this.device.serial, moment(new Date()).format("YYYY-MM-DD HH:mm:ss"), service, action, value];
    return this.database.executeSql("INSERT INTO AUDIT_LOG(username,deviceID,Timestamp,service,action,value) VALUES (?,?,?,?,?,?)", data).then((data) => {
      return data;
    }, err => {
      console.log("err: " + err);
      return err;
    })
  }

  getAuditTrail() {
    return this.database.executeSql("SELECT * FROM  AUDIT_LOG", []).then((data) => {
      return this.getAll(data);
    }, err => {
      console.log('Error: ', err);
      return [];
    })
  }

  getAuditTrailbydate(value) {
    let data = [moment(value.startDate).format("YYYY-MM-DD"), moment(value.endDate).format("YYYY-MM-DD")];
    return this.database.executeSql("SELECT * FROM AUDIT_LOG WHERE auditDate BETWEEN ? AND ?", data).then((data) => {
      return this.getAll(data);
    }, err => {
      console.log('Error: ', err);
      return [];
    })
  }


  deleteAuditTrailbydate(fromDate, toDate) {
    let cdata = [fromDate, toDate];
    return this.database.executeSql("DELETE FROM AUDIT_LOG WHERE auditDate BETWEEN ? AND ?", cdata).then((data) => {
      return this.getAll(data);
    }, err => {
      console.log('Error: ', err);
      return [];
    })
  }

  appdatacheck() {
    return this.database.executeSql("SELECT * FROM MASTER_APP_DATA", []).then(data => {
      return this.getAll(data);
    }, err => {
      console.log('Error: ', err);
      return [];
    })
  }

  appdatainsert(appDate) {
    let data = [appDate]
    return this.database.executeSql("INSERT INTO MASTER_APP_DATA(appDate) VALUES (?)", data).then(data => {
      return data;
    }, err => {
      console.log("err: " + err);
      return err;
    })
  }

  getAll(result) {
    var output = [];
    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }
    return output;
  }

  checkappData() {
    let todayDate = moment().format("YYYY-MM-DD");
    this.appdatacheck().then(data => {
      // console.log(data);
      if (data.length > 0) {
        let appcreatedDate = data[0].appDate;
        //let appcreatedDate ="2018-01-01"
        let check = moment(appcreatedDate).diff(todayDate, 'days');
        if (check >= 31) {
          let toDate = moment().subtract(31, 'days').format("YYYY-MM-DD");
          this.deleteAuditTrailbydate(appcreatedDate, toDate).then(data => {
            // console.log("delete trail ==>" + data);
          }).catch(Error => {
            console.log("Failed!");
          });
        }
      }
      else {
        this.appdatainsert(todayDate).then(data => {
          // console.log(data);
        }).catch(Error => {
          console.log("Failed!");
        });
      }

    }).catch(Error => {
      console.log("Failed!");
    });
  }

  async globalLodingPresent(msg) {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message: 'Please wait ...',
      spinner: 'circles'
    }).then(a => {
      a.present().then(() => {
        console.log('loading presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort laoding'));
        }
      });
    }).catch(Error => {
      console.log("Failed!" + Error);
    });;
  }

  async globalLodingDismiss() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('loading dismissed'));
  }

  // async showAlert(head,msg) {
  //   const alert = await this.alertController.create({
  //     header: head,
  //     message: msg,
  //     buttons: ['OK']
  //   });

  //   await alert.present();
  // }

  async globalTosat(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  getNetworkStatus() {
    return this.network.type;
  }
}
