import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExistingApplicationPage } from './existing-application.page';

const routes: Routes = [
  {
    path: '',
    component: ExistingApplicationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExistingApplicationPageRoutingModule {}
