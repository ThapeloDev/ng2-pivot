import { Directive, ElementRef, AfterViewInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
// let echarts = require('echarts');
import * as echarts from 'echarts';
// let dark = require('echarts/theme/vintage');
@Directive({
  selector: '[chart]'
})
export class ChartDirective implements AfterViewInit, OnDestroy{
    constructor(private el: ElementRef) { }

    @Output() chartClick: EventEmitter<any> = new EventEmitter();

    @Input()
    set chart(opt){
        this._option = opt;
        this.renderChart();
    }

    @Input()
    set showLoading(show){
        if(this.myChart){
            if(show){
                this.myChart.showLoading();
            }else{
                this.myChart.hideLoading();
            }
        }
    }

    _option: any;
    myChart: any;

    ngAfterViewInit(): void {
        this.myChart = echarts.init(this.el.nativeElement);
        this.myChart.on('click',(e) => this.chartClick.emit(e));
    }

    renderChart(): void{
        if(this._option && !this.el.nativeElement.offsetWidth){
            console.error('元素宽度不能为0');
            return ;
        }
        if(this._option && this.myChart){
            this.myChart.setOption(this._option,true);
        }
    }

    ngOnDestroy(): void {
        if(this.myChart)
            this.myChart.dispose();
    }

}