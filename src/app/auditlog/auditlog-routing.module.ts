import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuditlogPage } from './auditlog.page';

const routes: Routes = [
  {
    path: '',
    component: AuditlogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuditlogPageRoutingModule {}
