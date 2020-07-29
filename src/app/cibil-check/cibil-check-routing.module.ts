import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CibilCheckPage } from './cibil-check.page';

const routes: Routes = [
  {
    path: '',
    component: CibilCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CibilCheckPageRoutingModule {}
