import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-borrower-details',
  templateUrl: './borrower-details.page.html',
  styleUrls: ['./borrower-details.page.scss'],
})
export class BorrowerDetailsPage implements OnInit {
  showDetails: boolean = true;
  appType: any;
  applicantType:any;
  constructor(public router: Router, public activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParamMap.subscribe(data => {
      console.log(data, "ddddddddddddd");
      this.appType = data['params'].value;
      if (this.appType == 'borrower') {
        this.showDetails = true;
        this.applicantType = 'Borrower Details';
      } else if (this.appType == 'promotor') {
        this.showDetails = false;
        this.applicantType = 'Promtor Details';
      } else if (this.appType == 'gurantor') {
        this.showDetails = false;
        this.applicantType = 'Gurantor Details';
      }
    });
  }

  ngOnInit() {
  }
  openBureau() {
    this.router.navigate(['/bureau'])
  }
  openPersonal(value) {
    this.router.navigate(['/personalinformation'], { queryParams: { page: value, appType: this.appType } })
  }
  openNetworth() {
    this.router.navigate(['/networth'], { queryParams: { appType: this.appType } });
  }

}
