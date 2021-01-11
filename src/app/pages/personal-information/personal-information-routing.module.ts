import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalInformationPage } from './personal-information.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalInformationPageRoutingModule {}
