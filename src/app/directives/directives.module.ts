import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpperCaseDirective } from './upper-case.directive'
@NgModule({
    declarations: [ UpperCaseDirective],
    imports: [CommonModule],
    exports: [UpperCaseDirective]
})
export class DirectivesModule { }