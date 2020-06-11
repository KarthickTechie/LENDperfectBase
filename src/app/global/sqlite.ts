import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject,Subject } from 'rxjs';
@Injectable({
    providedIn: "root"
})
export class SqliteProvider {
    database: SQLiteObject;
    databaseReady = new Subject<any>();
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
                      
                    console.log(this.database, "db Created ");
                    this.databaseReady.next('true');
                    //this.databaseReady.next(true);
                })
                .catch(error => { });
        });
    }


    createtable(tablename, tableId, columnName, columnType) {
        console.log(this.database);
        return this.database.executeSql('CREATE TABLE IF NOT EXISTS ' + tablename + '(' + tableId + ' INTEGER PRIMARY KEY AUTOINCREMENT)', [])
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

    // insertQuery(tablename, data, refid) {
    //     let keyString = Object.keys(data).join(',');
    //     let valueString = Object.values(data).join(',');
    //     let valArray: any[] = Object.values(data);
    //     valArray.unshift(refid);
    //     let tableNameArray = [tablename];
    //     console.log(data, 'values');
    //     console.log(keyString, 'keystring');
    //     console.log(valueString, 'valstring');
    //     return this.database.executeSql('INSERT INTO ' + tablename + '(refid, ' + keyString + ') VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', valArray).then(res => {
    //         console.log(res, "succesfully inserted");
    //     })
    // }


    addRootDetails(createddate, deviceid, createduser) {
        let data = [createddate, deviceid, createduser]
        //alert(JSON.stringify(data));
        return this.database.executeSql("INSERT INTO applicationDetails(createddate, deviceid, createduser) VALUES (?,?,?)", data).then(data => {
          //alert(JSON.stringify(data));
          // alert(JSON.stringify(data.insertId));
          console.log(data,"inside sqlite")
          return data;
        }, err => {
          console.log('Error: ', err);
          return err;
        });
      }


      insertLoginDetails(userName, password,organisationLevel,organisationcode,organisationName,loginDate) {
        let data = [userName, password,organisationLevel,organisationcode,organisationName,loginDate]
        //alert(JSON.stringify(data));
        return this.database.executeSql("INSERT INTO loginDetails(userName, password, organisationLevel,organisationcode,organisationName,loginDate) VALUES (?,?,?,?,?,?)", data).then(data => {
          //alert(JSON.stringify(data));
          // alert(JSON.stringify(data.insertId));
          console.log(data,"inside sqlite")
          return data;
        }, err => {
          console.log('Error: ', err);
          return err;
        });
      }
      
      
    

      insertDetails(tableName,value,applicantType,refId,id){
          let keyString = Object.keys(value).join(',');
          debugger;
          let valArray: any[] = Object.values(value);
          let questionMark = [];
          for(let val in valArray){
              questionMark.push("?");
          }

          
          valArray.push(applicantType);
          console.log(questionMark.toString().concat(",?"),"question mark");
          if(id){
            valArray.unshift(refId,id);
              return this.database.executeSql('INSERT INTO'+' '+ tableName + '(refid,id,'+ keyString +', applicantType) VALUES ('+questionMark.toString().concat(",?,?,?")+')',valArray).then(data=>{
                  console.log(data,"inside insert sqlite")
                return data;  
              },err=>{
                  console.log(err,"error inside sqlite")
              })
          }else{
            valArray.unshift(refId);
            return this.database.executeSql('INSERT INTO'+' '+ tableName + '(refid,'+ keyString +', applicantType) VALUES ('+questionMark.toString().concat(",?,?")+')',valArray).then(data=>{
                console.log(data,"inside insert sqlite")
              return data;  
            },err=>{
                console.log(err,"error inside sqlite")
            })
          }
      }


      updateDetails(tableName,value,refId,id){
        let keyString = Object.keys(value).join('=?,');
        // keyString.concat('=?');
        console.log(keyString,"update keystrings");
        let valArray: any[] = Object.values(value);
        valArray.push(refId,id);
        
return this.database.executeSql('UPDATE ' + tableName+ ' SET '+ keyString.concat('=?') + ' WHERE refid=? and id=?',valArray).then(data=>{
    return data;
},err=>{
    console.log(err,"update error");
})
      }


getDetails(tableName,refId,id):Promise<any>{
    return this.database.executeSql('SELECT * FROM ' + tableName + ' WHERE refid=? and id=?',[refId,id]).then(data=>{
        console.log(data,"get method");
        return this.getAll(data);
    },err=>{
        console.log(err,"getdetails error");
    })
}

getAllApplicants():Promise<any>{
    return this.database.executeSql('SELECT * FROM applicationDetails a LEFT OUTER JOIN personalDetails b ON b.refId = a.id LEFT OUTER JOIN loanDetails c ON c.refId = b.refId WHERE b.applicantType="A"',[]).then(data => {
        return this.getAll(data);
    },err=>{
        console.log(err,"error in getAllapplicants");
    })
}


getAllCoapplicants(refId,applicantType):Promise<any>{
    debugger;
    return this.database.executeSql('SELECT * FROM personalDetails a WHERE a.refId=? and a.applicantType=?',[refId,applicantType]).then(data => {
        return this.getAll(data);
    },err=>{
        console.log(err,"error in getAllapplicants");
    })
}

getAllGurantors(refId,applicantType):Promise<any>{
    debugger;
    return this.database.executeSql('SELECT * FROM personalDetails a WHERE a.refId=? and a.applicantType=?',[refId,applicantType]).then(data => {
        return this.getAll(data);
    },err=>{
        console.log(err,"error in getAllapplicants");
    })
}

getAll(result) {
    var output = [];
    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }
    console.log(output,"geeeeeeeeeeee")
    return output;
  }





//   'SELECT * FROM applicationDetails a LEFT OUTER JOIN personalDetails b ON b.refId = a.id LEFT OUTER JOIN loanDetails c ON c.refId = b.refId WHERE b.applicantType="A"'


}