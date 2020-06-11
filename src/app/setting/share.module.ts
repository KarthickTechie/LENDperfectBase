import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AlertDirective } from './alert.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [AlertDirective],
  exports: [
    AlertDirective,
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class ShareModule { }
