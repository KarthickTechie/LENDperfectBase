import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReferencedetailsPage } from './referencedetails.page';

const routes: Routes = [
  {
    path: '',
    component: ReferencedetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferencedetailsPageRoutingModule {}
