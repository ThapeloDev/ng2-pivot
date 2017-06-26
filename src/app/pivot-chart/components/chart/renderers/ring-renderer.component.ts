import { Component, OnInit, Input } from '@angular/core';
import { Renderer } from "./renderer.interface";
import { CQL_AST } from "../../../modules/cql_ast.module";
import { ChartGenerator } from "./chart-generator";

@Component({
    selector: 'ring-renderer',
    template: `<div style="width: 100%;height:400px;" [chart]="option"></div>`
})

export class RingRendererComponent implements OnInit, Renderer {
    constructor() { }

    option: any;

    render(cql_ast: CQL_AST, data: any, title?: string): void {
        let chartGen = new ChartGenerator(cql_ast,data);
        let option = {
            title : {
                text: title || '',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: chartGen.pieLegend
            },
            series : [{
                type: 'pie',
                radius : ['50%', '70%'],
                center: ['50%', '50%'],
                data: chartGen.pieSeries
            }]
        };
        this.option = option;
    }

    ngOnInit() { }
}