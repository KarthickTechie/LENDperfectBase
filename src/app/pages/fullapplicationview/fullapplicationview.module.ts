import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FullapplicationviewPageRoutingModule } from './fullapplicationview-routing.module';

import { FullapplicationviewPage } from './fullapplicationview.page';
import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FullapplicationviewPageRoutingModule,
    PipesModule
  ],
  declarations: [FullapplicationviewPage]
})
export class FullapplicationviewPageModule {}
