import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: number): string {
    if (isNaN(value)) {
      return 'N/A';
    }

    const abbreviations = ['K', 'M', 'B', 'T'];

    if (value < 1000) {
      return value.toString();
    }

    let index = -1;
    do {
      value /= 1000;
      index++;
    } while (value >= 1000 && index < abbreviations.length - 1);

    // Round to one decimal point if necessary
    value = Math.round(value * 10) / 10;

    return value + abbreviations[index];
  }
}
