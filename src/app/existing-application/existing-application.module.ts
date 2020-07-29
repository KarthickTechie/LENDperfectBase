import { SettingPageModule } from './../setting/setting.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExistingApplicationPageRoutingModule } from './existing-application-routing.module';

import { ExistingApplicationPage } from './existing-application.page';
import { AlertPage } from '../setting/alert.page';
import { AlertComponent } from '../setting/alert/alert.component';
import { ShareModule } from './../setting/share.module';
import { StatusPipe } from './status.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { PopoverComponent } from '../popover/popover.component';
import { PopoverinfoComponent } from '../popoverinfo/popoverinfo.component';
import { PopoverdetailsComponent } from '../popoverdetails/popoverdetails.component';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ShareModule,
    IonicModule,
    ExistingApplicationPageRoutingModule,
    SettingPageModule, TranslateModule,PipesModule
  ],
  providers: [AlertPage],
  declarations: [ExistingApplicationPage, StatusPipe, PopoverComponent,PopoverinfoComponent, PopoverdetailsComponent],
  entryComponents: [PopoverComponent,PopoverinfoComponent, PopoverdetailsComponent],

})
export class ExistingApplicationPageModule { }
