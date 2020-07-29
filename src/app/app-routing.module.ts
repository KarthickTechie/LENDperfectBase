import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule) },
  {
    path: 'newapp', loadChildren: () => import('./newapplicant/app-dashboard.module').then(m => m.AppDashboardPageModule)
  },
  // {
  //   path: 'dashboard',
  //   children: [{
  //     path: "",
  //     loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule),
  //   },
  //   {
  //     path: 'newapp',
  //     loadChildren: () => import('./newapplicant/app-dashboard.module').then(m => m.AppDashboardPageModule)
  //   }
  //   ]
  // },

  {
    path: 'existapp',
    loadChildren: () => import('./existing-application/existing-application.module').then(m => m.ExistingApplicationPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then(m => m.SettingPageModule)
  },
  {
    path: 'document-upload',
    loadChildren: () => import('./document-upload/document-upload.module').then(m => m.DocumentUploadPageModule)
  },
  {
    path: 'auditlog',
    loadChildren: () => import('./auditlog/auditlog.module').then(m => m.AuditlogPageModule)
  },
  {
    path: 'gallery',
    loadChildren: () => import('./view-gallery/view-gallery.module').then(m => m.ViewGalleryPageModule)
  },
  {
    path: 'existappdetails',
    loadChildren: () => import('./existing-application-details/existing-application-details.module').then(m => m.ExistingApplicationDetailsPageModule)
  },
  {
    path: 'video',
    loadChildren: () => import('./video-gallery/video-gallery.module').then(m => m.VideoGalleryPageModule)
  },
  {
    path: 'detailsview',
    loadChildren: () => import('./details-view/details-view.module').then( m => m.DetailsViewPageModule)
  },
  {
    path: 'cibilcheck',
    loadChildren: () => import('./cibil-check/cibil-check.module').then( m => m.CibilCheckPageModule)
  },
 {
    path: 'backup',
    loadChildren: () => import('./backup/backup.module').then( m => m.BackupPageModule)
  },
  {
    path: 'sync',
    loadChildren: () => import('./sync/sync.module').then( m => m.SyncPageModule)
}



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
