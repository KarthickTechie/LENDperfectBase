import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {
  PreviousValue:any='';
  constructor(private ngControl: NgControl) {
    console.log('Hello number Directive');
  }
  @HostListener('keyup',['$event.target.value']) removeData(value){
      // alert(value);
       var pattern = /^[0-9]*$/;
      if(value.search(pattern) == -1){
        if(value == ""){
          this.ngControl.control.setValue("");
          this.PreviousValue = "";
        }else{
          this.ngControl.control.setValue(this.PreviousValue);
        }
      }else{
         this.ngControl.control.setValue(value);
         this.PreviousValue = value;
      }
  

}
}
