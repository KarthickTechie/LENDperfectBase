import { GroupConcernDetailsPageRoutingModule } from './../group-concern-details/group-concern-details-routing.module';
import { GlobalService } from './../../providers/global.service';
import { FormGroup } from '@angular/forms';
import { MasterService } from './../../providers/master.service';
import { FormcontrolService } from './../../providers/formcontrol.service';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-masterupdate',
  templateUrl: './masterupdate.page.html',
  styleUrls: ['./masterupdate.page.scss'],
})
export class MasterupdatePage implements OnInit {
  stateList: any;


  masterUpdates: any[] = [
    { icon: 'people', id: "user", label: "User Master", loading: true, tick: false },
    { icon: 'cash', id: "loan", label: "Loan Master", loading: true, tick: false },
    { icon: 'help-buoy', id: "facility", label: "Facility Master", loading: true, tick: false },
    { icon: 'card', id: "income", label: "Income Master", loading: true, tick: false },
    { icon: 'pin', id: "pincode", label: "Pincode Master", loading: true, tick: false },
    { icon: 'location', id: "state", label: "State Master", loading: true, tick: false },
    { icon: 'briefcase', id: "product", label: "Product Master", loading: true, tick: false },
    { icon: 'document', id: "document", label: "Document Master", loading: true, tick: false },
    { icon: 'stats-chart', id: "static", label: "Static Data Master", loading: true, tick: false },
    { icon: 'swap-vertical', id: "interest", label: "Interest Master", loading: true, tick: false },
    { icon: 'save', id: "sanction", label: "Sanction Master", loading: true, tick: false },
  ]


  constructor(public formctrl: FormcontrolService, public master: MasterService, public global: GlobalService,
    public renderer: Renderer2) { }

  ngOnInit() {

    this.stateList = this.master.getStateList();
    this.getmaster();
  }


  getmaster() {
    setTimeout(() => {
      const master = this.masterUpdates.map((user) => {
        if (user.id == 'user') {

          return {
            ...user,
            tick: true,
            loading: false,
          }
        }
        return user
      });
      this.masterUpdates = master;

      this.getloanMaster();
    }, 1000);

  }


  getloanMaster() {
    setTimeout(() => {
      const master = this.masterUpdates.map((user) => {
        if (user.id == 'loan') {

          return {
            ...user,
            tick: true,
            loading: false,
          }
        }
        return user
      });
      this.masterUpdates = master;

      this.getfacilityMaster();
    }, 1000);
  }

  getfacilityMaster() {
    setTimeout(() => {
      const master = this.masterUpdates.map((user) => {
        if (user.id == 'facility') {

          return {
            ...user,
            tick: true,
            loading: false,
          }
        }
        return user
      });
      this.masterUpdates = master;
      this.getincomeMaster();

    }, 1000);
  }

  getincomeMaster() {
    setTimeout(() => {
      const master = this.masterUpdates.map((user) => {
        if (user.id == 'income') {

          return {
            ...user,
            tick: true,
            loading: false,
          }
        }
        return user
      });
      this.masterUpdates = master;

      this.getpincodeMaster();
    }, 1000);
  }

  getpincodeMaster() {
    setTimeout(() => {
      const master = this.masterUpdates.map((user) => {
        if (user.id == 'pincode') {

          return {
            ...user,
            tick: true,
            loading: false,
          }
        }
        return user
      });
      this.masterUpdates = master;

      this.getstateMaster();
    }, 1000);
  }

  getstateMaster() {
    setTimeout(() => {
      const master = this.masterUpdates.map((user) => {
        if (user.id == 'state') {

          return {
            ...user,
            tick: true,
            loading: false,
          }
        }
        return user
      });
      this.masterUpdates = master;
      this.getproductMaster();

    }, 1000);
  }

  getproductMaster() {
    setTimeout(() => {
      const master = this.masterUpdates.map((user) => {
        if (user.id == 'product') {

          return {
            ...user,
            tick: true,
            loading: false,
          }
        }
        return user
      });
      this.masterUpdates = master;
      this.getdocumentMaster();

    }, 1000);
  }

  getdocumentMaster() {
    setTimeout(() => {
      const master = this.masterUpdates.map((user) => {
        if (user.id == 'document') {

          return {
            ...user,
            tick: true,
            loading: false,
          }
        }
        return user
      });
      this.masterUpdates = master;

      this.getstaticMaster();
    }, 1000);
  }

  getstaticMaster() {
    setTimeout(() => {
      const master = this.masterUpdates.map((user) => {
        if (user.id == 'static') {

          return {
            ...user,
            tick: true,
            loading: false,
          }
        }
        return user
      });
      this.masterUpdates = master;
      this.getinterestMaster();

    }, 1000);
  }

  getinterestMaster() {
    setTimeout(() => {
      const master = this.masterUpdates.map((user) => {
        if (user.id == 'interest') {

          return {
            ...user,
            tick: true,
            loading: false,
          }
        }
        return user
      });
      this.masterUpdates = master;
      this.getsanctionMaster();

    }, 1000);
  }

  getsanctionMaster() {
    setTimeout(() => {
      const master = this.masterUpdates.map((user) => {
        if (user.id == 'sanction') {
          return {
            ...user,
            tick: true,
            loading: false,
          }
        }
        return user
      });
      this.masterUpdates = master;


    }, 1000);
  }



}
