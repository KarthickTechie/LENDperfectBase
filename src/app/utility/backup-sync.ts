// import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
// import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { SqliteProvider } from '../global/sqlite';
// import { ɵDomAdapter } from '@angular/platform-browser';

export class BackupAndSync {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  backupURL = "https://backupbaseprod.firebaseio.com/posts.json";
  syncURL = "https://syncbaseprod.firebaseio.com/posts.json";
  localNotifications: LocalNotifications;

  constructor(
    public http: HttpClient,
    public sqlite: SqliteProvider
  ) {
    this.localNotifications = new LocalNotifications();
    // this.backgroundMode = new BackgroundMode();

  }

  backupAPICall(backupData): Observable<any> {
    return this.http.post(this.backupURL, { reqData: backupData }, this.httpOptions).pipe(
      retry(1), catchError(this.errorHandl)
    )
  }

  syncAPICall(): Observable<any> {
    // this.backgroundMode.enable();

    return this.http.get(this.backupURL, this.httpOptions).pipe(
      retry(1), catchError(this.errorHandl)
    )
  }

  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  localNotification(option) {
    this.localNotifications.schedule(option);
  }


  async mapTableData(selectedApplication): Promise<backUpApplicationFormat> {
    // return this.getDocumentDetailsData(selectedApplication.refId, selectedApplication.id).then(data => {
    let documentDetails = await this.getDocumentDetailsData(selectedApplication.refId, selectedApplication.id);

    return {
      PERSONAL_DETAILS: {
        title: selectedApplication['title'],
        firstName: selectedApplication['firstName'],
        middleName: !!selectedApplication['middleName'] ? selectedApplication['middleName'] : "",
        lastName: selectedApplication['lastName'],
        gender: selectedApplication['gender'],
        mobileNumber: Number(selectedApplication['mobileNumber']),
        email: selectedApplication['email'],
        dob: selectedApplication['dob'],
        nationality: selectedApplication['nationality'],
        addressType: !!selectedApplication['addressType'] ? selectedApplication['addressType'] : "",
        samePermanentAdd: !!selectedApplication['samePermanentAdd'] ? selectedApplication['samePermanentAdd'] : "",
        permanentAddress: selectedApplication['permanentAddress'],
        residentialAddress: selectedApplication['residentialAddress'],
        profileImage: selectedApplication['profileImage'],
        applicantType: selectedApplication['applicantType']
      },
      INCOME_DETAILS: {
        empCategoryType: selectedApplication['empCategoryType'],
        empName: !!selectedApplication['empName'] ? selectedApplication['empName'] : "",
        doj: selectedApplication['doj'],
        incomeType: selectedApplication['incomeType'],
        grossIncome: selectedApplication['grossIncome'],
        otherDeductions: selectedApplication['otherDeductions'],
        netIncome: selectedApplication['netIncome'],
        applicantType: selectedApplication['applicantType']
      },
      KYC_DETAILS: {
        proofType: selectedApplication['proofType'],
        proofDocument: selectedApplication['proofDocument'],
        proofvalue: selectedApplication['proofvalue'],
        applicantType: selectedApplication['applicantType'],
      },
      LOAN_DETAILS: {
        amountRequested: !!selectedApplication['amountRequested'] ? selectedApplication['amountRequested'] : "",
        interestType: !!selectedApplication['interestType'] ? selectedApplication['interestType'] : "",
        tenure: !!selectedApplication['tenure'] ? selectedApplication['tenure'] : "",
        moratorium: !!selectedApplication['moratorium'] ? selectedApplication['moratorium'] : "",
        repaymentMode: !!selectedApplication['repaymentMode'] ? selectedApplication['repaymentMode'] : "",
        repaymentType: !!selectedApplication['repaymentType'] ? selectedApplication['repaymentType'] : "",
        applicantType: selectedApplication['applicantType']
      },
      DOCUMENT_DETAILS: documentDetails
    }

    // })

  }

  getDocumentDetailsData(refId, id) {
    let documentDetails: documentDetails[] = [];

    return this.sqlite.getDetails('documentDetails', refId, id).then(data => {
      data.forEach((element, index) => {
        documentDetails.push(
          // this.mapDocumentDetails(data[i])
          {
            otherDocumentType: element['otherDocumentType'],
            otherDescription: element['otherDescription'],
            applicantType: element['applicantType']
          }
        );


      });
      return documentDetails;

    })
  }

  async getMappedRecord(arrayOfData) {
    let returnData = [];
    for (let i = 0; i <= arrayOfData.length; i++) {
      if (i == arrayOfData.length) {
        return returnData;
      } else {
        returnData.push(await this.mapTableData(arrayOfData[i]));
      }

    }
  }


   backupApplicationObj(selectedApplication) {
    return this.sqlite.getCustomerRecByREF(selectedApplication.refId, "C").then( coApplicantData => {
      return this.sqlite.getCustomerRecByREF(selectedApplication.refId, "G").then(async guarantorData => {
        return {
          Temp_APPNO: selectedApplication['tempAppNo'],
          CREATEDON: selectedApplication['createdDate'],
          APPLICANT:  await this.mapTableData(selectedApplication),
          COAPPLICANT: await this.getMappedRecord(coApplicantData),
          GUARANTOR: await this.getMappedRecord(guarantorData)
        }
      })
    })

  }
}

interface backUpApplicationFormat {
  /*  Temp_APPNO: string,
   CREATEDON: string, */
  PERSONAL_DETAILS: {
    title: string,
    firstName: string,
    middleName: string,
    lastName: string,
    gender: string,
    mobileNumber: number,
    email: string,
    dob: string,
    nationality: string,
    addressType: string,
    samePermanentAdd: string,
    permanentAddress: string,
    residentialAddress: string,
    profileImage: string,
    applicantType: string
  },
  INCOME_DETAILS: {
    empCategoryType: string,
    empName: string,
    doj: string,
    incomeType: string,
    grossIncome: string,
    otherDeductions: string,
    netIncome: string,
    applicantType: string
  },
  KYC_DETAILS: {
    proofType: string,
    proofDocument: string,
    proofvalue: string,
    applicantType: string,
  },
  LOAN_DETAILS: {
    amountRequested: string,
    interestType: string,
    tenure: string,
    moratorium: string,
    repaymentMode: string,
    repaymentType: string,
    applicantType: string
  },
  DOCUMENT_DETAILS: documentDetails[]

}

interface documentDetails {
  otherDocumentType: string,
  otherDescription: string,
  applicantType: string
}
