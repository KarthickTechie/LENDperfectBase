import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExistingApplicationDetailsPage } from './existing-application-details.page';

const routes: Routes = [
  {
    path: '',
    component: ExistingApplicationDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExistingApplicationDetailsPageRoutingModule {}
