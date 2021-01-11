import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReferencedetailsPageRoutingModule } from './referencedetails-routing.module';

import { ReferencedetailsPage } from './referencedetails.page';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReferencedetailsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ReferencedetailsPage]
})
export class ReferencedetailsPageModule {}
