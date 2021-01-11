import { Subscription } from 'rxjs';
import { GlobalService } from './../../providers/global.service';
import { ReferenceCardComponent } from './../../component/reference-card/reference-card.component';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HandlingError } from './../../utility/ErrorHandling';
import { MasterService } from './../../providers/master.service';
import { FormcontrolService } from './../../providers/formcontrol.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.page.html',
  styleUrls: ['./asset-details.page.scss'],
})
export class AssetDetailsPage implements OnInit {
  assetTypeTab: String;
  assetImmovable: FormGroup;
  assetMovableInsuranceForm: FormGroup;
  assetMovableMutualFundForm: FormGroup;
  assetMovableTermDepositForm: FormGroup;
  assetMovableInvestmentForm: FormGroup;
  assetMovableVehiclesForm: FormGroup;
  assetMovableJewelleryForm: FormGroup;
  assetMovableBusinessInvestmentForm: FormGroup;
  assetMovableOtherInvestmentForm: FormGroup;

  validation_messages: any;

  popoverClose: Subscription;
  showNonAgriType: boolean = false;
  showInsurancePolicy: boolean = false;
  formCard: boolean = true;
  showMutualFund: boolean = false;
  showTermDepositForm: boolean = false;
  showInvestmentForm: boolean = false;
  showVehiclesForm: boolean = false;
  showJewelleryForm: boolean = false;
  showBusinessInvestmentForm: boolean = false;
  showOtherInvestmentForm: boolean = false;

  //List
  assetTypeList: any;
  nonAgriLandTypeList: any;
  yesNoList: any;
  jewellTypeList: any;

  constructor(public formctrl: FormcontrolService, public master: MasterService, private errorHandling: HandlingError, public router: Router,
    public popoverController: PopoverController, public global: GlobalService) {
    this.assetTypeTab = "immovable";
    this.formCard = true;
  }

  ngOnInit() {
    this.assetImmovable = this.formctrl.assetImmovableForm();
    this.assetMovableInsuranceForm = this.formctrl.assetMovableInsuranceForm();
    this.assetMovableMutualFundForm = this.formctrl.assetMovableMutualFundForm();
    this.assetMovableTermDepositForm = this.formctrl.assetMovableTermDepositForm();
    this.assetMovableInvestmentForm = this.formctrl.assetMovableInvestmentForm();
    this.assetMovableVehiclesForm = this.formctrl.assetMovableVehiclesForm();
    this.assetMovableJewelleryForm = this.formctrl.assetMovableJewelleryForm();
    this.assetMovableBusinessInvestmentForm = this.formctrl.assetMovableBusinessInvestmentForm();
    this.assetMovableOtherInvestmentForm = this.formctrl.assetMovableOtherInvestmentForm();

    this.assetTypeList = this.master.getAssetTypeList();
    this.nonAgriLandTypeList = this.master.getNonAgriLandTypeList();
    this.yesNoList = this.master.getYesNoList();
    this.jewellTypeList = this.master.getJewellTypeList();

    this.validation_messages = this.errorHandling.assetImmovableValid()
  }

  assetImmovableSave(value) {
    console.log(value);
  }

  assetTab(event) {
    console.log(event.detail.value);
    let assetTypeValue = event.detail.value;
    if (assetTypeValue === 'nonAgriLand') { this.showNonAgriType = true; }
    else { this.showNonAgriType = false; }
  }

  getToday(): string {
    var yesterday = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];
    return yesterday;
  }

  closeMovableForm(stringValue) {
    console.log(stringValue, "to close");
    switch (stringValue) {
      case 'insurancePolicy':
        this.showInsurancePolicy = false;
        this.formCard = true;
        break;

      case 'mutualFund':
        this.showMutualFund = false;
        this.formCard = true;
        break;

      case 'termDepositForm':
        this.showTermDepositForm = false;
        this.formCard = true;
        break;

      case 'investmentForm':
        this.showInvestmentForm = false;
        this.formCard = true;
        break;

      case 'vehiclesForm':
        this.showVehiclesForm = false;
        this.formCard = true;
        break;

      case 'jewelleryForm':
        this.showJewelleryForm = false;
        this.formCard = true;
        break;

      case 'businessInvestmentForm':
        this.showBusinessInvestmentForm = false;
        this.formCard = true;
        break;

      case 'otherInvestmentForm':
        this.showOtherInvestmentForm = false;
        this.formCard = true;
        break;
    }
  }

  openMovableForm(stringValue) {
    console.log(stringValue, "to open");
    switch (stringValue) {
      case 'insurancePolicy':
        this.showInsurancePolicy = true;
        this.formCard = false;
        break;

      case 'mutualFund':
        this.showMutualFund = true;
        this.formCard = false;
        break;

      case 'termDepositForm':
        this.showTermDepositForm = true;
        this.formCard = false;
        break;

      case 'investmentForm':
        this.showInvestmentForm = true;
        this.formCard = false;
        break;

      case 'vehiclesForm':
        this.showVehiclesForm = true;
        this.formCard = false;
        break;

      case 'jewelleryForm':
        this.showJewelleryForm = true;
        this.formCard = false;
        break;

      case 'businessInvestmentForm':
        this.showBusinessInvestmentForm = true;
        this.formCard = false;
        break;

      case 'otherInvestmentForm':
        this.showOtherInvestmentForm = true;
        this.formCard = false;
        break;
    }
  }

  // openContentModal(stringValue){
  //   console.log(stringValue, "content to open form");
  //   switch(stringValue){
  //     case 'assetImmovable':
  //       this.router.navigate(['/contentModal'], {queryParams:{title:'Asset Immovable Form'}});
  //       break;
  //   }
  // }

  async openContentModal(ev, stringValue) {


    try {
      const popoverDetails = await this.popoverController.create({
        component: ReferenceCardComponent,
        componentProps: { pageName: stringValue },
        cssClass: 'popInfoDeta',
        translucent: true,
        showBackdrop: true,
        animated: true,
      });

      this.popoverClose = this.global.popoverclose.subscribe(data => {
        popoverDetails.dismiss();
      })

      return await popoverDetails.present();

    } catch (error) {
      // this.errorLogService.errorLog(new Error(JSON.stringify(error)));

    }



  }

  openMovable(){
    this.router.navigate(['/assetform'],{queryParams:{pageTitle:'Movable Asset'}} );   
  }

  openImmovable(){
    this.router.navigate(['/assetform'],{queryParams:{pageTitle:'Immovable Asset'}});
  }


}
