import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasterupdatePageRoutingModule } from './masterupdate-routing.module';

import { MasterupdatePage } from './masterupdate.page';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasterupdatePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MasterupdatePage]
})
export class MasterupdatePageModule {}
