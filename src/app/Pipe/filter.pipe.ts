import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  // transform(value: any, searchTearm:any): any {
  //   debugger;
  //   // if(value.length >= 0){
  //   //   return value;
  //   // }else{
  //   return value.filter(function(search){
  //     return search.age;
  //   })
  // // }
  // }

   transform(value: any, searchTearm:any): any {
     debugger
    console.log(searchTearm);
    console.log(value);
    // var p= searchTearm ? value.filter(person => person.age >=searchTearm):value;
    return searchTearm ? value.filter(person => person.age >=searchTearm):value;
    // console.log(p);
   }



}
