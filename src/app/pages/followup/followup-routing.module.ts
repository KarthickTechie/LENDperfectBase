import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FollowupPage } from './followup.page';

const routes: Routes = [
  {
    path: '',
    component: FollowupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FollowupPageRoutingModule {}
