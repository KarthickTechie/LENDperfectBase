import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuditlogPageRoutingModule } from './auditlog-routing.module';

import { AuditlogPage } from './auditlog.page';
import {AuditManagerComponent } from '../auditManager/audit-manager/audit-manager.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AuditlogPageRoutingModule,
    TranslateModule
  ],
  declarations: [AuditlogPage,AuditManagerComponent]
})
export class AuditlogPageModule {}
