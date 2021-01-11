import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExistingPageRoutingModule } from './existing-routing.module';

import { ExistingPage } from './existing.page';

import { ListviewComponent } from './../../component/listview/listview.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExistingPageRoutingModule
  ],
  declarations: [ExistingPage,ListviewComponent],
  entryComponents: [ListviewComponent]
})
export class ExistingPageModule { }
