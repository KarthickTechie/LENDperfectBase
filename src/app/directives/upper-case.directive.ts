import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[UpperCase]'
})
export class UpperCaseDirective {

  constructor(private ngControl: NgControl) { }
  @HostListener('input', ['$event']) onKeyUp(event) {
    console.log('dirrrrrrrrrrrrrrrrrrr');
    var start = event.target['selectionStart'];
    var end = event.target['selectionEnd'];
    event.target['value'] = event.target['value'].toUpperCase();
    event.target.setSelectionRange(start, end);
  }
}
