import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyValue'
})
export class KeyValuePipe implements PipeTransform {
  transform(value, args: string[]): any {
    let keys = [];
    if (value) {
      for (let key in value) {
        if (key.indexOf('/') !== -1) {
          let tempKey = '';
          let keysArr = key.split('/');
          if (keysArr[0] != '') {
            for (let i = 1; i < keysArr.length; i++) {
              if (tempKey == '') {
                tempKey = tempKey + keysArr[i];
              } else {
                tempKey = tempKey + '/' + keysArr[i];
              }
            }
          } else {
            for (let i = 2; i < keysArr.length; i++) {
              if (tempKey == '') {
                tempKey = tempKey + keysArr[i];
              } else {
                tempKey = tempKey + '/' + keysArr[i];
              }
            }
          }
          keys.push({ key: tempKey, value: value[key] });
        } else {
          keys.push({ key: key, value: value[key] });
        }
      }
    }
    return keys;
  }
}
