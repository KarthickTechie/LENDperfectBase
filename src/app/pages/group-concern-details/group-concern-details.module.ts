import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupConcernDetailsPageRoutingModule } from './group-concern-details-routing.module';

import { GroupConcernDetailsPage } from './group-concern-details.page';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupConcernDetailsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [GroupConcernDetailsPage]
})
export class GroupConcernDetailsPageModule {}
