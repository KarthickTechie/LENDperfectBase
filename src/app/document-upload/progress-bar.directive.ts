import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appProgressBar]'
})
export class ProgressBarDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
