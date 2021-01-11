import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NetWorthPageRoutingModule } from './net-worth-routing.module';

import { NetWorthPage } from './net-worth.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NetWorthPageRoutingModule
  ],
  declarations: [NetWorthPage]
})
export class NetWorthPageModule {}
