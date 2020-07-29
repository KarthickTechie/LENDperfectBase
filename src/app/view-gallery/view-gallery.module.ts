import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewGalleryPageRoutingModule } from './view-gallery-routing.module';

import { ViewGalleryPage } from './view-gallery.page';
import { PinchZoomModule } from 'ngx-pinch-zoom';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewGalleryPageRoutingModule,
    PinchZoomModule
  ],
  declarations: [ViewGalleryPage]
})
export class ViewGalleryPageModule {}
