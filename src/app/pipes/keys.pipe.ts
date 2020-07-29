import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'keys',
  pure: false,
})

export class KeysPipe implements PipeTransform {

  transform(value): any {
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

    for (var i = 0; i < keys.length; i++) {
      if (keys[i].key == 'enable') {
        keys.splice(i, 1);
        break;
      }
    }
    return keys;
  }
}
