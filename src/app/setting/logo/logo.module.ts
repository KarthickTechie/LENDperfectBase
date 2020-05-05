import { NgModule } from '@angular/core';

import { LogoPageRoutingModule } from './logo-routing.module';

import { LogoPage } from './logo.page';
import { LogoDirective } from './logo.directive';
import { ShareModule } from '../share.module';

@NgModule({
  imports: [
    ShareModule,
    LogoPageRoutingModule
  ],
  declarations: [LogoPage, LogoDirective]
})
export class LogoPageModule { }
