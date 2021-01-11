import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckeligibilityPageRoutingModule } from './checkeligibility-routing.module';

import { CheckeligibilityPage } from './checkeligibility.page';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckeligibilityPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CheckeligibilityPage]
})
export class CheckeligibilityPageModule {}
