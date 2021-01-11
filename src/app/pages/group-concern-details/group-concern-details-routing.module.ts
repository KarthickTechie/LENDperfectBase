import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupConcernDetailsPage } from './group-concern-details.page';

const routes: Routes = [
  {
    path: '',
    component: GroupConcernDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupConcernDetailsPageRoutingModule {}
