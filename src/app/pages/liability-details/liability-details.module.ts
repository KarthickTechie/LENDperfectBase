import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiabilityDetailsPageRoutingModule } from './liability-details-routing.module';

import { LiabilityDetailsPage } from './liability-details.page';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LiabilityDetailsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LiabilityDetailsPage],
  exports:[ReactiveFormsModule, FormsModule],

})
export class LiabilityDetailsPageModule {}
