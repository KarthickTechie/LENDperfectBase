import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuditlogPageRoutingModule } from './auditlog-routing.module';

import { AuditlogPage } from './auditlog.page';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AuditlogPageRoutingModule
  ],
  declarations: [AuditlogPage]
})
export class AuditlogPageModule {}
