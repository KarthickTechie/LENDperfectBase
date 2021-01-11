import { DirectivesModule } from './../../directives/directives.module';
import { OtpcheckComponent } from './../../component/otpcheck/otpcheck.component';
import { ExpandableComponent } from './../../component/expandable/expandable.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalInformationPageRoutingModule } from './personal-information-routing.module';

import { PersonalInformationPage } from './personal-information.page';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalInformationPageRoutingModule,
    ReactiveFormsModule,
    DirectivesModule
    
  ],
  declarations: [PersonalInformationPage,ExpandableComponent,OtpcheckComponent],
  entryComponents: [OtpcheckComponent],
  exports:[ReactiveFormsModule, FormsModule],
})
export class PersonalInformationPageModule {}
