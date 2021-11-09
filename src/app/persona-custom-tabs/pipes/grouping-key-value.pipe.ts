/********************************************************* {COPYRIGHT-TOP} ***
 * IBM Confidential
 * OCO Source Materials
 * 5725-E59
 *
 * (C) Copyright IBM Corp. 2019 All Rights Reserved.
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 ********************************************************** {COPYRIGHT-END} **/
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupKeyValue'
})
export class GroupKeyValuePipe implements PipeTransform {
  transform(value, args: string[]): any {
    let keys = [];
    if (value) {
      // tslint:disable-next-line:forin
      for (let key in value) {
        let keysArr = key.split('/');
        keysArr.forEach(element => {
          if (element.indexOf('#') !== -1) {
            let keysArr1: string[] = key.split('#');
            let resultKeyAttr: string[] = keysArr1[1].split('/');
            if (resultKeyAttr.length > 1) {
              keys.push({
                key: element + '-' + resultKeyAttr[1],
                value: value[key]
              });
            }
          }
        });
      }
      return keys;
    }
  }
}
