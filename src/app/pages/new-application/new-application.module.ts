import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewApplicationPageRoutingModule } from './new-application-routing.module';

import { NewApplicationPage } from './new-application.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewApplicationPageRoutingModule
  ],
  declarations: [NewApplicationPage]
})
export class NewApplicationPageModule {}
