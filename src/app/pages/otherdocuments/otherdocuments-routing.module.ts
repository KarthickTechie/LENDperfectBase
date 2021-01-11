import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherdocumentsPage } from './otherdocuments.page';

const routes: Routes = [
  {
    path: '',
    component: OtherdocumentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherdocumentsPageRoutingModule {}
