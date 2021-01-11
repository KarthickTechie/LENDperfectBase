import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes,ExtraOptions } from '@angular/router';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },

  {
    path: 'existapp',
    loadChildren: () => import('./pages/existing/existing.module').then(m => m.ExistingPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'gallery',
    loadChildren: () => import('./pages/viewgallery/viewgallery.module').then(m => m.ViewgalleryPageModule)
  },
  {
    path: 'existingdetails',
    loadChildren: () => import('./pages/existingdetails/existingdetails.module').then(m => m.ExistingdetailsPageModule)
  },
  {
    path: 'newapp',
    loadChildren: () => import('./pages/applicationdetails/applicationdetails.module').then(m => m.ApplicationdetailsPageModule)
  },
  {
    path: 'productdetails',
    loadChildren: () => import('./pages/productdetails/productdetails.module').then(m => m.ProductdetailsPageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./pages/otp/otp.module').then(m => m.OtpPageModule)
  },
  {
    path: 'newapplication',
    loadChildren: () => import('./pages/new-application/new-application.module').then( m => m.NewApplicationPageModule)
  },
  {
    path: 'borrowerdetails',
    loadChildren: () => import('./pages/borrower-details/borrower-details.module').then( m => m.BorrowerDetailsPageModule)
  },
  {
    path: 'additionaldetails',
    loadChildren: () => import('./pages/additional-details/additional-details.module').then( m => m.AdditionalDetailsPageModule)
  },
  {
    path: 'prospectivelead',
    loadChildren: () => import('./pages/prospective-lead/prospective-lead.module').then( m => m.ProspectiveLeadPageModule)
  },
  {
    path: 'groupconcerndetails',
    loadChildren: () => import('./pages/group-concern-details/group-concern-details.module').then( m => m.GroupConcernDetailsPageModule)
  },
  {
    path: 'referencedetails',
    loadChildren: () => import('./pages/referencedetails/referencedetails.module').then( m => m.ReferencedetailsPageModule)
  },
  {
    path: 'montlyfinancial',
    loadChildren: () => import('./pages/montlyfinancial/montlyfinancial.module').then( m => m.MontlyfinancialPageModule)
  },
  {
    path: 'masterupdate',
    loadChildren: () => import('./pages/masterupdate/masterupdate.module').then( m => m.MasterupdatePageModule)
  },
  {
    path: 'bureau',
    loadChildren: () => import('./pages/bureau/bureau.module').then( m => m.BureauPageModule)
  },
  {
    path: 'fullapplicationview',
    loadChildren: () => import('./pages/fullapplicationview/fullapplicationview.module').then( m => m.FullapplicationviewPageModule)
  },
  {
    path: 'reallocation',
    loadChildren: () => import('./pages/reallocation/reallocation.module').then( m => m.ReallocationPageModule)
  },
  {
    path: 'queryinbox',
    loadChildren: () => import('./pages/queryinbox/queryinbox.module').then( m => m.QueryinboxPageModule)
  },
  {
    path: 'receivedapplication',
    loadChildren: () => import('./pages/receivedapplication/receivedapplication.module').then( m => m.ReceivedapplicationPageModule)
  },
  {
    path: 'followup',
    loadChildren: () => import('./pages/followup/followup.module').then( m => m.FollowupPageModule)
  },
  {
    path: 'prospectivedetails',
    loadChildren: () => import('./pages/prospective-details/prospective-details.module').then( m => m.ProspectiveDetailsPageModule)
  },
  {
    path: 'networth',
    loadChildren: () => import('./pages/net-worth/net-worth.module').then( m => m.NetWorthPageModule)
  },
  {
    path: 'personalinformation',
    loadChildren: () => import('./pages/personal-information/personal-information.module').then( m => m.PersonalInformationPageModule)
  },
  {
    path: 'homescreen',
    loadChildren: () => import('./pages/homescreen/homescreen.module').then( m => m.HomescreenPageModule)
  },
  {
    path: 'otherdocuments',
    loadChildren: () => import('./pages/otherdocuments/otherdocuments.module').then( m => m.OtherdocumentsPageModule)
  },
  {
    path: 'checkeligibility',
    loadChildren: () => import('./pages/checkeligibility/checkeligibility.module').then( m => m.CheckeligibilityPageModule)
  },
  {
    path: 'preinspection',
    loadChildren: () => import('./pages/preinspection/preinspection.module').then( m => m.PreinspectionPageModule)
  },
  {
    path: 'assetdetails',
    loadChildren: () => import('./pages/asset-details/asset-details.module').then( m => m.AssetDetailsPageModule)
  },
  {
    path: 'liabilitydetails',
    loadChildren: () => import('./pages/liability-details/liability-details.module').then( m => m.LiabilityDetailsPageModule)
  },
  {
    path: 'assetform',
    loadChildren: () => import('./pages/asset-form/asset-form.module').then( m => m.AssetFormPageModule)
  },
  {
    path: 'movableforms',
    loadChildren: () => import('./pages/movable-forms/movable-forms.module').then( m => m.MovableFormsPageModule)
  },
  {
    path: 'auditlog',
    loadChildren: () => import('./pages/auditlog/auditlog.module').then( m => m.AuditlogPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
