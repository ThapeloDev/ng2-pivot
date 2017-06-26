import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChartParamService } from "../chart-param/chart-param.service";
import { CQL_AST } from "../../modules/cql_ast.module";

@Component({
    selector: 'chart-param',
    templateUrl: 'chart-param.component.html',
    styleUrls: ['./chart-param.component.less']
})

export class ChartParamComponent implements OnInit {
    constructor(private service:ChartParamService) { }

    _mark: string;
    clickedChartType: string;
    counts = {dCount: 0, vCount: 0};
    chartTypes: any = [
        {type: 'table', canClick: false},
        {type: 'line', canClick: false},
        {type: 'pie', canClick: false},
        {type: 'ring', canClick: false},
        {type: 'rose', canClick: false},
        {type: 'bar', canClick: false},
        {type: 'barY', canClick: false}
    ];
    @Output() titleChange: EventEmitter<string> = new EventEmitter();
    @Output() markChange: EventEmitter<string> = new EventEmitter();
    @Output() typeChange: EventEmitter<string> = new EventEmitter();

    @Input()
    set cql_ast(cql_ast: CQL_AST){
        let counts = this.service.getCounts(cql_ast);
        let canClickCharts = this.service.getCanClickCharts(counts);
        if(counts.dCount != this.counts.dCount || counts.vCount != this.counts.vCount)
            this.clickedChartType = this.service.getClicked(counts);
        this.typeChange.emit(this.clickedChartType);
        this.chartTypes.forEach(chart => {
            if(canClickCharts.indexOf(chart.type) >= 0){
                chart.canClick = true;
            }else{
                chart.canClick = false;
            }
        });
        this.chartTypes = JSON.parse(JSON.stringify(this.chartTypes));
        this.counts = counts;
    }

    set mark(mark){
        this._mark = mark;
        this.markChange.emit(mark);
    }
    get mark(){
        return this._mark;
    }

    chartClick(chart){
        if(!chart.canClick) return ;
        this.clickedChartType = chart.type;
        this.typeChange.emit(this.clickedChartType);
    }

    titleCh(e){
        this.titleChange.emit(e.srcElement.value);
    }

    ngOnInit() {
        this.typeChange.emit(this.clickedChartType);
    }
}