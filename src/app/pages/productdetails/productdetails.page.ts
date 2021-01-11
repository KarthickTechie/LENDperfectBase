import { OtpcheckComponent } from './../../component/otpcheck/otpcheck.component';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { HandlingError } from './../../utility/ErrorHandling';
import { GlobalService } from './../../providers/global.service';
import { MasterService } from './../../providers/master.service';
import { FormcontrolService } from './../../providers/formcontrol.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.page.html',
  styleUrls: ['./productdetails.page.scss'],
})
export class ProductdetailsPage implements OnInit {

  loanDetails: FormGroup;
  validation_messages: any;

  loanProductList: any;
  makeList: any;
  modelList: any;
  ndlpList: any;
  variantList: any;
  residenceStabilityList: any;
  interestTypeList: any;
  repaymenttypeList: any;
  repaymentModeList: any;

  constructor(public formctrl: FormcontrolService, public master: MasterService,
    private errorHandling: HandlingError, public global: GlobalService,
    public modalController: ModalController, public alertCtrl: AlertController, public router: Router) { }

  ngOnInit() {
    this.loanDetails = this.formctrl.loanform();
    this.validation_messages = this.errorHandling.loanFormValidation();
    this.loanProductList = this.master.getloanProductList();
    this.makeList = this.master.getMakeList();
    this.modelList = this.master.getModelList();
    this.variantList = this.master.getVariantList();
    this.ndlpList = this.master.getNdlpList();
    this.residenceStabilityList = this.master.getResidenceStabilityList();
    this.interestTypeList = this.master.getinterestTypeList();
    this.repaymentModeList = this.master.getrepaymentModeList();
    this.repaymenttypeList = this.master.getrepaymenttypeList();
  }

  productSave(value) {
    console.log(value);
    this.global.globalLodingPresent('Saving Values...')
    setTimeout(() => {
      this.global.globalLodingDismiss()
    }, 500);
    setTimeout(async () => {
      const alert = await this.alertCtrl.create({
        header: 'Product Details saved!',
        message: 'Proceed further?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: (blah) => {
              console.log(blah)
            }
          }, {
            text: 'Yes',
            handler: () => {
              console.log('Confirm Okay');
              this.router.navigate(['/otp'])
            }
          }
        ]
      })
      await alert.present()
    }, 500);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: OtpcheckComponent,
      cssClass: 'otp-class'
    });
    return await modal.present();
  }

}
