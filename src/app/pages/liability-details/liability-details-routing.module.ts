import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiabilityDetailsPage } from './liability-details.page';

const routes: Routes = [
  {
    path: '',
    component: LiabilityDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiabilityDetailsPageRoutingModule {}
