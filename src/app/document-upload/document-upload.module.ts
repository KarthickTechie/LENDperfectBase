import { ProgressWidgetComponent } from './progress-widget/progress-widget.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentUploadPageRoutingModule } from './document-upload-routing.module';

import { DocumentUploadPage } from './document-upload.page';
import { ProgressBarDirective } from './progress-bar.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentUploadPageRoutingModule
  ],
  declarations: [DocumentUploadPage, ProgressWidgetComponent],
  entryComponents: [ProgressWidgetComponent]
})
export class DocumentUploadPageModule { }
