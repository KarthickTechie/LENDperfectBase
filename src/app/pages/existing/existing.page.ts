import { ListviewComponent } from './../../component/listview/listview.component';
import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { PopoverController, MenuController } from '@ionic/angular';
import { GlobalService } from './../../providers/global.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-existing',
  templateUrl: './existing.page.html',
  styleUrls: ['./existing.page.scss'],
})
export class ExistingPage implements OnInit {
  @ViewChild('view', { static: false }) view: ElementRef;

  fitab: any

  listgridsubscrip: Subscription;
  popoverInfo: Subscription;
  applications = [
    { status: "Submitted", name: 'Dany Mithran', application: 'RBL000024', loanAmt: "5,00,000.00", date: 'May 11, 2020' },
    { status: "Submitted", name: 'Praveen Mithran', application: 'RBL000024', loanAmt: "5,00,000.00", date: 'May 11, 2020' },
    { status: "Not Submitted", name: 'Praveen Mithran', application: 'RBL000024', loanAmt: "5,00,000.00", date: 'May 11, 2020' },
    { status: "Submitted", name: 'Praveen Mithran', application: 'RBL000024', loanAmt: "5,00,000.00", date: 'May 11, 2020' },
    { status: "Not Submitted", name: 'Praveen Mithran', application: 'RBL000024', loanAmt: "5,00,000.00", date: 'May 11, 2020' },
    { status: "Submitted", name: 'Rajesh Mithran', application: 'RBL000024', loanAmt: "5,00,000.00", date: 'May 11, 2020' },
  ]
  constructor(public popoverController: PopoverController, public menuctrl: MenuController, public global: GlobalService, public render: Renderer2, public router: Router, public activatedRoute: ActivatedRoute, ) {
    this.activatedRoute.queryParamMap.subscribe(data => {
      this.fitab = data['params'].app;

      console.log("this. fitab", this.fitab);
      if (this.fitab) {
        this.applications = [
          { status: "Sanctioned", name: 'Dany Mithran', application: 'RBL000024', loanAmt: "5,00,000.00", date: '10/09/2020 - 11:23 AM' },
          { status: "BRE", name: 'Praveen Mithran', application: 'RBL000024', loanAmt: "5,00,000.00", date: '10/09/2020 - 11:23 AM' },
          { status: "BRE", name: 'Praveen Mithran', application: 'RBL000024', loanAmt: "5,00,000.00", date: '10/09/2020 - 11:23 AM' },
          { status: "BRE", name: 'Praveen Mithran', application: 'RBL000024', loanAmt: "5,00,000.00", date: '10/09/2020 - 11:23 AM' },
          { status: "BRE", name: 'Praveen Mithran', application: 'RBL000024', loanAmt: "5,00,000.00", date: '10/09/2020 - 11:23 AM' },
          { status: "BRE", name: 'Rajesh Mithran', application: 'RBL000024', loanAmt: "5,00,000.00", date: '10/09/2020 - 11:23 AM' },
        ]
      }


    });
  }

  ngOnInit() {


  }

  menuopen() {
    this.menuctrl.open();
  }


  async listGridView(ev, value) {
    try {
      const popover = await this.popoverController.create({
        component: ListviewComponent,
        componentProps: { viewItems: (value == 'view') ? true : false },
        cssClass: 'popOver',
        event: ev,
        mode: 'ios',
        translucent: true,
        showBackdrop: true,
        animated: true,
      });


      this.listgridsubscrip = this.global.filterItems.subscribe(data => {

        if (data.data == 'view') {
          if (data.value == 'list') {
            this.render.removeClass(this.view.nativeElement, "girdcontainer");
            this.render.addClass(this.view.nativeElement, "listcontainer");
            localStorage.setItem('view', data.value);
          } else {
            this.render.removeClass(this.view.nativeElement, "listcontainer");
            this.render.addClass(this.view.nativeElement, "girdcontainer");
            localStorage.setItem('view', data.value);
          }
        }

        popover.dismiss();
      })
      return await popover.present();

    } catch (error) {
      // this.errorLogService.errorLog(new Error(JSON.stringify(error)));
    }

  }


  async moreInfo(ev, applicant) {
    console.log(ev, applicant, "moreinfo");
    try {
      ev.stopPropagation()
      const popover = await this.popoverController.create({
        component: '',
        componentProps: { data: this.fitab },
        cssClass: 'popOverInfo',
        event: ev,
        mode: 'ios',
        translucent: true,
        showBackdrop: true,
        animated: true,
      });

      this.popoverInfo = this.global.popoverInfo.subscribe(data => {

        if (data) {
          if (data == "FI") {
            this.router.navigate(['/fiscreen'], { queryParams: { applicant: JSON.stringify(applicant) }, skipLocationChange: true });
            popover.dismiss();
          } else {
            popover.dismiss();
          }

          // this.popoverInfoDetails(data,applicant);
        }

      });
      return await popover.present();
    } catch (error) {
      // this.errorLogService.errorLog(new Error(JSON.stringify(error)));

    }


  }


  existingApp(app) {
    this.router.navigate(['/existingdetails'], { queryParams: { existApp: JSON.stringify([app]) }, skipLocationChange: true });

  }

  openDetailsView(){
    this.router.navigate(['/fullapplicationview']);
  }



}
