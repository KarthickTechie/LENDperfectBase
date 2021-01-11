import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProspectiveLeadPage } from './prospective-lead.page';

const routes: Routes = [
  {
    path: '',
    component: ProspectiveLeadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProspectiveLeadPageRoutingModule {}
