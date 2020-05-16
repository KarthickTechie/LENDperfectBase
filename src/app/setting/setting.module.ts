import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ColorPickerModule } from "ngx-color-picker";

import { SettingPageRoutingModule } from './setting-routing.module';
import { SettingPage } from './setting.page';
import { AlertComponent } from './alert/alert.component';

import { ShareModule } from './share.module';
import { AlertPage } from './alert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ColorPickerModule,
    IonicModule,
    ShareModule,
    SettingPageRoutingModule
  ],
  providers: [AlertPage],
  declarations: [SettingPage, AlertComponent],
  entryComponents: [AlertComponent],
})
export class SettingPageModule { }
