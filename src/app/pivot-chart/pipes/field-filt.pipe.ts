import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fieldFilt'
})

export class FieldFiltPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        let name = args[0];
        if(name != undefined){
            value.forEach(element => {
                element.fields.forEach(field => {
                    if(field.name.indexOf(name) >= 0){
                        field._filted = false;
                    } else {
                        field._filted = true;
                    }
                });
            });
            return JSON.parse(JSON.stringify(value));
        }
        return value;
    }
}