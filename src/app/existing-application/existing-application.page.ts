import { ErrorHandlingService } from './../error-handling.service';
import { PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SqliteProvider } from './../global/sqlite';
import { GlobalService } from './../global/global.service';
import { AlertComponent } from '../setting/alert//alert.component';
import { AlertDirective } from './../setting/alert.directive';
import { AlertPage } from "../setting/alert.page";
import { PopoverComponent } from '../popover/popover.component';
import { PopoverinfoComponent } from '../popoverinfo/popoverinfo.component';
import { PopoverdetailsComponent } from '../popoverdetails/popoverdetails.component';



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
  filtersubscrip: Subscription;
  popoverInfo: Subscription;
  popoverClose: Subscription;

  applications = [];

  constructor(public alertPage: AlertPage,
    public router: Router, public activatedRoute: ActivatedRoute, public sqlite: SqliteProvider, public popoverController: PopoverController, public global: GlobalService,public errorLogService: ErrorHandlingService
  ) {

  }

  ngOnInit() {
    this.getApplicants();
  }

  existingApp(applicant) {
    console.log(applicant, "before navigation");
    console.log(JSON.stringify(applicant), "stringify before navigation");
    this.router.navigate(['/existappdetails'], { relativeTo: this.activatedRoute, queryParams: { existApplicant: JSON.stringify(applicant), refId: applicant.refId } });
  }


  async getApplicants() {
    let data = await this.sqlite.getAllApplicants();
    console.log(data, "Existing page getall details");
    this.applications = data;
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

  async presentPopover(ev, filter) {
    try {
      const popover = await this.popoverController.create({
        component: PopoverComponent,
        componentProps: { filterItems: (filter == 'filter') ? true : false, sortItems: (filter == 'sort') ? true : false },
        cssClass: 'popOver',
        event: ev,
        mode: 'ios',
        translucent: true,
        showBackdrop: true,
        animated: true,
      });
      console.log('outside filter', filter);
  
      this.filtersubscrip = this.global.filterItems.subscribe(data => {
        if (data.data == 'filter') {
          this.filterValue = data.value;
          localStorage.setItem('filter', data.value);
        }
  
        if (data.data == 'sort') {
          this.sortValue = data.data.value;
          localStorage.setItem('sort', data.value);
          if (this.sortValue == "ascending") {
            let array = [...this.applications];
            this.applications = array.sort(this.compareValues('name', 'asc'));
          } else {
            let array = [...this.applications];
            this.applications = array.sort(this.compareValues('name', "desc"));
          }
        }
  
        popover.dismiss();
      })
      return await popover.present();
  
    } catch (error) {
      this.errorLogService.errorLog(new Error(JSON.stringify(error)));
    }
    
  }

  async moreInfo(ev,applicant) {
    try {
      ev.stopPropagation()
    const popover = await this.popoverController.create({
      component: PopoverinfoComponent,
      componentProps: {},
      cssClass: 'popOverInfo',
      event: ev,
      // mode: 'ios',
      translucent: true,
      showBackdrop: true,
      animated: true,
    });

    this.popoverInfo = this.global.popoverInfo.subscribe(data => {

      if (data) {
        this.popoverInfoDetails(data,applicant);
        popover.dismiss();
      }

    });
    return await popover.present();
    } catch (error) {
      this.errorLogService.errorLog(new Error(JSON.stringify(error)));
      
    }
    
  }

  async popoverInfoDetails(data,applicant) {
    try {
      const popoverDetails = await this.popoverController.create({
        component: PopoverdetailsComponent,
        componentProps: { data: data,applicant:applicant },
        cssClass: 'popInfoDeta',
        // event: ev,
        // mode: 'ios',
        translucent: true,
        showBackdrop: true,
        animated: true,
      });
  
      this.popoverClose = this.global.popoverclose.subscribe(data => {
        popoverDetails.dismiss();
      })
      return await popoverDetails.present();
      
    } catch (error) {
      this.errorLogService.errorLog(new Error(JSON.stringify(error)));
      
    }
    

  }

  ngOnDestroy() {
    this.filtersubscrip ? this.filtersubscrip.unsubscribe() : '';
    this.popoverInfo ? this.popoverInfo.unsubscribe() : '';
    this.popoverClose ? this.popoverClose.unsubscribe() : '';
  }



}
