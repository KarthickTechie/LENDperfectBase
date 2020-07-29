import { NgControl } from '@angular/forms';
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[UpperCase]'
})
export class UpperCaseDirective {

  constructor(private ngControl: NgControl) { }
  @HostListener('input', ['$event']) onKeyUp(event) {
    var start = event.target['selectionStart'];
    var end = event.target['selectionEnd'];
    event.target['value'] = event.target['value'].toUpperCase();
    event.target.setSelectionRange(start, end);
  }
}
