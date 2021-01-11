import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QueryinboxPage } from './queryinbox.page';

const routes: Routes = [
  {
    path: '',
    component: QueryinboxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QueryinboxPageRoutingModule {}
