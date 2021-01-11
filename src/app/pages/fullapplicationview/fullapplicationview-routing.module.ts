import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullapplicationviewPage } from './fullapplicationview.page';

const routes: Routes = [
  {
    path: '',
    component: FullapplicationviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullapplicationviewPageRoutingModule {}
