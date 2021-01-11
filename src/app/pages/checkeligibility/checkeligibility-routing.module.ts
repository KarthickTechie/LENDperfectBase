import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckeligibilityPage } from './checkeligibility.page';

const routes: Routes = [
  {
    path: '',
    component: CheckeligibilityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckeligibilityPageRoutingModule {}
