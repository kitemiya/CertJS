import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
@Injectable()
export class FilterPipe implements PipeTransform {
  transform(items: any[], key: string, value: string): any[] {
    if (!items) {
      return [];
    }
    if (!key || !value) {
      return items;
    }

    return items.filter(singleItem =>
      singleItem[key].toLowerCase().includes(value.toLowerCase())
    );
  }
}
