import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExistingPage } from './existing.page';

const routes: Routes = [
  {
    path: '',
    component: ExistingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExistingPageRoutingModule {}
