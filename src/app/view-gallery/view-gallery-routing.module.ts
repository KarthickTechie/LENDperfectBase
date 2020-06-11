import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewGalleryPage } from './view-gallery.page';

const routes: Routes = [
  {
    path: '',
    component: ViewGalleryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewGalleryPageRoutingModule {}
