import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReallocationPageRoutingModule } from './reallocation-routing.module';

import { ReallocationPage } from './reallocation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReallocationPageRoutingModule
  ],
  declarations: [ReallocationPage]
})
export class ReallocationPageModule {}
