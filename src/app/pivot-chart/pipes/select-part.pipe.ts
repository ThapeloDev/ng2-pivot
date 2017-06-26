import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectPart'
})
export class SelectPartPipe implements PipeTransform {

  transform(headers: any, ...args: any[]): any {
    let fields = args[0];
    if(headers && fields && headers.length){
      for(let header of headers){
          for(let h of header.fields){
              h._noshow = false;
          }
      }
      for(let field of fields){
        let table = field.table;
        let fname = field.field;
        for(let header of headers){
          if(header.type == table){
            for(let h of header.fields){
              if(h.name == fname)
                h._noshow = true;
            }
          }
        }
      }
      return JSON.parse(JSON.stringify(headers));
    }
    return headers;
  }

}
