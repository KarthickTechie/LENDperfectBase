import { OtpcheckComponent } from './../../component/otpcheck/otpcheck.component';
import { FormcontrolService } from './../../providers/formcontrol.service';
import { PersonalComponent } from './../../component/personal/personal.component';
import { KycdetailsComponent } from './../../component/kycdetails/kycdetails.component';
import { ApplicantdetailsComponent } from './../../component/applicantdetails/applicantdetails.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicationdetailsPageRoutingModule } from './applicationdetails-routing.module';

import { ApplicationdetailsPage } from './applicationdetails.page';

import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ApplicationdetailsPageRoutingModule
  ],
  declarations: [ApplicationdetailsPage, ApplicantdetailsComponent, KycdetailsComponent, PersonalComponent],
  entryComponents: [],
  providers: [FormcontrolService]
})
export class ApplicationdetailsPageModule { }
