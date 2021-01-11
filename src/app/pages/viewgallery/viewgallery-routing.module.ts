import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewgalleryPage } from './viewgallery.page';

const routes: Routes = [
  {
    path: '',
    component: ViewgalleryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewgalleryPageRoutingModule {}
