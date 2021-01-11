import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssetFormPageRoutingModule } from './asset-form-routing.module';

import { AssetFormPage } from './asset-form.page';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssetFormPageRoutingModule,
    ReactiveFormsModule
    
  ],
  declarations: [AssetFormPage],
  exports:[ReactiveFormsModule, FormsModule]
})
export class AssetFormPageModule {}
