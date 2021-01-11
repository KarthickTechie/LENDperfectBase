import { GlobalService } from './../../providers/global.service';
import { MasterService } from './../../providers/master.service';
import { PopoverController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { FormcontrolService } from './../../providers/formcontrol.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-kycdetails',
  templateUrl: './kycdetails.component.html',
  styleUrls: ['./kycdetails.component.scss'],
})
export class KycdetailsComponent implements OnInit {

  kycDetails: FormGroup;
  kycproofList: any[];
  @Output() saveStatus = new EventEmitter();

  constructor(public formctrl: FormcontrolService,
    public popoverController: PopoverController,
    public master: MasterService,public global:GlobalService) { }


  ngOnInit() {
    this.kycDetails = this.formctrl.kycform();
    this.kycproofList = this.master.getKycproofList();


  }

  setValidation() {
    this.kycDetails.get('proofvalue').setValue("");
    // this.kycDetails.get('proofvalue').setValidators([Validators.required]);
    this.kycDetails.get('proofvalue').updateValueAndValidity();
    let proofType = this.kycDetails.get('proofDocument');
    console.log(proofType, 'proof');
    if (proofType.value === '02') {
      this.openActionSheet();
    }

  }

  async openActionSheet() {
    const popover = await this.popoverController.create({
      component: '',
      componentProps: {},
      cssClass: 'popBio',
      // event: ev,
      mode: 'ios',
      translucent: true,
      showBackdrop: true,
      animated: true, backdropDismiss: false
    });
    return await popover.present();
  }

  kycSave(){
    this.global.presentAlert("Alert","KYC details saved");
    this.saveStatus.emit({ value: "kycTick", slide: "Y" });
  }


}
