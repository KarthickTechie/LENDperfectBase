import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from "@angular/forms";

import { FormControlData } from "../formcontrol";
import { MasterData } from "../masterservice";
import { SqliteProvider } from "../../global/sqlite"
import { HandlingError } from "../../utility/ErrorHandling";

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
})
export class PersonalDetailsComponent implements OnInit {

  personalDetails: FormGroup;
  validation_messages: any;

  genderSelect: any;
  titleList: any;
  nationalityList: any;
  maritalStatusList: any;

  addressType: any;
  ionCheck: boolean = false;


  constructor(public formctrl: FormControlData, public master: MasterData, public sqlite: SqliteProvider, private errorHandling: HandlingError) { }

  ngOnInit() {
    this.validation_messages = this.errorHandling.personalvalid();
    this.personalDetails = this.formctrl.personalform();
    this.titleList = this.master.getTitleList();
    this.nationalityList = this.master.getNationalityList();
    this.maritalStatusList = this.master.getMaritalStatusList();

  }
  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    //console.log(Object.keys(this.personalDetails.controls)[0]);
    // this.sqlite.createtable("PERSONAL_DETAILS", "personalId", Object.keys(this.master.getPersonalTable()), Object.values(this.master.getPersonalTable()));
  }

  personalSave(data) {
    for (let key in data) {
      if (data[key] == " " || data[key] == "") {
        data[key] = "empty";
      }
    }
    this.sqlite.insertQuery("PERSONAL_DETAILS", this.personalDetails.value, '01');
  }

  selectGender() {
    this.genderSelect = (this.personalDetails.controls.title.value == '01' ? 'M' : "F")
  }

  genderChng() {
    this.genderSelect = (this.genderSelect === 'Male' ? 'M' : this.genderSelect === 'F' ? 'F' : 'N');
  }

  getToday(): string {
    var yesterday = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];
    return yesterday;
  }

  getCheckedStatus() {
    if (this.ionCheck == true) {
      if (this.personalDetails.value.address != undefined && this.personalDetails.value.address != '') {
      }
      else {
        this.personalDetails.get('samePerAdd').setValue(false);
        alert('Please add Permanent Address');
      }
    }
  }

}
