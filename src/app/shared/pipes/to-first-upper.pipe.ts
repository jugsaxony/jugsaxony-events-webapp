import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'toFirstUpper',
    pure: false
})
export class ToFirstUpperPipe implements PipeTransform {

    constructor() { }

    transform(value: string): string {
        if (value === null || value.length === 0) {
            return value;
        } else {
            return value.substr(0, 1).toUpperCase() + value.substr(1);
        }
    }
}
