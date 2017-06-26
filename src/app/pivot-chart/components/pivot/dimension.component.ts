import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';

@Component({
    selector: 'dimension',
    template: `<div class="select-field" (click)="show = !show">
                <span title="{{field.table}}.{{field.field}}">
                    {{field.table}}.{{field.field}} </span>
                <i class="icon-dashboard"></i>
                <ul [hidden]="!show" class="drag-list-layer">
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
                <ul *ngIf="false" class="drag-list-layer">
                    <li>
                        <span>对齐方式</span><i class="icon-result"></i>
                        <ul class="alin-list">
                            <li><span>左对齐</span></li>
                            <li><span>居中</span></li>
                            <li><span>右对齐</span></li>
                        </ul>
                    </li>
                    <li>
                        <span>排序</span><i class="icon-result"></i>
                        <ul class="sort-list">
                            <li><span>默认</span></li>
                            <li><span>升序</span></li>
                            <li><span>降序</span></li>
                        </ul>
                    </li>
                </ul>
            </div>
            `,
    styleUrls:['field.component.less']
})

export class DimensionComponent implements OnInit {
    constructor() { }

    show: boolean = false;
    @Input() field;
    @Output() orderby: EventEmitter<any> = new EventEmitter();

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