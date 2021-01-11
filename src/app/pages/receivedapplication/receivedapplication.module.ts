import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceivedapplicationPageRoutingModule } from './receivedapplication-routing.module';

import { ReceivedapplicationPage } from './receivedapplication.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceivedapplicationPageRoutingModule
  ],
  declarations: [ReceivedapplicationPage]
})
export class ReceivedapplicationPageModule {}
