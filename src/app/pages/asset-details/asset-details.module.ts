import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssetDetailsPageRoutingModule } from './asset-details-routing.module';

import { AssetDetailsPage } from './asset-details.page';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssetDetailsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AssetDetailsPage],
  exports:[ReactiveFormsModule, FormsModule],

})
export class AssetDetailsPageModule {}
