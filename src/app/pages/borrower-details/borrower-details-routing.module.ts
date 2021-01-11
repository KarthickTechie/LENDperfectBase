import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BorrowerDetailsPage } from './borrower-details.page';

const routes: Routes = [
  {
    path: '',
    component: BorrowerDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BorrowerDetailsPageRoutingModule {}
