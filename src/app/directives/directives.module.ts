import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberOnlyDirective } from './number-only.directive';
import { UpperCaseDirective } from './upper-case.directive'
@NgModule({
    declarations: [NumberOnlyDirective, UpperCaseDirective],
    imports: [CommonModule],
    exports: [NumberOnlyDirective, UpperCaseDirective]
})
export class DirectivesModule { }
