import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numericVocals'
})
export class NumericVocalsPipe implements PipeTransform {

  transform(value: string): string {
    return value
      .replace(/[a,A]/g, '4')
      .replace(/[e,E]/g, '3')
      .replace(/[i,I]/g, '1')
      .replace(/[o,O]/g, '0')
      .replace(/[u,U]/g, '6');
  }

}
