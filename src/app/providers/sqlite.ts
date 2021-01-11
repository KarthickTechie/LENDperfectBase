// import { ErrorHandlingService } from './../error-handling.service';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Subject } from 'rxjs';
import * as moment from 'moment';
import { Device } from '@ionic-native/device/ngx'


@Injectable({
    providedIn: "root"
})
export class SqliteProvider {
    database: SQLiteObject;
    databaseReady = new Subject<any>();
    DB_NAME: string = 'boi.db';
    constructor(
        public platform: Platform,
        public sqlite: SQLite,
        public device: Device,
        // public errorLogService: ErrorHandlingService
    ) {
        this.platform.ready().then(() => {
            this.sqlite
                .create({
                    name: this.DB_NAME,
                    location: 'default'
                })
                .then((db: SQLiteObject) => {
                    this.database = db;
                    this.databaseReady.next('true');
                })
                .catch(error => { });
        });
    }


    createtable(tablename, tableId, columnName, columnType) {
        if (tablename == "loginDetails") {
            return this.database.executeSql('CREATE TABLE IF NOT EXISTS ' + tablename + '(' + tableId + ' INTEGER PRIMARY KEY AUTOINCREMENT,userName VARCHAR(30), UNIQUE(userName) ON CONFLICT REPLACE)', [])
                .then(res => {
                    this.alterQuery(tablename, columnName, columnType)
                })
                .catch(e => console.log(e));
        } else {
            return this.database.executeSql('CREATE TABLE IF NOT EXISTS ' + tablename + '(' + tableId + ' INTEGER PRIMARY KEY AUTOINCREMENT)', [])
                .then(res => {
                    this.alterQuery(tablename, columnName, columnType)
                })
                .catch(e => console.log(e));
        }
    }


    createAduitTable(){
       return this.database.executeSql('CREATE TABLE IF NOT EXISTS AUDIT_LOG(auditid INTEGER PRIMARY KEY AUTOINCREMENT,deviceID TEXT,username TEXT,Timestamp TEXT,auditDate DATE DEFAULT CURRENT_DATE,service TEXT,action TEXT,value BLOB)');
    }

    


    alterQuery(tablename, columnName, columnType) {
        for (let i = 0; i < columnName.length; i++) {
            this.database.executeSql('SELECT ' + columnName[i] + ' FROM  ' + tablename + '', []).then(data => {
                return data;
            }, err => {
                if (err.code == 5) {
                    if(tablename == 'AUDIT_LOG' && columnName[i] == 'auditDate'){
                        this.database.executeSql('ALTER TABLE ' + tablename + ' ADD COLUMN ' + columnName[i] + ' ' + 'DATE DEFAULT CURRENT_DATE', []);
                    }else{
                        this.database.executeSql('ALTER TABLE ' + tablename + ' ADD COLUMN ' + columnName[i] + ' ' + columnType[i], []);
                    }
                }
                return err;
            });
        }
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

    addAuditTrail(Timestamp, service, action, value) {
        let data = [localStorage.getItem('username'), this.device.serial, Timestamp, service, action, value];
        return this.database.executeSql("INSERT INTO AUDIT_LOG(username,deviceID,Timestamp,service,action,value) VALUES (?,?,?,?,?,?)", data).then((data) => {
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
        console.log(output, "geeeeeeeeeeee")
        return output;
    }


}
