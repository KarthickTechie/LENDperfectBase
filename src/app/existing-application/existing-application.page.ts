import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertComponent } from '../setting/alert//alert.component';
import { AlertDirective } from './../setting/alert.directive';
import { AlertPage } from "../setting/alert.page";


@Component({
  selector: 'app-existing-application',
  templateUrl: './existing-application.page.html',
  styleUrls: ['./existing-application.page.scss'],
})
export class ExistingApplicationPage implements OnInit {


  filterShow: boolean = false;
  sortShow: boolean = false;
  filterValue: any;
  sortValue: any;
  @ViewChild(AlertDirective, { static: false }) alertMessage: AlertDirective;

  applications = [
    { name: 'Chris', document: 9629919298, status: 'submitted', profile: "assets/imgs/round_headshot.png" },
    { name: 'Smith', document: 6542136987, status: 'notsubmitted', profile: "assets/imgs/person1.jpg" },
    { name: 'Taylor', document: 7852145226, status: 'pending', profile: "assets/imgs/person2.png" }
  ]
  constructor(public alertPage: AlertPage,

  ) { }

  ngOnInit() {
  }

  filterItems() {

    this.filterShow = true;
    // this.sortShow = false;
  }
  sortItems() {
    console.log(this.sortShow, "sortitems start");
    this.sortShow = true;
    // this.filterShow = false;
    console.log(this.sortShow, "sortitems end");
  }

  filterHidden() {
    this.filterShow = false;
    this.sortShow = false;
  }

  filterChange(e) {
    this.filterShow = false;
    this.alertPage.getAlertControl(AlertComponent, this.alertMessage, "Appling filters");
    this.filterValue = e;
    console.log('Event...', e);

  }

  // sortChange(e) {
  //   this.alertPage.getAlertControl(AlertComponent, this.alertMessage, "Appling Sort");

  // }
  sortChange(value) {
    this.sortShow = false;
    this.sortValue = value;
    console.log(value, "sorting");
    if (value == "ascending") {
      let array = [...this.applications];
      this.applications = array.sort(this.compareValues('name', 'asc'));
      console.log(this.applications, "ascending sort");
      // this.sortShow = false;
    }
    if (value == "descending") {
      let array = [...this.applications];
      this.applications = array.sort(this.compareValues('name', "desc"));
      console.log(this.applications, "descending sort");
      // this.sortShow = false;

    }
    // this.alertPage.getAlertControl(AlertComponent, this.alertMessage, "Applying Sort");
  }

  compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  radioChecked() {
    console.log("evemt")
    this.filterShow = false;
    this.sortShow = false;
  }
}
