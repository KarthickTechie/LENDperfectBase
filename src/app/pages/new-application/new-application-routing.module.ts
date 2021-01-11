import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewApplicationPage } from './new-application.page';

const routes: Routes = [
  {
    path: '',
    component: NewApplicationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewApplicationPageRoutingModule {}
