import { NgModule } from '@angular/core';

import { LogoPageRoutingModule } from './logo-routing.module';

import { LogoPage } from './logo.page';
import { LogoDirective } from './logo.directive';
import { ShareModule } from '../share.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    ShareModule,
    LogoPageRoutingModule,
    TranslateModule
  ],
  declarations: [LogoPage, LogoDirective]
})
export class LogoPageModule { }
