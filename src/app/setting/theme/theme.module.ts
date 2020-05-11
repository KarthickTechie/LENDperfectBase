import { NgModule } from '@angular/core';

import { ColorPickerModule } from "ngx-color-picker";
import { ThemePageRoutingModule } from './theme-routing.module';
import { ThemePage } from './theme.page';
import { ShareModule } from '../share.module';

@NgModule({
  imports: [
    ColorPickerModule,
    ShareModule,
    ThemePageRoutingModule
  ],
  declarations: [ThemePage]
})
export class ThemePageModule { }
