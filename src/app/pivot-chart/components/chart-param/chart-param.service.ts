import { Injectable } from '@angular/core';

@Injectable()
export class ChartParamService {

    constructor() { }

    getClicked(counts){
        let dCount = counts.dCount;
        let vCount = counts.vCount;
        let clicked = '';
        if(dCount == 0){
            if(vCount > 0)
                clicked = 'bar';
        }else if(dCount == 1){
            if(vCount == 1)
                clicked = 'pie';
            if(vCount > 1)
                clicked = 'bar';
            if(vCount == 0)
                clicked = 'table';
        }else if(dCount > 1){
            clicked = 'table';
        }
        return clicked;
    }

    getCanClickCharts(counts){
        let dCount = counts.dCount;
        let vCount = counts.vCount;
        let canClickCharts = [];
        if(dCount == 0){
            if(vCount > 0)
                canClickCharts = ['table','bar','barY'];
        }else if(dCount == 1){
            if(vCount == 1)
                canClickCharts = ['table','line','pie','ring','rose','bar','barY'];
            if(vCount > 1)
                canClickCharts = ['table','line','bar','barY'];
            if(vCount == 0)
                canClickCharts = ['table'];
        }else if(dCount > 1){
            canClickCharts = ['table'];
        }
        return canClickCharts;
    }

    getCounts(cql_ast){
        let dCount = 0, vCount = 0;
        if(cql_ast && cql_ast.SELECT){
            cql_ast.SELECT.forEach(field => {
                if(field.sequen == 'dimensions'){
                    dCount ++;
                }else if(field.sequen == 'values'){
                    vCount ++;
                }
            });
        }
        return {
            dCount: dCount,
            vCount: vCount
        }
    }
}