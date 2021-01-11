import { ReferenceCardComponent } from './../../component/reference-card/reference-card.component';
import { Subscription } from 'rxjs';
import { GlobalService } from './../../providers/global.service';
import { PopoverController } from '@ionic/angular';
import { MasterService } from './../../providers/master.service';
import { FormGroup } from '@angular/forms';
import { FormcontrolService } from './../../providers/formcontrol.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-concern-details',
  templateUrl: './group-concern-details.page.html',
  styleUrls: ['./group-concern-details.page.scss'],
})
export class GroupConcernDetailsPage implements OnInit {
concernDetails:FormGroup;
constitutionList:any;
concernRecords:any[] = [{nameofAssCon:'KPJ Properties and Lands',constitution:'individual',addOfAssCon:'45,MM road, Gunidy, Chennai-38'}];
popoverClose: Subscription;

  constructor(public formctrl: FormcontrolService,public master: MasterService,public popoverController:PopoverController,
    public global:GlobalService) { }

  ngOnInit() {
    this.concernDetails = this.formctrl.groupConcern();
    this.constitutionList = this.master.getConstitutionList();

  }
  concernDetailsSave(value){
    this.concernRecords.push(value);
    this.concernDetails.reset();

    console.log(this.concernRecords,"aaaaaaaa");

  }
  editConcern(data){
    for (let value in this.concernDetails.controls) {
      if (data.hasOwnProperty(value)) {
        this.concernDetails.get(value).setValue(data[value]);
      }
    }
  }


  async viewConcernDetails(ev,stringValue){
    

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
