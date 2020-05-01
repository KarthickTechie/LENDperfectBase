import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExistingApplicationPageRoutingModule } from './existing-application-routing.module';

import { ExistingApplicationPage } from './existing-application.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExistingApplicationPageRoutingModule
  ],
  declarations: [ExistingApplicationPage]
})
export class ExistingApplicationPageModule {}
