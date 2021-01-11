import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NetWorthPage } from './net-worth.page';

const routes: Routes = [
  {
    path: '',
    component: NetWorthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NetWorthPageRoutingModule {}
