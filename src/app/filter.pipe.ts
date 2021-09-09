// Usage: `array | filter:value`

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], value: any): any[] {
        if (!items) { return []; }
        if (!value || value === undefined) { return items; }
        if (value) {
            return items.filter(item => item.status === value);
        }
        return items;
    }
}
