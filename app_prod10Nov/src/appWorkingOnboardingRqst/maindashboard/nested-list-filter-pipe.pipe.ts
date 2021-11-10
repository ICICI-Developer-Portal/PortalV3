import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nestedListFilterPipe'
})
export class NestedListFilterPipePipe implements PipeTransform {
 
  transform(responseData: any, term: any): any {
console.log(responseData,"reached");
    //check if search term is undefined
    if(term === undefined) {
     
      return responseData;
    } 
    //return updates responseData array
    return responseData.filter(function(thisresponseData){
      console.log(thisresponseData)
      console.log(thisresponseData.name.toLowerCase().includes(term.toLowerCase()))
      return thisresponseData.name.toLowerCase().includes(term.toLowerCase());
    }) 

  }

}
