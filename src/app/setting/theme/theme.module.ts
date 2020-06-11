import { NgModule } from '@angular/core';

import { ColorPickerModule } from "ngx-color-picker";
import { ThemePageRoutingModule } from './theme-routing.module';
import { ThemePage } from './theme.page';
import { ShareModule } from '../share.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    ColorPickerModule,
    ShareModule,
    ThemePageRoutingModule,
    TranslateModule
  ],
  declarations: [ThemePage]
})
export class ThemePageModule { }
