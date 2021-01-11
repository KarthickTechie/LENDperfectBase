import { GlobalService } from './../../providers/global.service';
import { Subscription } from 'rxjs';
import { ReferenceCardComponent } from './../../component/reference-card/reference-card.component';
import { PopoverController } from '@ionic/angular';
import { HandlingError } from './../../utility/ErrorHandling';
import { MasterService } from './../../providers/master.service';
import { FormcontrolService } from './../../providers/formcontrol.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movable-forms',
  templateUrl: './movable-forms.page.html',
  styleUrls: ['./movable-forms.page.scss'],
})
export class MovableFormsPage implements OnInit {

  yesNoList:any;
  jewellTypeList : any;
  title:any;
  popoverClose:Subscription;


  //formGroup
  assetMovableInsuranceForm:FormGroup;
  assetMovableMutualFundForm:FormGroup;
  assetMovableTermDepositForm:FormGroup;
  assetMovableInvestmentForm:FormGroup;
  assetMovableVehiclesForm:FormGroup;
  assetMovableJewelleryForm:FormGroup;
  assetMovableBusinessInvestmentForm:FormGroup;
  assetMovableOtherInvestmentForm:FormGroup;

  showInsurancePolicy:boolean = false;
  formCard:boolean = true;
  showMutualFund:boolean = false;
  showTermDepositForm:boolean = false;
  showInvestmentForm  : boolean = false;
  showVehiclesForm  : boolean = false;
  showJewelleryForm : boolean = false;
  showBusinessInvestmentForm  : boolean = false;
  showOtherInvestmentForm : boolean = false;


  constructor(public activatedRoute:ActivatedRoute,public formctrl: FormcontrolService,
    public master: MasterService, public router:Router, public errorHandling:HandlingError,public popoverController:PopoverController,
    public global:GlobalService) { 

      this.activatedRoute.queryParamMap.subscribe(data =>{
        this.title = data['params'].pageTitle;
        
        switch(this.title){
          case 'Insurance Policy':
            this.showInsurancePolicy=true;
            break;
          
          case 'Shares / Mutual Fund':
            this.showMutualFund=true;
            break;
          
          case 'Term Deposits':
            this.showTermDepositForm = true;
            break;
          
            case 'Investment In Government':
              this.showInvestmentForm=true;
              break;
      
            case 'Vehicles':
              this.showVehiclesForm=true;
              break;
            
            case 'Jewellery':
              this.showJewelleryForm=true;
              break;
            
            case 'Business Investment':
              this.showBusinessInvestmentForm=true;
              break;
            
            case 'Other Asset':
              this.showOtherInvestmentForm=true;
              break;
          }

        
      })
    }

  ngOnInit() {
    this.assetMovableInsuranceForm = this.formctrl.assetMovableInsuranceForm();
    this.assetMovableMutualFundForm = this.formctrl.assetMovableMutualFundForm();
    this.assetMovableTermDepositForm = this.formctrl.assetMovableTermDepositForm();
    this.assetMovableInvestmentForm = this.formctrl.assetMovableInvestmentForm();
    this.assetMovableVehiclesForm = this.formctrl.assetMovableVehiclesForm();
    this.assetMovableJewelleryForm = this.formctrl.assetMovableJewelleryForm();
    this.assetMovableBusinessInvestmentForm = this.formctrl.assetMovableBusinessInvestmentForm();
    this.assetMovableOtherInvestmentForm = this.formctrl.assetMovableOtherInvestmentForm();

    this.yesNoList = this.master.getYesNoList();
    this.jewellTypeList = this.master.getJewellTypeList();
  }

  
  

  getToday(): string {
    var yesterday = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];
    return yesterday;
  }

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


}
