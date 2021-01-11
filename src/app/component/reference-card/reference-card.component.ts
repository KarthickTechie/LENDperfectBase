import { GlobalService } from './../../providers/global.service';
import { NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reference-card',
  templateUrl: './reference-card.component.html',
  styleUrls: ['./reference-card.component.scss'],
})
export class ReferenceCardComponent implements OnInit {
  pageHeader: any;
  referenceDetails = [
    { name: "Raja", occupation: "Farmer", address: "45, GH road, Guindy", mobileNo: "9885321125" },
    { name: "Praveen", occupation: "BusinessMan", address: "67, MM colony, Adyar", mobileNo: "9665478521" }

  ];
  assetImmovableDetails = [
    { assetType: "Non Agri Land", name: "Sundar", area: "1475 sq.ft", address: "456A, Ponnamalle Rd, Porur" }
  ]
  insurancePolicyDetails = [
    { companyName: "Bajaj Insurance", branch: "Guindy", DOI: "25/08/2020", annualPre: "2,22,000" }
  ]
  groupConcernDetails = [{ name: 'KPJ Properties and Lands', constitution: 'individual', addOfAssCon: '45,MM road, Gunidy, Chennai-38' }];

  pageFrom: any;
  referenceShow: boolean = true;
  assetImmoveShow: boolean = false;
  insurancePolicyShow: boolean = false;
  groupConcernShow: boolean = false;
  constructor(public NavParams: NavParams, public global: GlobalService) {
    this.pageFrom = this.NavParams.get("pageName");
    if (this.pageFrom == 'assetImmovable') {
      this.assetImmoveShow = true;
      this.referenceShow = false;
      this.insurancePolicyShow = false;

      this.pageHeader = "Immovable Assets";

    } else if (this.pageFrom == 'referenceDetails') {
      this.assetImmoveShow = false;
      this.referenceShow = true;
      this.insurancePolicyShow = false;
      this.pageHeader = "Reference Details";
    } else if (this.pageFrom == 'insurancePolicy') {
      this.assetImmoveShow = false;
      this.referenceShow = false;
      this.insurancePolicyShow = true;

      this.pageHeader = "Insurance Policy";
      console.log(this.insurancePolicyDetails, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    } else if (this.pageFrom == 'concernDetails') {
      this.assetImmoveShow = false;
      this.referenceShow = false;
      this.insurancePolicyShow = false;
      this.groupConcernShow = true;
      this.pageHeader = "Group Concern Details";
    } else if (this.pageFrom == 'mutalFund' || this.pageFrom == 'termPolicy' || this.pageFrom == 'investInGov' || this.pageFrom == 'vehicles' ||
      this.pageFrom == 'jewellery' || this.pageFrom == 'BusinessInvest' || this.pageFrom == 'otherAsset') {
      this.assetImmoveShow = false;
      this.referenceShow = false;
      this.insurancePolicyShow = true;


      switch (this.pageFrom) {
        case 'mutalFund':
          this.pageHeader = "Shares / Mutal Fund";
          break;
        case 'termPolicy':
          this.pageHeader = "Term Deposits";
          break;

        case 'investInGov':
          this.pageHeader = "Investment In Government";

          break;

        case 'vehicles':
          this.pageHeader = "Vehicles";
          break;

        case 'jewellery':
          this.pageHeader = "Jewellery";
          break;

        case 'BusinessInvest':
          this.pageHeader = "Business Investment";
          break;

        case 'otherAsset':
          this.pageHeader = "Other Asset";
          break;
      }
    }
  }

  ngOnInit() { }

  closePopover() {
    this.global.infoClose('close');
  }

}
