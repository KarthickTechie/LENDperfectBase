import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'keys',
  pure: false,
})

export class KeysPipe implements PipeTransform {

  transform(value, args: any): any {
    let keys = [];
    if (value.length) {
      for (let i = 0; i < value.length; i++) {
        Object.keys(value[i])
          .forEach(function eachKey(key) {
            keys.push({ key: key, value: value[i][key] });
          });
      }
    } else {
      Object.keys(value)
        .forEach(function eachKey(key) {
          keys.push({ key: key, value: value[key] });
        });
    }
    return keys;
  }
}
