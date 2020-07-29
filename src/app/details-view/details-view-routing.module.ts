import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsViewPage } from './details-view.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsViewPageRoutingModule {}
