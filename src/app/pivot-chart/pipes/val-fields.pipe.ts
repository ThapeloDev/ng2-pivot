import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valFields'
})
export class ValFieldsPipe implements PipeTransform {

  constructor(){ }

  transform(value: any, ...args: any[]): any {
    let valFields = [];
    for(let field of value){
      let sequen = args[0];
      if(field.sequen == sequen)
        valFields.push(field);
    }
    return valFields;
  }

}
