import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExistingApplicationDetailsPageRoutingModule } from './existing-application-details-routing.module';

import { ExistingApplicationDetailsPage } from './existing-application-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExistingApplicationDetailsPageRoutingModule
  ],
  declarations: [ExistingApplicationDetailsPage]
})
export class ExistingApplicationDetailsPageModule {}
