import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FollowupPageRoutingModule } from './followup-routing.module';

import { FollowupPage } from './followup.page';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FollowupPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FollowupPage]
})
export class FollowupPageModule {}
