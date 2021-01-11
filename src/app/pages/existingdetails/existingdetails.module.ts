import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExistingdetailsPageRoutingModule } from './existingdetails-routing.module';

import { ExistingdetailsPage } from './existingdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExistingdetailsPageRoutingModule
  ],
  declarations: [ExistingdetailsPage]
})
export class ExistingdetailsPageModule {}
