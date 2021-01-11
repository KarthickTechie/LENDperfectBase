import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProspectiveDetailsPage } from './prospective-details.page';

const routes: Routes = [
  {
    path: '',
    component: ProspectiveDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProspectiveDetailsPageRoutingModule {}
