import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExistingdetailsPage } from './existingdetails.page';

const routes: Routes = [
  {
    path: '',
    component: ExistingdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExistingdetailsPageRoutingModule {}
