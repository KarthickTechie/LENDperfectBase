import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QueryinboxPageRoutingModule } from './queryinbox-routing.module';

import { QueryinboxPage } from './queryinbox.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QueryinboxPageRoutingModule
  ],
  declarations: [QueryinboxPage]
})
export class QueryinboxPageModule {}
