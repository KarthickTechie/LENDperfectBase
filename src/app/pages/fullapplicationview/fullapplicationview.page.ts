import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fullapplicationview',
  templateUrl: './fullapplicationview.page.html',
  styleUrls: ['./fullapplicationview.page.scss'],
})
export class FullapplicationviewPage implements OnInit {
  viewApplication = 'A';
  appItems: any;
  appProfile: any;
  totalImageCount: number = 2;

  otherDoc: any;
  profilePic: any;
  constructor() { 
    this.appProfile = "assets/imgs/round_headshot.png";
    this.otherDoc = [{ "imagePath": "assets/imgs/round_headshot.png", "refId": 4, "id": 4, "applicantType": "A" }];
    this.profilePic = [{ "profileImage": "assets/imgs/round_headshot.png", "refId": 4, "id": 4, "applicantType": "A" }];

    // this.appItems = [{ "interestType": "fixed", "id": 4, "createdDate": "Tue Sep 29 2020 12:25:46 GMT+0530 (India Standard Time)", "deviceId": "20d59522fc27d895", "createdUser": "vv", "referenceNumber": null, "submitStatus": "N", "submitDate": null, "backup": "N", "sync": "N", "tempAppNo": "1601362630551", "refId": 4, "title": "01", "firstName": "Karthick", "lastName": "Kumar", "gender": "M", "mobileNumber": 9945123214, "email": "karthick@sysarcinfomatix.com", "dob": "1993-12-22", "residentialStatus": "indian", "panNo": "SABOD0987S", "aadharNo": 445212369874, "addressType": "present", "presentAddress1": "No.45,", "presentAddress2": "L.B Road,Adyar", "presentDistrict": "001", "presentCity": "001", "presentState": "01", "presentPincode": 600020, "samePermanentAdd": "false", "permanentAddress1": "No.30,", "permanentAddress2": "GH road,Guindy", "permanentDistrict": "001", "permanentCity": "001", "permanentState": "01", "permanentPincode": 600038, "applicantType": "A", "profileImage": "assets/imgs/round_headshot.png", "loanId": 2, "loanProduct": "01", "amountRequested": 300000, "tenure": "48", "roi": "12", "EMI": "5800", "preferredBranch": "01", "incomeId": 2, "empCategoryType": "salaried", "empName": "Kumar", "doj": "2020-03-06", "grossIncome": 8000, "takeIncome": 16500, "otherEmi": 4000, "netIncome": 20000, "natureBusiness": "Self", "yearOfEsta": "2020-03-06", "businessIncome": 5000, "otherIncome": 3000, "otherObi": 2000, "deduction": 1400, "totalNetIncome": 34000, "itrReturn": 2500, "kycId": 2, "proofType": "01", "proofDocument": "02", "proofvalue": "676767979494", "enable": false }]
    this.appItems = [{ "interestType": "fixed", "title": "MR", "createdDate": "Tue Sep 29 2020 12:25:46 GMT+0530 (India Standard Time)", "createdUser": "vv", "submitStatus": "N", "firstName": "Karthick", "lastName": "Kumar", "mobileNumber": 9945123214, "email": "karthick@sysarcinfomatix.com", "dob": "1993-12-22", "panNo": "SABOD0987S", "aadharNo": 445212369874, "presentAddress1": "No.45,", "presentAddress2": "L.B Road,Adyar", "presentPincode": 600020, "permanentAddress1": "No.30,", "permanentAddress2": "GH road,Guindy", "permanentPincode": 600038, "amountRequested": 300000, "tenure": "48", "roi": "12", "EMI": "5800", "doj": "2020-03-06", "grossIncome": 8000, "takeIncome": 16500, "otherEmi": 4000, "netIncome": 20000, "natureBusiness": "Self", "yearOfEsta": "2020-03-06", "businessIncome": 5000, "otherIncome": 3000, "otherObi": 2000, "deduction": 1400, "totalNetIncome": 34000, "itrReturn": 2500, "proofvalue": "676767979494", "enable": false, "gender": "Male", "loanProduct": "Personal Loan", "empCategoryType": "Salaried", "residentialStatus": "Indian", "presentDistrict": "Chennai", "presentCity": "Chennai", "presentState": "TamilNadu", "permanentDistrict": "Chennai", "permanentCity": "Chennai", "permanentState": "TamilNadu", "preferredBranch": "Mumbai", "proofType": "Id Proof", "proofDocument": "Aadhar Card" }]
  }

  ngOnInit() {
  }


  segmentChanged(event) {
    this.viewApplication = event.target.value;
  }

}
