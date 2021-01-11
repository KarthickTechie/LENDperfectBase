import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProspectiveDetailsPageRoutingModule } from './prospective-details-routing.module';

import { ProspectiveDetailsPage } from './prospective-details.page';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProspectiveDetailsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ProspectiveDetailsPage]
})
export class ProspectiveDetailsPageModule {}
