import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(items: any, filter: any): any {
    console.log(items,"item");
    console.log(filter,"filter");
    if (!items || !filter || filter == 'A') {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    console.log(items.filter(item => item.submitStatus === filter),"filttttttttter");
    return items.filter(item => item.submitStatus === filter);
  }

}
