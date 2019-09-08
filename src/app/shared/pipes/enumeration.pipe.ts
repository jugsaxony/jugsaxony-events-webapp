import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'enumeration' })
export class EnumerationPipe implements PipeTransform {
    transform(value: string[]): string {
        if (value == null || value.length === 0) {
            return '';
        }
        if (value.length === 1) {
            return value[0];
        }
        return value.slice(0, -1).join(', ') + ' und ' + value[value.length - 1];
    }
}
