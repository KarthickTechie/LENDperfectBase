import { GalleryDirective } from './gallery.directive';
import { GalleryViewComponent } from './gallery-view/gallery-view.component';
import { DocViewComponent } from './doc-view/doc-view.component';
import { DocumentUploadPageModule } from './../document-upload/document-upload.module';
import { ProgressBarDirective } from './../document-upload/progress-bar.directive';
import { DocumentUploaderComponent } from './document-uploader/document-uploader.component';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { IncomeDetailsComponent } from './income-details/income-details.component';
import { KycDetailsComponent } from './kyc-details/kyc-details.component';
import { LoanDetailsComponent } from './loan-details/loan-details.component';
import { FormControlData } from '../newapplicant/formcontrol';
import { KycScanOptionComponent } from './kyc-scan-option/kyc-scan-option.component';



@NgModule({

    declarations: [
        PersonalDetailsComponent,
        IncomeDetailsComponent,
        KycDetailsComponent,
        LoanDetailsComponent,
        KycScanOptionComponent,
        DocumentUploaderComponent,
        ProgressBarDirective,
        DocViewComponent,
        GalleryDirective,
        GalleryViewComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        ReactiveFormsModule,
        TranslateModule
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
    entryComponents: [GalleryViewComponent]
})

export class newApplicantModule { }