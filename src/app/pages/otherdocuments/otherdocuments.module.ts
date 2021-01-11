import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtherdocumentsPageRoutingModule } from './otherdocuments-routing.module';

import { OtherdocumentsPage } from './otherdocuments.page';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtherdocumentsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [OtherdocumentsPage]
})
export class OtherdocumentsPageModule {}
