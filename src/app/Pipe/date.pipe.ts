import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class FilterPipe implements PipeTransform {
    transform(value: any, searchTearm:any): any {
        debugger
       console.log(searchTearm);
       console.log(value);
       // var p= searchTearm ? value.filter(person => person.age >=searchTearm):value;
       return searchTearm ? value.filter(person => person.birthdate >=searchTearm):value;
       // console.log(p);
      }
   
   
   
   }
   