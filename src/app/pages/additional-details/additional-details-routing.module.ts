import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdditionalDetailsPage } from './additional-details.page';

const routes: Routes = [
  {
    path: '',
    component: AdditionalDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdditionalDetailsPageRoutingModule {}
