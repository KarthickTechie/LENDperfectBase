import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MontlyfinancialPage } from './montlyfinancial.page';

const routes: Routes = [
  {
    path: '',
    component: MontlyfinancialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MontlyfinancialPageRoutingModule {}
