import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BureauPage } from './bureau.page';

const routes: Routes = [
  {
    path: '',
    component: BureauPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BureauPageRoutingModule {}
