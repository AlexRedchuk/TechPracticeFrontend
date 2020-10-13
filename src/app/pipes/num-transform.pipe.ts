import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numTransform'
})
export class NumTransformPipe implements PipeTransform {

  transform(num: number): string {
    let transformed: string;
    const numLeft = num % 1000;
    let numbertoAdd = '';
    if  (numLeft < 100 && numLeft > 10 ) {
      numbertoAdd = '0' + numLeft.toFixed(0);
    }
    else if (numLeft <= 10) {
      numbertoAdd = '00' + numLeft
      .toFixed(0);
    }
    else {
      numbertoAdd = numLeft.toFixed(0).toString();
    }
    transformed = Math.trunc(num / 1000) + ' ' + numbertoAdd ;
    return transformed;
  }

}
