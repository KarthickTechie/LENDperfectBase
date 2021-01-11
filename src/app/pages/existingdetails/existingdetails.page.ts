import { GlobalService } from './../../providers/global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonFab } from '@ionic/angular';


@Component({
  selector: 'app-existingdetails',
  templateUrl: './existingdetails.page.html',
  styleUrls: ['./existingdetails.page.scss'],
})
export class ExistingdetailsPage implements OnInit {

  applications: any;
  @ViewChild('fab', { static: false }) fab: IonFab;


  constructor(public activatedRoute: ActivatedRoute, public global: GlobalService, public router: Router) {
    this.activatedRoute.queryParamMap.subscribe(data => {
      console.log(data, "rrrrrrrrr")
      this.applications = JSON.parse(data['params'].existApp);
      console.log(this.applications, "ssssss")

    });
  }

  ngOnInit() {
  }

  ionViewWillLeave() {
    (this.fab) ? this.fab.close() : '';
  }


  addCoApplicant() {

  }


  existingApp(applicant) {
    console.log(applicant.refId, "applicant idddddddddd");
    // this.global.setRefId(applicant.refId);
    // this.global.setId(applicant.id);
    this.global.setApplicantType("A");
    // this.global.setProfileImage(applicant.profileImage);
    this.router.navigate(["/newapp"], { skipLocationChange: true, queryParams: { loader: true } });
  }

  existingcoApp(coAapplicant) {
    // this.global.setRefId(coAapplicant.refId);
    // this.global.setId(coAapplicant.id);
    this.global.setApplicantType("C");
    // this.global.setProfileImage(coAapplicant.profileImage);
    this.router.navigate(["/newapp"], { skipLocationChange: true, queryParams: { loader: true } });

  }
}
