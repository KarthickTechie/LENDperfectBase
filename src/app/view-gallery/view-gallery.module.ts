import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewGalleryPageRoutingModule } from './view-gallery-routing.module';

import { ViewGalleryPage } from './view-gallery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewGalleryPageRoutingModule
  ],
  declarations: [ViewGalleryPage]
})
export class ViewGalleryPageModule {}
