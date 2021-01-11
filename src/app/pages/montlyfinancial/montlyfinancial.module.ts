import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MontlyfinancialPageRoutingModule } from './montlyfinancial-routing.module';

import { MontlyfinancialPage } from './montlyfinancial.page';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MontlyfinancialPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MontlyfinancialPage]
})
export class MontlyfinancialPageModule {}
