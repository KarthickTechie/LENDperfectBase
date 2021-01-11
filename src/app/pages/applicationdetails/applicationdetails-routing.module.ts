import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationdetailsPage } from './applicationdetails.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicationdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationdetailsPageRoutingModule {}
