import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReallocationPage } from './reallocation.page';

const routes: Routes = [
  {
    path: '',
    component: ReallocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReallocationPageRoutingModule {}
