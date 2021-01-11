import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterupdatePage } from './masterupdate.page';

const routes: Routes = [
  {
    path: '',
    component: MasterupdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterupdatePageRoutingModule {}
