import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppDashboardPage } from './app-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: AppDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppDashboardPageRoutingModule { }
