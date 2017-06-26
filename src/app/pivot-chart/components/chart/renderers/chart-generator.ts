import { CQL_AST } from "../../../modules/cql_ast.module";

export class ChartGenerator {

    public legend: Array<string> = [];

    public xAxis: Array<string> = [];

    public series: any = {};

    public pieSeries: any = [];

    public pieLegend: Array<string> = [];

    constructor(cql_ast: CQL_AST,data: any){
        try{
            let dimension, dimensionIndex;
            cql_ast.SELECT.forEach(field => {
                switch(field.sequen){
                    case 'dimensions':
                        dimension = field.field;
                        break ;
                    case 'values':
                        this.legend.push(field.name);
                        this.series[field.name] = [];
                }
            });
            if(dimension){
                dimensionIndex = data[0].columns.indexOf(dimension);
                data[0].values.forEach(line => {
                    this.xAxis.push(line[dimensionIndex]);
                });
            }
            for(let key in this.series){
                let valueIndex = data[0].columns.indexOf(key);
                data[0].values.forEach(line => {
                    this.series[key].push(line[valueIndex]);
                });
            }
            let valName = this.legend[0];
            let valIndex = data[0].columns.indexOf(valName);
            data[0].values.forEach(val => {
                this.pieSeries.push({
                    value: val[valIndex],
                    name: val[dimensionIndex]
                });
                this.pieLegend.push(val[dimensionIndex]);
            });
        }catch(e){
            this.legend = [];
            this.xAxis = [];
            this.series = {};
            this.pieSeries = [];
            this.pieLegend = [];
            console.error(e);
        }
    }
}