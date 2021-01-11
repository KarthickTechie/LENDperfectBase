import { ReferenceCardComponent } from './../../component/reference-card/reference-card.component';
import { GlobalService } from './../../providers/global.service';
import { Subscription } from 'rxjs';
import { PopoverController, NavParams } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { FormcontrolService } from './../../providers/formcontrol.service';
import { MasterService } from './../../providers/master.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-referencedetails',
  templateUrl: './referencedetails.page.html',
  styleUrls: ['./referencedetails.page.scss'],
})
export class ReferencedetailsPage implements OnInit {
  referenceDetails:FormGroup;
  popoverClose:Subscription;
  popInfo:any;
  

  constructor(public formctrl: FormcontrolService, public master: MasterService,public popoverController:PopoverController,
    public global:GlobalService) { 
    

    }

  ngOnInit() {
    this.referenceDetails = this.formctrl.referenceDetailsform();
    

  }

  async viewReferenceDetails(ev,stringValue){
    

    try {
      const popoverDetails = await this.popoverController.create({
        component: ReferenceCardComponent,
        componentProps: {pageName:stringValue },
        cssClass: 'popInfoDeta',
        translucent: true,
        showBackdrop: true,
        animated: true,
      });

      this.popoverClose = this.global.popoverclose.subscribe(data => {
        popoverDetails.dismiss();
      })

      // this.familyDetailsClose = this.global.familyInfoclose.subscribe(data => {
      //   if (data) {
      //     for (let value in this.familyDetails.controls) {
      //       if (data.hasOwnProperty(value)) {
      //         this.familyDetails.get(value).setValue(data[value]);
      //       }
      //     }
      //     popoverDetails.dismiss();
      //   }
      // })

      return await popoverDetails.present();

    } catch (error) {
      // this.errorLogService.errorLog(new Error(JSON.stringify(error)));

    }



  }


}
