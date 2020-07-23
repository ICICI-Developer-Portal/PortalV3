import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nestedListFilterPipe'
})
export class NestedListFilterPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
