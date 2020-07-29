import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoGalleryPageRoutingModule } from './video-gallery-routing.module';

import { VideoGalleryPage } from './video-gallery.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoGalleryPageRoutingModule,

  ],
  declarations: [VideoGalleryPage]
})
export class VideoGalleryPageModule { }
