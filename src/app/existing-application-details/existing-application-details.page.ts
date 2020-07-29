import { IonFab } from '@ionic/angular';
import { GlobalService } from './../global/global.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { SqliteProvider } from '../global/sqlite';



@Component({
  selector: 'app-existing-application-details',
  templateUrl: './existing-application-details.page.html',
  styleUrls: ['./existing-application-details.page.scss'],
})
export class ExistingApplicationDetailsPage implements OnInit {



  profile = "assets/imgs/round_headshot.png";
  addressType: any;
  applications = [];
  coApplications = [];
  gurantorApplications = [];
  coApplicants: any;
  gurantorsList: any;
  refId: any;
  @ViewChild('fab', { static: false }) fab: IonFab;



  constructor(public router: Router, public activatedRoute: ActivatedRoute, public global: GlobalService, public sqlite: SqliteProvider) {
    this.addressType = 'C';

  }

  ngOnInit() {

    // let test = this.activatedRoute.snapshot.queryParamMap.get("existApplicant");
    // this.applications.push(JSON.parse(test));
    this.refId = this.activatedRoute.snapshot.queryParamMap.get("refId");
    this.getApplicants();
    this.getCoApplicants();
    this.getGurantorApplicants();


  }

  ionViewWillLeave() {
    (this.fab) ? this.fab.close() : '';
  }
  ionViewDidEnter() {
    this.getApplicants();
    this.getCoApplicants();
    this.getGurantorApplicants();
  }

  goBack() {
    this.router.navigate(["/existapp"], { skipLocationChange: true });
  }


  existingApp(applicant) {
    console.log(applicant.refId, "applicant idddddddddd");
    this.global.setRefId(applicant.refId);
    this.global.setId(applicant.id);
    this.global.setApplicantType("A");
    this.global.setProfileImage(applicant.profileImage);
    this.router.navigate(["/newapp"], { skipLocationChange: true, queryParams: { loader: true } });
  }

  existingcoApp(coAapplicant) {
    this.global.setRefId(coAapplicant.refId);
    this.global.setId(coAapplicant.id);
    this.global.setApplicantType("C");
    this.global.setProfileImage(coAapplicant.profileImage);
    this.router.navigate(["/newapp"], { skipLocationChange: true, queryParams: { loader: true } });

  }

  existingGurantorApp(gurantor) {
    this.global.setRefId(gurantor.refId);
    this.global.setId(gurantor.id);
    this.global.setApplicantType("G");
    this.global.setProfileImage(gurantor.profileImage);
    this.router.navigate(["/newapp"], { skipLocationChange: true, queryParams: { loader: true } });

  }

  segmentChanged(e) {
    this.addressType = e.target.value;
    this.fab.close();
  }

  openExistingPage() {
    this.router.navigate(['/existapp'], { relativeTo: this.activatedRoute });
  }



  addCoApplicantGurantor(refId) {
    if (this.addressType == 'C') {
      if (this.coApplicants.length <= 3) {
        this.global.setApplicantType("C");
        this.global.setRefId(refId);
        this.global.setId("");
        this.global.setProfileImage("");
        this.global.setEditSaveStatus("");
        this.router.navigate(['/newapp'], { relativeTo: this.activatedRoute, queryParams: { dataInsert: "true", loader: true } });
      } else {
        this.global.presentAlert("Alert", "Maxmimum limit exceeds");
      }
    } else {
      if (this.gurantorsList.length <= 3) {
        this.global.setApplicantType("G");
        this.global.setRefId(refId);
        this.global.setId("");
        this.global.setProfileImage("");
        this.global.setEditSaveStatus("");
        this.router.navigate(['/newapp'], { relativeTo: this.activatedRoute, queryParams: { dataInsert: "true", loader: true } });
      } else {
        this.global.presentAlert("Alert", "Maxmimum limit exceeds");
      }

    }
  }

  async getApplicants() {
    const applicants = await this.sqlite.getAllApp(this.refId);
    applicants.length
      ? (this.applications = applicants)
      : (this.applications = []);
  }

  async getCoApplicants() {
    this.coApplicants = await this.sqlite.getAllCoapplicants(this.refId, "C");
    (this.coApplicants.length) ? this.coApplications = this.coApplicants : this.coApplications = [];
  }


  async getGurantorApplicants() {
    this.gurantorsList = await this.sqlite.getAllCoapplicants(this.refId, "G");
    (this.gurantorsList.length) ? this.gurantorApplications = this.gurantorsList : this.gurantorApplications = [];
  }


}
