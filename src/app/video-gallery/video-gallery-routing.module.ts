import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoGalleryPage } from './video-gallery.page';

const routes: Routes = [
  {
    path: '',
    component: VideoGalleryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoGalleryPageRoutingModule {}
