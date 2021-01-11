import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewgalleryPageRoutingModule } from './viewgallery-routing.module';

import { ViewgalleryPage } from './viewgallery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewgalleryPageRoutingModule
  ],
  declarations: [ViewgalleryPage]
})
export class ViewgalleryPageModule {}
