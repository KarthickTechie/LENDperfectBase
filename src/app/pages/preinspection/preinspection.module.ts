import { LegendComponent } from './../../component/legend/legend.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreinspectionPageRoutingModule } from './preinspection-routing.module';

import { PreinspectionPage } from './preinspection.page';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreinspectionPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PreinspectionPage, LegendComponent],
  entryComponents: [LegendComponent]
})
export class PreinspectionPageModule { }
