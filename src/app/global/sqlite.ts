import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: "root"
})
export class SqliteProvider {
    database: SQLiteObject;
    // private databaseReady: BehaviorSubject<boolean>;
    // private name: string;
    DB_NAME: string = 'baseProduct.db';
    constructor(
        public platform: Platform,
        public sqlite: SQLite,
    ) {
        console.log('sqlite constructor');

        //this.databaseReady = new BehaviorSubject(false);
        console.log('Hello SqlliteProvider Provider');
        this.platform.ready().then(() => {
            console.log('inside platform ready');
            this.sqlite
                .create({
                    name: this.DB_NAME,
                    location: 'default'
                })
                .then((db: SQLiteObject) => {
                    console.log(db, 'db val');
                    this.database = db;
                    //   this.loadInit();
                    console.log(this.database, "db Created ");
                    //this.databaseReady.next(true);
                })
                .catch(error => { });
        });
    }



    createtable(tablename, tableId, columnName, columnType) {
        console.log(this.database);
        return this.database.executeSql('CREATE TABLE IF NOT EXISTS ' + tablename + '(refid TEXT, ' + tableId + ' INTEGER PRIMARY KEY AUTOINCREMENT)', [])
            .then(res => {
                this.alterQuery(tablename, columnName, columnType)
                console.log('Executed SQL')
            })
            .catch(e => console.log(e));
    }


    alterQuery(tablename, columnName, columnType) {
        for (let i = 0; i < columnName.length; i++) {
            this.database.executeSql('SELECT ' + columnName[i] + ' FROM  ' + tablename + '', []).then(data => {
                return data;
            }, err => {
                if (err.code == 5) {
                    this.database.executeSql('ALTER TABLE ' + tablename + ' ADD COLUMN ' + columnName[i] + ' ' + columnType[i], []);
                }
                return err;
            });
        }
    }

    insertQuery(tablename, data, refid) {
        let keyString = Object.keys(data).join(',');
        let valueString = Object.values(data).join(',');
        let valArray: any[] = Object.values(data);
        valArray.unshift(refid);
        let tableNameArray = [tablename];
        console.log(data, 'values');
        console.log(keyString, 'keystring');
        console.log(valueString, 'valstring');
        return this.database.executeSql('INSERT INTO ' + tablename + '(refid, ' + keyString + ') VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', valArray).then(res => {
            console.log(res, "succesfully inserted");
        })
    }
}