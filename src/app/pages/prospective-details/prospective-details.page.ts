import { NearbyLeadssComponent } from './../../component/nearby-leadss/nearby-leadss.component';
import { FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FormcontrolService } from './../../providers/formcontrol.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prospective-details',
  templateUrl: './prospective-details.page.html',
  styleUrls: ['./prospective-details.page.scss'],
})
export class ProspectiveDetailsPage implements OnInit {

  prospectiveLeads: FormGroup;
  status = [
    { code: "1", name: "Status 1" },
    { code: "2", name: "Status 2" }
  ];

  applications = [
    { status: "Interested", name: 'Xerox shop' },
    { status: "Interested", name: 'Xerox shop' },
  ];

  constructor(public formCtrl: FormcontrolService, public modalCtrl: ModalController) { }

  ngOnInit() {
    this.prospectiveLeads = this.formCtrl.prospectiveLeads();

  }

  prospectiveLeadsSave(value) {
    console.log(value)
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: NearbyLeadssComponent,
      cssClass: 'nearby-leads'
    });
    return await modal.present();
  }

}
