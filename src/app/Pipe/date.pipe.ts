import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class FilterPipe implements PipeTransform {
    transform(value: any, searchTearm:any): any {
       return searchTearm ? value.filter(person => person.birthdate >=searchTearm):value;
      }
   }
   