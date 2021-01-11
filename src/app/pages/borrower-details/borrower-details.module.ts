import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BorrowerDetailsPageRoutingModule } from './borrower-details-routing.module';

import { BorrowerDetailsPage } from './borrower-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BorrowerDetailsPageRoutingModule
  ],
  declarations: [BorrowerDetailsPage]
})
export class BorrowerDetailsPageModule {}
