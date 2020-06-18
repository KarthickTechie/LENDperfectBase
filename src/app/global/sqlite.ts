import { ErrorHandlingService } from './../error-handling.service';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Subject } from 'rxjs';
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
        public errorLogService: ErrorHandlingService
    ) {

        //this.databaseReady = new BehaviorSubject(false);
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


    // createtable(tablename, tableId, columnName, columnType) {
    //     console.log(this.database);
    //     return this.database.executeSql('CREATE TABLE IF NOT EXISTS ' + tablename + '(' + tableId + ' INTEGER PRIMARY KEY AUTOINCREMENT)', [])
    //         .then(res => {
    //             this.alterQuery(tablename, columnName, columnType)
    //             console.log('Executed SQL')
    //         })
    //         .catch(e => console.log(e));
    // }

    createtable(tablename, tableId, columnName, columnType) {
        console.log(this.database);
        if (tablename == "loginDetails") {
            return this.database.executeSql('CREATE TABLE IF NOT EXISTS ' + tablename + '(' + tableId + ' INTEGER PRIMARY KEY AUTOINCREMENT,userName VARCHAR(30), UNIQUE(userName) ON CONFLICT REPLACE)', [])
                .then(res => {
                    this.alterQuery(tablename, columnName, columnType)
                    console.log('Executed SQL')
                })
                .catch(e => console.log(e));
        } else {

            return this.database.executeSql('CREATE TABLE IF NOT EXISTS ' + tablename + '(' + tableId + ' INTEGER PRIMARY KEY AUTOINCREMENT)', [])
                .then(res => {
                    this.alterQuery(tablename, columnName, columnType)
                    console.log('Executed SQL')
                })
                .catch(e => console.log(e));
        }
    }
    alterQuery(tablename, columnName, columnType) {
        for (let i = 0; i < columnName.length; i++) {
            this.database.executeSql('SELECT ' + columnName[i] + ' FROM  ' + tablename + '', []).then(data => {
                return data;
            }, err => {
                console.log(err, "alter");
                console.log(err.message, "alter");
                console.log(err.message.substring(err.message.lastIndexOf(":") + 2), "laptop");

                if (err.code == 5) {
                    this.database.executeSql('ALTER TABLE ' + tablename + ' ADD COLUMN ' + columnName[i] + ' ' + columnType[i], []);
                    // if(err.message.substring(err.message.lastIndexOf(":")+2) == "userName"){
                    //     console.log("unique");
                    //     this.database.executeSql('ALTER TABLE ' + tablename + 'MODIFY userName INT NOT NULL UNIQUE', []);
                    // }
                    // }else{

                    // }
                }
                return err;
            });
        }
    }


    addRootDetails(createddate, deviceid, createduser) {
        let data = [createddate, deviceid, createduser]
        return this.database.executeSql("INSERT INTO applicationDetails(createdDate, deviceId, createdUser) VALUES (?,?,?)", data).then(data => {
            console.log(data, "inside sqlite")
            return data;
        }, error => {
            this.errorLogService.errorLog(new Error(JSON.stringify(error)));
            return error;

        });
    }


    insertLoginDetails(userName, password, loginDate) {
        let data = [userName, password, loginDate]
        return this.database.executeSql("INSERT INTO loginDetails(userName, password,loginDate) VALUES (?,?,?)", data).then(data => {
            console.log(data, "inside sqlite")
            return data;
        }, err => {
            this.errorLogService.errorLog(new Error(JSON.stringify(err)));
            return err;
        });
    }

    insertDetails(tableName, value, applicantType, refId, id?) {
        let keyString = Object.keys(value).join(',');
        let valArray: any[] = Object.values(value);
        let questionMark = [];
        for (let val in valArray) {
            questionMark.push("?");
        }
        valArray.push(applicantType);
        if (id) {
            valArray.unshift(refId, id);
            return this.database.executeSql('INSERT INTO' + ' ' + tableName + '(refid,id,' + keyString + ', applicantType) VALUES (' + questionMark.toString().concat(",?,?,?") + ')', valArray).then(data => {
                console.log(data, "inside insert sqlite")
                return data;
            }, err => {
                this.errorLogService.errorLog(new Error(JSON.stringify(err)));
                return err;
            })
        } else {
            valArray.unshift(refId);
            return this.database.executeSql('INSERT INTO' + ' ' + tableName + '(refid,' + keyString + ', applicantType) VALUES (' + questionMark.toString().concat(",?,?") + ')', valArray).then(data => {
                console.log(data, "inside insert sqlite")
                return data;
            }, err => {
                this.errorLogService.errorLog(new Error(JSON.stringify(err)));
                return err;
            })
        }
    }


    updateDetails(tableName, value, refId, id) {
        let keyString = Object.keys(value).join('=?,');
        let valArray: any[] = Object.values(value);
        valArray.push(refId, id);
        return this.database.executeSql('UPDATE ' + tableName + ' SET ' + keyString.concat('=?') + ' WHERE refid=? and id=?', valArray).then(data => {
            return data;
        }, err => {
            this.errorLogService.errorLog(new Error(JSON.stringify(err)));
            return err;
        })
    }


    getDetails(tableName, refId, id): Promise<any> {
        return this.database.executeSql('SELECT * FROM ' + tableName + ' WHERE refid=? and id=?', [refId, id]).then(data => {
            return this.getAll(data);
        }, err => {
            this.errorLogService.errorLog(new Error(JSON.stringify(err)));
            return err;
        })
    }

    getAllApplicants(): Promise<any> {
        return this.database.executeSql('SELECT * FROM applicationDetails a LEFT OUTER JOIN personalDetails b ON b.refId = a.id LEFT OUTER JOIN loanDetails c ON c.refId = b.refId WHERE b.applicantType="A" and c.applicantType="A" and a.createdUser=?', [localStorage.getItem('username')]).then(data => {
            return this.getAll(data);
        }, err => {
            this.errorLogService.errorLog(new Error(JSON.stringify(err)));
            return err;
        })
    }


    getAllCoapplicants(refId, applicantType): Promise<any> {
        return this.database.executeSql('SELECT * FROM personalDetails a WHERE a.refId=? and a.applicantType=?', [refId, applicantType]).then(data => {
            return this.getAll(data);
        }, err => {
            this.errorLogService.errorLog(new Error(JSON.stringify(err)));
            return err;
        })
    }

    getAllGurantors(refId, applicantType): Promise<any> {
        return this.database.executeSql('SELECT * FROM personalDetails a WHERE a.refId=? and a.applicantType=?', [refId, applicantType]).then(data => {
            return this.getAll(data);
        }, err => {
            this.errorLogService.errorLog(new Error(JSON.stringify(err)));
            return err;
        })
    }

    documentInsertion(value, applicantType, refId, id) {
        let data = [value.otherDocumentType, value.otherDescription, applicantType, refId, id];
        return this.database.executeSql("INSERT INTO documentDetails(otherDocumentType,otherDescription,applicantType,refId,id) VALUES (?,?,?,?,?)", data).then(data => {
            return this.getAll(data);
        }, err => {
            this.errorLogService.errorLog(new Error(JSON.stringify(err)));
            return err;
        })
    }

    documentImageInsertion(image, applicantType, refId, id) {
        let data;
        console.log(image, "inside insertion");

        if (image.otherDocumentType == "Video") {
            console.log(image, "inisde if");
            data = [image.imgs[0].webview, image.imgs[0].webview, image.imgs[0].name, image.otherDocumentType, image.otherDescription, applicantType, refId, id];
        } else {
            console.log(image, "inisde else");

            data = [image.imagepath, image.imageNativePath, image.name, image.docType, image.docDescription, applicantType, refId, id];
        }
        return this.database.executeSql("INSERT INTO documentImageDetails(imagePath,imageNativePath,name,otherDocumentType,otherDescription,applicantType,refId,id) VALUES (?,?,?,?,?,?,?,?)", data).then(data => {
            return this.getAll(data);
        }, err => {
            this.errorLogService.errorLog(new Error(JSON.stringify(err)));
            return err;
        })
    }

    documentImageDelete(docType, applicantType, refId, id, childIndex?) {
        if (childIndex) {
            let data = [docType, applicantType, refId, id];
            return this.database.executeSql("DELETE FROM documentImageDetails WHERE otherDocumentType=? and applicantType=? and refId=? and id=?", data).then(data => {
                return data;
            }, err => {
                this.errorLogService.errorLog(new Error(JSON.stringify(err)));
                return err;
            })
        } else {
            let data = [docType, applicantType, refId, id];
            return this.database.executeSql("DELETE FROM documentImageDetails WHERE otherDocumentType=? and applicantType=? and refId=? and id=?", data).then(data => {
                return data;
            }, err => {
                this.errorLogService.errorLog(new Error(JSON.stringify(err)));
                return err;
            })
        }
    }

    getDocuments(refId, id, applicantType): Promise<any> {
        return this.database.executeSql('SELECT * FROM documentImageDetails WHERE refId=? and id=? and applicantType=?', [refId, id, applicantType]).then(data => {
            let details = [];
            let images = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    details.push({
                        otherDocumentType: data.rows.item(i).otherDocumentType,
                        otherDescription: data.rows.item(i).otherDescription,
                        imgs: [data.rows.item(i).imagePath.split(",").map(webview => ({ webview }))][0],
                        refId: data.rows.item(i).refId,
                        id: data.rows.item(i).id,
                        applicantType: data.rows.item(i).applicantType,
                    });
                }
            }
            return details;
        }, err => {
            this.errorLogService.errorLog(new Error(JSON.stringify(err)));
            return err;
        })
    }


    getImageResponse(refId, id, applicantType): Promise<any> {
        return this.database.executeSql('SELECT * FROM documentImageDetails WHERE refId=? and id=? and applicantType=?', [refId, id, applicantType]).then(data => {
            let details = [];
            let images = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    for (var j = 0; j < data.rows.item(i).imagePath.split(",").length; j++) {
                        details.push({
                            webview: data.rows.item(i).imagePath.split(",")[j],
                            native: data.rows.item(i).imageNativePath.split(",")[j],
                            name: data.rows.item(i).name,
                            docType: data.rows.item(i).otherDocumentType,
                            docDescription: data.rows.item(i).otherDescription,
                        });
                    }
                }
            }
            return details;
        }, err => {
            this.errorLogService.errorLog(new Error(JSON.stringify(err)));
            return err;
        })
    }


    getAllDetails(refId, applicantType, count?) {
        let data = [refId, applicantType, localStorage.getItem('username')];
        if (applicantType == "A") {
            return this.database.executeSql('SELECT * FROM applicationDetails a LEFT OUTER JOIN personalDetails b ON b.refId = a.id LEFT OUTER JOIN loanDetails c ON c.refId = b.refId LEFT OUTER JOIN incomeDetails d ON d.refId = c.refId LEFT OUTER JOIN kycDetails e ON e.refId = d.refId WHERE b.refId=? and b.applicantType=? and c.applicantType="A" and d.applicantType="A" and e.applicantType="A" and a.createdUser=?', data).then(data => {
                var output = [];
                for (var i = 0; i < data.rows.length; i++) {
                    output.push(data.rows.item(i));
                    if (i == data.rows.length - 1) {
                        output[0].enable = false;
                    }
                }
                return output;
            }, err => {
                this.errorLogService.errorLog(new Error(JSON.stringify(err)));
                return err;
            })
        } else if (applicantType == "C") {
            //return this.database.executeSql('SELECT * FROM applicationDetails a LEFT OUTER JOIN personalDetails b ON b.refId = a.id LEFT OUTER JOIN incomeDetails d ON d.refId = b.refId LEFT OUTER JOIN kycDetails e ON e.refId = d.refId WHERE b.refId=? and b.applicantType=? and d.applicantType="C" and e.applicantType="C"',data).then(data => {
            return this.database.executeSql('SELECT * FROM applicationDetails a INNER JOIN personalDetails b ON b.refId = a.id  INNER JOIN incomeDetails d ON d.applicantType = b.applicantType  INNER JOIN kycDetails e ON e.applicantType = d.applicantType WHERE b.refId=? and b.applicantType="C" and a.createdUser=? limit ?', [refId, localStorage.getItem('username'), count]).then(data => {
                var output = [];
                for (var i = 0; i < data.rows.length; i++) {
                    output.push(data.rows.item(i));
                    output[i].enable = false;
                }
                return output;
            }, err => {
                this.errorLogService.errorLog(new Error(JSON.stringify(err)));
                return err;
            })
        } else {
            return this.database.executeSql('SELECT * FROM applicationDetails a INNER JOIN personalDetails b ON b.refId = a.id  INNER JOIN incomeDetails d ON d.applicantType = b.applicantType  INNER JOIN kycDetails e ON e.applicantType = d.applicantType WHERE b.refId=? and b.applicantType="G" and a.createdUser=? limit ?', [refId, localStorage.getItem('username'), count]).then(data => {
                var output = [];
                for (var i = 0; i < data.rows.length; i++) {
                    output.push(data.rows.item(i));
                    output[i].enable = false;
                }
                return output;
            }, err => {
                this.errorLogService.errorLog(new Error(JSON.stringify(err)));
                return err;
            })
        }
    }


    getAllDocuments(refId) {
        return this.database.executeSql('SELECT * FROM documentImageDetails WHERE refId=?', [refId]).then(data => {
            return this.getAll(data);
        }, err => {
            this.errorLogService.errorLog(new Error(JSON.stringify(err)));
            return err;
        })
    }

    getAllProfilePic(refId) {
        return this.database.executeSql('SELECT profileImage FROM personalDetails WHERE refId=?', [refId]).then(data => {
            return this.getAll(data);
        }, err => {
            this.errorLogService.errorLog(new Error(JSON.stringify(err)));
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