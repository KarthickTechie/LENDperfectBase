import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ThemePageRoutingModule } from './theme-routing.module';

import { ThemePage } from './theme.page';
import { ColorPickerModule } from "ngx-color-picker";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColorPickerModule,
    ReactiveFormsModule,
    ThemePageRoutingModule
  ],
  declarations: [ThemePage]
})
export class ThemePageModule { }
