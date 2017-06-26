import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CSV, CSVHeader } from "../../modules/csv.module";
import { CQLParserService } from "../../services/cql-parser.service";
import { CQL_AST } from "../../modules/cql_ast.module";

@Component({
    selector: 'pivot',
    templateUrl: './pivot.component.html',
    styleUrls: ['./pivot.component.less']
})
export class PivotComponent implements OnInit {
    constructor(private cqlParser: CQLParserService) { }

    _headers: CSVHeader[];
    _cql_ast: CQL_AST = new CQL_AST();
    fieldName: string;
    @Input() 
    set cql_ast(cql_ast: CQL_AST){
        this._cql_ast = cql_ast;
    }
    get cql_ast(){
        return this._cql_ast;
    }
    @Output() cqlChange: EventEmitter<CQL_AST> = new EventEmitter();

    @Input() 
    set headers(headers: CSVHeader[]){
        this._headers = JSON.parse(JSON.stringify(headers));
    }
    get headers(){
        return this._headers;
    }

    dimensionDroped(e){
        let field = e.dragData;
        let select = {
            sequen: 'dimensions',
            func: '',
            type: field.type,
            name: '',
            table: '',
            field: ''
        };
        switch(field.sequen){
            case 'dimensions':
                break ;
            case 'values':
                select.name = `${field.table}.${field.field}`;
                select.table = field.table;
                select.field = field.field;
                this.delByKey(this.cql_ast.SELECT,'name',field.name);
                this.cql_ast['GROUP BY'].push({column: `${field.table}.${field.field}`});
                this.cql_ast.SELECT.push(select);
                break ;
            default:
                select.name = `${field.dataType}.${field.name}`;
                select.table = field.dataType;
                select.field = field.name;
                this.cql_ast.SELECT.push(select);
                this.cql_ast.FROM.push({as: '', table: select.table});
                this.cql_ast['GROUP BY'].push({column: select.name});
        }
        this.updateAST();
    }

    valueDroped(e){
        let field = e.dragData;
        let func = field.type == 'char' ? 'count' : 'sum';
        let select = {
            sequen: 'values',
            func: func,
            type: field.type,
            name: '',
            table: '',
            field: ''
        };
        switch(field.sequen){
            case 'values':
                break ;
            case 'dimensions':
                select.name = `${func}(${field.table}.${field.field})`;
                select.table = field.table;
                select.field = field.field;
                this.delByKey(this.cql_ast.SELECT,'name',field.name);
                this.delByKey(this.cql_ast['GROUP BY'],'column',`${field.table}.${field.field}`);
                this.cql_ast.SELECT.push(select);
                break ;
            default: 
                select.name = `${func}(${field.dataType}.${field.name})`;
                select.table = field.dataType;
                select.field = field.name;
                this.cql_ast.SELECT.push(select);
                this.cql_ast.FROM.push({as: '', table: select.table});
        }
        this.updateAST();
    }

    fieldDroped(e){
        let field = e.dragData;
        this.delByKey(this.cql_ast.SELECT,'name',field.name);
        this.delByKey(this.cql_ast['ORDER BY'],'column',field.name);
        if(field.sequen == 'dimensions')
            this.delByKey(this.cql_ast['GROUP BY'],'column',`${field.table}.${field.field}`);
        this.updateAST();
    }

    clear(sequen){
        this.delByKey(this.cql_ast.SELECT,'sequen',sequen);
        if(sequen == 'dimensions')
            this.cql_ast['GROUP BY'] = [];
        this.updateAST();
    }

    orderby(order){
        this.cql_ast['ORDER BY'] = [];
        if(order.order != 'default')
            this.cql_ast['ORDER BY'].push(order);
        this.updateAST();
    }

    updateAST(){
        this.cql_ast = JSON.parse(JSON.stringify(this.cql_ast));
        this.cqlChange.emit(this.cql_ast);
    }

    private delByKey(arr: any[],key: string,del: string){
        let index: number = -1;
        arr.forEach((item,i) => {
            if(item[key] == del)
                index = i;
        });
        arr.splice(index,1);
    }
    // private delByKey(arr: any[],key: string,del: string){
    //     let index: number[] = [];
    //     arr.forEach((item,i) => {
    //         if(item[key] == del)
    //             index.push(i);
    //     });
    //     index.reverse().forEach(item => arr.splice(item,1));
    // }

    ngOnInit() { }
}