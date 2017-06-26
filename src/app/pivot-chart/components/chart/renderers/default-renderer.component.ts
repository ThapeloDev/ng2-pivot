import { Component, OnInit, Input } from '@angular/core';
import { Renderer } from "./renderer.interface";
import { CQL_AST } from "../../../modules/cql_ast.module";
import { ChartGenerator } from "./chart-generator";

@Component({
    selector: 'default-renderer',
    template: `<div style="width: 100%;height:400px;"></div>`
})

export class DefaultRendererComponent implements OnInit, Renderer {
    constructor() { }

    render(cql_ast: CQL_AST, data: any, title?: string): void {
        console.info('default renderer');
    }

    ngOnInit() { }
}