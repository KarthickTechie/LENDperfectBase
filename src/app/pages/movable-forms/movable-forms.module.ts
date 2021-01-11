import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovableFormsPageRoutingModule } from './movable-forms-routing.module';

import { MovableFormsPage } from './movable-forms.page';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovableFormsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MovableFormsPage],
  exports:[ReactiveFormsModule, FormsModule]
})
export class MovableFormsPageModule {}
