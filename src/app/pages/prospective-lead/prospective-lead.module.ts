import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProspectiveLeadPageRoutingModule } from './prospective-lead-routing.module';

import { ProspectiveLeadPage } from './prospective-lead.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProspectiveLeadPageRoutingModule
  ],
  declarations: [ProspectiveLeadPage]
})
export class ProspectiveLeadPageModule {}
