import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SUPER_EXPR } from '@angular/compiler/src/output/output_ast';

@Pipe({
  name: 'dateTimeFormat'
})
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
 
      return super.transform(value, args[0]);

  }

}
