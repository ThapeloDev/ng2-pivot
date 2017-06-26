import { Component, OnInit, Input, EventEmitter, Output, HostListener } from '@angular/core';
import * as $ from 'jquery';

@Component({
    selector: 'value',
    template: `<div class="select-field">
                <div (click)="show = !show">
                    <span title="{{field.table}}.{{field.field}}({{field.func}})">
                        {{field.table}}.{{field.field}}({{field.func}}) </span>
                    <i class="icon-dashboard"></i>
                </div>
                <ul [hidden]="!show" class="drag-list-layer">
                    <li (click)="agg('count')">
                        <span>计数</span>
                    </li>
                    <li (click)="agg('sum')">
                        <span>求和</span>
                    </li>
                    <li (click)="agg('avg')">
                        <span>平均值</span>
                    </li>
                    <li (click)="agg('max')">
                        <span>最大值</span>
                    </li>
                    <li (click)="agg('min')">
                        <span>最小值</span>
                    </li>
                    <li (click)="agg('median')">
                        <span>中位数</span>
                    </li>
                    <li (click)="doOrder('asc')">
                        <span>升序</span>
                    </li>
                    <li (click)="doOrder('desc')">
                        <span>降序</span>
                    </li>
                    <li (click)="doOrder('default')">
                        <span>默认排序</span>
                    </li>
                </ul>
            </div>
    `,
    styleUrls:['field.component.less']
})

export class ValueComponent implements OnInit {
    constructor() { }

    show: boolean = false;

    @Input() field;
    @Output() doFunc: EventEmitter<string> = new EventEmitter();
    @Output() orderby: EventEmitter<any> = new EventEmitter();

    agg(func){
        let table = this.field.table;
        let field = this.field.field;
        this.field.func = func;
        this.field.name = `${func}(${table}.${field})`;
        this.doFunc.emit(func);
    }

    doOrder(order){
        let field = {
            column: this.field.name,
            order: order
        }
        this.orderby.emit(field);
    }

    @HostListener('document:click', ['$event'])
    documentClick(event:Event){
        let taget = event.target;
        if(!$(taget).parents('.select-field').length)
            this.show = false
    }

    ngOnInit() { }
}