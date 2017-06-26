import { Component, OnInit, Input, Pipe, PipeTransform } from '@angular/core';
import { Renderer } from "./renderer.interface";
import { CQL_AST } from "../../../modules/cql_ast.module";

@Component({
    selector: 'table-renderer',
    template: `<div>
            <h3>{{title}}</h3>
            <table>
                <thead>
                    <th *ngFor="let header of headers">{{header}}</th>
                </thead>
                <tbody>
                    <tr *ngFor="let body of bodys | lazzyLoad:limit">
                        <td *ngFor="let b of body">{{b}}</td>
                    </tr>
                </tbody>
            </table>
            <button type="button" (click)="load()">加载更多</button>
        </div>`
})

export class TableRendererComponent implements OnInit, Renderer {
    constructor() { }

    title: string = '';
    headers: string[] = [];
    bodys: string[][] = [];
    limit: number = 10;

    render(cql_ast: CQL_AST, data: any, title?: string): void {
        this.title = title;
        this.headers = data[0].columns;
        this.bodys = data[0].values;
    }

    load(){
        this.limit += 10;
    }

    ngOnInit() { }
}

@Pipe({
    name: 'lazzyLoad'
})
export class LazzyLoadPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if(!value) return value;
        let limit = args[0];
        let arr = JSON.parse(JSON.stringify(value));
        return arr.splice(0,limit);
    }
}