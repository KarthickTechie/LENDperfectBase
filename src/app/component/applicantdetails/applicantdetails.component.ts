import { GlobalService } from './../../providers/global.service';
import { MasterService } from './../../providers/master.service';
import { FormGroup } from '@angular/forms';
import { FormcontrolService } from './../../providers/formcontrol.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-applicantdetails',
  templateUrl: './applicantdetails.component.html',
  styleUrls: ['./applicantdetails.component.scss'],
})
export class ApplicantdetailsComponent implements OnInit {

  personalDetails: FormGroup;
  titleList:any;
  nationalityList:any;
  maritalStatusList:any;
  solIdList:any;
  schemeCodeList:any;
  sourceList:any;
  productList:any;
  empNameList:any;
  createdDate:any;
  @Output() saveStatus = new EventEmitter();

  constructor(public formctrl: FormcontrolService,public master:MasterService,public global:GlobalService) { }

  ngOnInit() {
    this.personalDetails = this.formctrl.personalform();
    this.titleList = this.master.getTitleList();
    this.nationalityList = this.master.getNationalityList();
    this.maritalStatusList = this.master.getMaritalStatusList();
    this.solIdList = this.master.getSolIdList();
    this.schemeCodeList = this.master.getSchemeCodeList();
    this.sourceList = this.master.getSourceList();
    this.productList = this.master.getProductList();
    this.empNameList = this.master.getEmpNameList();
    this.createdDate = new Date();

  }

  personalSave(){
    this.global.presentAlert("Alert","New Applicant details saved");
    this.saveStatus.emit({ value: "newAppTick", slide: "Y" });

  }
}
