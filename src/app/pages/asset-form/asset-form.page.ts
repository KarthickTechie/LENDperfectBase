import { GlobalService } from './../../providers/global.service';
import { Subscription } from 'rxjs';
import { PopoverController } from '@ionic/angular';
import { ReferenceCardComponent } from './../../component/reference-card/reference-card.component';
import { FormGroup } from '@angular/forms';
import { HandlingError } from './../../utility/ErrorHandling';
import { MasterService } from './../../providers/master.service';
import { FormcontrolService } from './../../providers/formcontrol.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asset-form',
  templateUrl: './asset-form.page.html',
  styleUrls: ['./asset-form.page.scss'],
})
export class AssetFormPage implements OnInit {

  title:any;
  validation_messages: any;
  popoverClose:Subscription;

  //formgroup
  assetImmovable:FormGroup;

  //boolean
  showMovableAsset:boolean =false;
  showImmovableAsset:boolean =false;
  showNonAgriType:boolean = false;
  
  //list
  assetTypeList:any;
  nonAgriLandTypeList:any;


  formNameList:any[]=[
    {icon:"clipboard", name:"Insurance Policy", tick:true},
    {icon:"shapes", name:"Shares / Mutual Fund",  tick:true},
    {icon:"podium", name:"Term Deposits",  tick:true},
    {icon:"logo-buffer", name:"Investment In Government",  tick:true},
    {icon:"bicycle", name:"Vehicles",  tick:true},
    {icon:"golf", name:"Jewellery",  tick:true},
    {icon:"business", name:"Business Investment",  tick:true},
    {icon:"file-tray-stacked", name:"Other Asset",  tick:true},
  ]

  constructor(public activatedRoute:ActivatedRoute,public formctrl: FormcontrolService,
              public master: MasterService, public router:Router, public errorHandling:HandlingError,
              public popoverController:PopoverController,public global:GlobalService) {
    this.activatedRoute.queryParamMap.subscribe(data =>{
      
      this.title = data['params'].pageTitle;
      
      if(this.title==='Movable Asset'){
        this.showMovableAsset=true;
        this.showImmovableAsset=false;}
      else if(this.title==="Immovable Asset"){
        this.showMovableAsset=false;
        this.showImmovableAsset=true;}
    })

   }

  ngOnInit() {
    this.assetImmovable = this.formctrl.assetImmovableForm();
    this.validation_messages = this.errorHandling.assetImmovableValid();
    

    this.assetTypeList = this.master.getAssetTypeList();
    this.nonAgriLandTypeList = this.master.getNonAgriLandTypeList();
    

  }

  assetTab(event){
    console.log(event.detail.value);
    let assetTypeValue = event.detail.value;
    if(assetTypeValue === 'nonAgriLand'){this.showNonAgriType = true;}
    else{this.showNonAgriType = false;}
  }

  assetImmovableSave(value){
    console.log(value)
  }
  
  openMovableForm(stringValue){
    this.router.navigate(['/movableforms'],{queryParams:{pageTitle:stringValue}});
    console.log(stringValue,"to open");
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
