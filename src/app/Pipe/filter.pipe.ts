import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
   transform(value: any, searchTearm:any): any {
    return searchTearm ? value.filter(person => person.age >=searchTearm):value;
   }
}
