import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BureauPageRoutingModule } from './bureau-routing.module';

import { BureauPage } from './bureau.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BureauPageRoutingModule
  ],
  declarations: [BureauPage]
})
export class BureauPageModule {}
