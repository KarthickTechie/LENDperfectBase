import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductdetailsPageRoutingModule } from './productdetails-routing.module';

import { ProductdetailsPage } from './productdetails.page';

import { FormcontrolService } from './../../providers/formcontrol.service';
import { ReactiveFormsModule } from "@angular/forms";
import { OtpcheckComponent } from './../../component/otpcheck/otpcheck.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProductdetailsPageRoutingModule
  ],
  declarations: [ProductdetailsPage],
  providers: [FormcontrolService],
  entryComponents: [OtpcheckComponent]

})
export class ProductdetailsPageModule { }
