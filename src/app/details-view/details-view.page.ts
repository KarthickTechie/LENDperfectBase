import { ActivatedRoute, Router } from '@angular/router';
import { SqliteProvider } from './../global/sqlite';
import { GlobalService } from './../global/global.service';
import { Component, OnInit } from '@angular/core';
import { MasterData } from "./../newapplicant/masterservice";


@Component({
  selector: 'app-details-view',
  templateUrl: './details-view.page.html',
  styleUrls: ['./details-view.page.scss'],
})
export class DetailsViewPage implements OnInit {
  viewApplication = 'A';
  applicantview: boolean = false;
  appItems = [];
  coAppItems = [];
  gauItems = [];
  totalImageCount: number;
  personalPicCount: number;
  profilePic = [];
  showMeter: boolean = false;
  refId: any;
  id: any;
  applicantType: any;
  existingData: any;
  appProfile: any;
  otherDoc = [];
  showApplicant: boolean = false;
  showCoApplicant: boolean = false;


  constructor(public global: GlobalService, public master: MasterData, public sqlite: SqliteProvider, public activateRoute: ActivatedRoute, public router: Router) {
    this.existingData = JSON.parse(this.activateRoute.snapshot.queryParamMap.get("applicant"));
    console.log(this.existingData, "360view");
    if (this.existingData) {
      this.refId = this.existingData.refId;
      this.id = this.existingData.id;
      this.applicantType = this.existingData.applicantType;
    }
    this.getFullDetails();




  }

  ngOnInit() {
  }

  segmentChanged(event) {
    this.viewApplication = event.target.value;
  }

  showAppDetails() {
    this.applicantview = !this.applicantview;
  }

  async getFullDetails() {

    let allDetails = await this.sqlite.getAllDetails(this.refId, "A");
    (allDetails.length != 0) ? this.appProfile = allDetails[0].profileImage : this.appProfile = "assets/imgs/round_headshot.png";
    (allDetails) ? await this.getAllData(allDetails, "A") : this.appItems = [];

    let allCoappDetails = await this.sqlite.getAllDetails(this.refId, "C");
    (allCoappDetails) ? await this.getAllData(allCoappDetails, "C") : this.coAppItems = [];

    let allGurDetails = await this.sqlite.getAllDetails(this.refId, "G");
    (allGurDetails) ? await this.getAllData(allGurDetails, "G") : this.gauItems = [];

    let allDoc = await this.sqlite.getAllDocuments(this.refId);
    console.log(allDoc, "alldoc");
    for (let doc in allDoc) {
      console.log(allDoc[doc].imagePath.split(","), "split");
      if (allDoc[doc].otherDocumentType != "Video") {
        if (allDoc[doc].otherDocumentType == "Signature") {
          this.otherDoc.push({ imagePath: allDoc[doc].imagePath, refId: allDoc[doc].refId, id: allDoc[doc].id, applicantType: allDoc[doc].applicantType });
        } else {

          for (let image in allDoc[doc].imagePath.split(",")) {
            console.log(allDoc[doc].imagePath.split(",")[image], "for");
            this.otherDoc.push({ imagePath: allDoc[doc].imagePath.split(",")[image], refId: allDoc[doc].refId, id: allDoc[doc].id, applicantType: allDoc[doc].applicantType });
          }
        }
      }

    }
    console.log(this.otherDoc, "otherdoc");

    // (allDoc) ? this.otherDoc = allDoc : this.otherDoc = [];
    let profileDoc = await this.sqlite.getAllProfilePic(this.refId);
    console.log(profileDoc, "getprofiledoc");
    (profileDoc) ? this.profilePic = profileDoc : this.profilePic = [];
    this.totalImageCount = this.profilePic.length + this.otherDoc.length;
  }

  closeView() {
    console.log("close clicked");
    this.router.navigate(['/existapp'], { skipLocationChange: true })
  }


  openSlides(value, imageData) {
    console.log(value, "image cliked");
    console.log(imageData, "imagedata");
    this.global.setRefId(imageData.refId);
    this.global.setId(imageData.id);
    this.global.setApplicantType(imageData.applicantType);

    if (value == "profile") {
      this.global.setProfileImage(imageData.profileImage);
      this.router.navigate(['/newapp'], { skipLocationChange: true,queryParams: {flow:true, loader: true } })
    } else {
      this.router.navigate(['/newapp'], { skipLocationChange: true, queryParams: {flow:true, document: true } })

    }
  }

  async getAllData(allDetails, appType) {

    for (let allnfo in allDetails) {
      const getTitle = await this.master.getTitleList().find(data => {
        return data.code == allDetails[allnfo].title;
      });

      const getGender = await (allDetails[allnfo].gender == 'M' ? 'Male' : (allDetails[allnfo].gender == 'F') ? 'Female' : 'Others');
      const getProofType = await this.master.getKycProofType().find(data => {
        return data.code == allDetails[allnfo].proofType;
      });
      const getProofDocument = await this.master.getKycproofList().find(data => {
        return data.code == allDetails[allnfo].proofDocument;
      });
      const getIncome = await this.master.getincomeTypeList().find(data => {
        return data.code == allDetails[allnfo].incomeType;
      });

      if (appType == 'A') {
        const getLoan = await this.master.getloanProductList().find(data => {
          return data.code == allDetails[allnfo].loanId;
        });
        const getRepayment = await this.master.getrepaymenttypeList().find(data => {
          return data.code == allDetails[allnfo].repaymentType;
        });
        const appData = await allDetails.map(({ title, profileImage, gender, empCategoryType, incomeType, empName, id, deviceId, sync, backup, refId, samePermanentAdd, applicantType, repaymentType, loanId, proofType, proofDocument, ...rest }) => ({ title: getTitle.OptionDesc, ...rest, gender: getGender, loanId: getLoan.Name, incomeType: getIncome.Name, repaymentType: getRepayment.Name, proofType: getProofType.Name, proofDocument: getProofDocument.Name }));
        this.appItems = appData;
      } else if (appType == 'C') {
        const appData = await allDetails.map(({ title, profileImage, gender, empCategoryType, incomeType, empName, id, deviceId, sync, backup, refId, samePermanentAdd, applicantType, repaymentType, proofType, proofDocument, ...rest }) => ({ title: getTitle.OptionDesc, ...rest, gender: getGender, incomeType: getIncome.Name, proofType: getProofType.Name, proofDocument: getProofDocument.Name }));
        this.coAppItems = appData;
      } else {
        const appData = await allDetails.map(({ title, profileImage, gender, empCategoryType, incomeType, empName, id, deviceId, sync, backup, refId, samePermanentAdd, applicantType, repaymentType, proofType, proofDocument, ...rest }) => ({ title: getTitle.OptionDesc, ...rest, gender: getGender, incomeType: getIncome.Name, proofType: getProofType.Name, proofDocument: getProofDocument.Name }));
        this.gauItems = appData;
      }
    }


  }


}
