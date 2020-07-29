import { DirectivesModule } from './../directives/directives.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppDashboardPageRoutingModule } from './app-dashboard-routing.module';

import { AppDashboardPage } from './app-dashboard.page';

import { TranslateModule } from '@ngx-translate/core';

import { SignatureComponent } from './signature/signature.component';
import { GalleryDirective } from './gallery.directive';
import { GalleryViewComponent } from './gallery-view/gallery-view.component';
import { DocViewComponent } from './doc-view/doc-view.component';
import { DocumentUploadPageModule } from './../document-upload/document-upload.module';
import { ProgressBarDirective } from './../document-upload/progress-bar.directive';
import { DocumentUploaderComponent } from './document-uploader/document-uploader.component';

import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { IncomeDetailsComponent } from './income-details/income-details.component';
import { KycDetailsComponent } from './kyc-details/kyc-details.component';
import { LoanDetailsComponent } from './loan-details/loan-details.component';
import { FormControlData } from '../newapplicant/formcontrol';
import { KycScanOptionComponent } from './kyc-scan-option/kyc-scan-option.component';
import { SignaturePadModule } from 'angular2-signaturepad';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppDashboardPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    SignaturePadModule,
    DirectivesModule
  ],
  declarations: [AppDashboardPage, PersonalDetailsComponent,
    IncomeDetailsComponent,
    KycDetailsComponent,
    LoanDetailsComponent,
    KycScanOptionComponent,
    DocumentUploaderComponent,
    ProgressBarDirective,
    DocViewComponent,
    GalleryDirective,
    GalleryViewComponent,
    SignatureComponent
  ],
  providers: [FormControlData],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    PersonalDetailsComponent,
    IncomeDetailsComponent,
    KycDetailsComponent,
    LoanDetailsComponent,
    KycScanOptionComponent,
    DocumentUploaderComponent
  ],
  entryComponents: [GalleryViewComponent, SignatureComponent, KycScanOptionComponent]
})
export class AppDashboardPageModule { }
