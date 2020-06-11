import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LanguagePageRoutingModule } from './language-routing.module';

import { LanguagePage } from './language.page';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LanguagePageRoutingModule,
    TranslateModule
  ],
  declarations: [LanguagePage]
})
export class LanguagePageModule { }
