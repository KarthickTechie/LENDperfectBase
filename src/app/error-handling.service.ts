import { Platform } from '@ionic/angular';
import { File, DirectoryEntry, FileEntry } from '@ionic-native/file/ngx';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  entries: (DirectoryEntry | FileEntry)[];
  file = new File();
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async res => {
      this.createErrFolder();
    }).catch(err => console.log(err));
  }
  async createErrFolder() {
    try {
      const errorFolder: DirectoryEntry = await this.file.createDir(this.file.externalApplicationStorageDirectory, 'errors', false);
    } catch (error) {
      this.errorLog(new Error(JSON.stringify(error)));
    }
  }

  refErrorCheck(neededValues: string[], response: object) {
    const arr = neededValues.map((value, index) => {
      if (!response.hasOwnProperty(value)) {
        return value;
      } else {
        return;
      }
    }).filter(i => {
      if (i) {
        return true;
      } else {
        return false;
      }
    });
    return arr;
  }

  async errorLog(refErr:Error | ReferenceError | TypeError) {
    let checkfile: boolean;
    try {
      checkfile = await this.file.checkFile(this.file.externalApplicationStorageDirectory + "errors/", "errorlog.txt");

    } catch (error) {
      if (error.message === 'NOT_FOUND_ERR') {
        let createdFile: FileEntry;
        try {
          createdFile = await this.file.createFile(this.file.externalApplicationStorageDirectory + 'errors/', 'errorLog.txt', false);
        } catch (error) {
          console.log(error); // create file function error block.
        }

        createdFile.createWriter(fileWriter => {
          fileWriter.write('*****Start of the file*****');
          fileWriter.onwriteend = (evt) => {
            this.file.readAsText(this.file.externalApplicationStorageDirectory + 'errors/', 'errorLog.txt').then(val => {
            }).catch(err => console.log(err));
            this.errorLog(refErr);
          };
        },
          err => console.log(err));
      }
    }

    if (checkfile) {
      let textContent: string;
      try {
        textContent = await this.file.readAsText(this.file.externalApplicationStorageDirectory + 'errors/', 'errorLog.txt');
      } catch (error) {
        console.log(error);
      }
      let filewrite;
      try {
        filewrite = await this.file.writeExistingFile(this.file.externalApplicationStorageDirectory + 'errors/', 'errorLog.txt', `
        ${textContent}

        *****------*****
         ${Date()}
        ${refErr.stack}`);      } catch (error) {
        console.log(error);
      }
    }
  }
}



  // Example Usage
  // let valueForDB = {
  //   branchcode: (<any>serverResponse).branchcode,
  //   city: (<any>serverResponse).city,
  //   districtCode: (<any>serverResponse).districtCode,
  //   emailId: (<any>serverResponse).emailId,
  //   empId: (<any>serverResponse).empId,
  //   mobileNo: (<any>serverResponse).mobileNo,
  //   state: (<any>serverResponse).state,
  //   stateId: (<any>serverResponse).stateId,
  //   userid: (<any>serverResponse).userid,
  //   username: (<any>serverResponse).username,
  //   validuser: (<any>serverResponse).validuser,
  //   userRole: (!(<any>serverResponse).userRole) ? (<any>serverResponse).userGroup : (<any>serverResponse).userRole,
  //   addBranchlist: (<any>serverResponse).addBranchlist,
  // };

  // let properties = Object.keys(valueForDB);
  // let err = this.globalFunc.errorCheck(properties, serverResponse);
  // if (!err.length) {
  //   if (valueForDB.userRole == '10' || valueForDB.userRole == '30') {
  //     this.insertLoginDB(valueForDB);
  //   } else {
  //     this.global.globalToast(`Sorry! Unauthorized User`);
  //     this.global.globalLodingDismiss();
  //   }
  // } else {

  //   let refErr = new ReferenceError(JSON.stringify(err) + ' not found');

  //   this.globalFunc.errorLog(refErr);

  //   throw refErr;
