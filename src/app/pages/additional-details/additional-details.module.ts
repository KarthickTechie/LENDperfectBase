import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdditionalDetailsPageRoutingModule } from './additional-details-routing.module';

import { AdditionalDetailsPage } from './additional-details.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdditionalDetailsPageRoutingModule
  ],
  declarations: [AdditionalDetailsPage]
})
export class AdditionalDetailsPageModule {}
