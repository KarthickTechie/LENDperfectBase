import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'newapp',
    loadChildren: () => import('./newapplicant/app-dashboard/app-dashboard.module').then(m => m.AppDashboardPageModule)
  },
  {
    path: 'existapp',
    loadChildren: () => import('./existing-application/existing-application.module').then(m => m.ExistingApplicationPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then(m => m.SettingPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
