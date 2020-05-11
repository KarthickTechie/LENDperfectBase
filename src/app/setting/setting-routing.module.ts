import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingPage } from './setting.page';
import { ThemePage } from './theme/theme.page';


const routes: Routes = [
  {
    path: '',
    component: SettingPage
  },
  {
    path: 'theme',
    loadChildren: () => import('./theme/theme.module').then(m => m.ThemePageModule)
  },
  {
    path: 'logo',
    loadChildren: () => import('./logo/logo.module').then(m => m.LogoPageModule)
  },
  {
    path: 'language',
    loadChildren: () => import('./language/language.module').then( m => m.LanguagePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingPageRoutingModule { }
