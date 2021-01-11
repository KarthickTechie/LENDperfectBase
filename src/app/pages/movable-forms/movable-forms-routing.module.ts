import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovableFormsPage } from './movable-forms.page';

const routes: Routes = [
  {
    path: '',
    component: MovableFormsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovableFormsPageRoutingModule {}
