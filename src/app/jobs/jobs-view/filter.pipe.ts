import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
  transform(value: any, filterString:string, propName: string, filterString1: string, propName1: string):any{
    if(value.length===0 || (filterString==='' && filterString1 ==='')){
      return value;
    }
    const resultArray= [];
    for(const item of value){
      if(filterString!=='' && filterString1!==''){

      if(item[propName].includes(filterString) && item[propName1].includes(filterString1)){
        resultArray.push(item);
      }

    }
    else if(filterString!=='' && filterString1===''){
      if(item[propName].includes(filterString)){
        resultArray.push(item);
      }
    }
    else if(filterString==='' && filterString1!==''){
      if(item[propName1].includes(filterString1)){
        resultArray.push(item);
      }
    }
  }
    return resultArray;
  }
}

