import { Injectable } from '@angular/core';
import { CQL_AST } from "../modules/cql_ast.module";
import * as simpleSqlParser from 'simple-sql-parser';

@Injectable()
export class CQLParserService {

    constructor() { }

    cql2ast(cql: string): CQL_AST{
        let ast = simpleSqlParser.sql2ast(cql);
        let groups: string[] = [];
        ast['GROUP BY'].forEach(val => groups.push(val.column));
        for(let field of ast.SELECT){
            let fp = this.fieldParse(field.name);
            field.func = fp.FUNCTION;
            field.table = fp.TABLE;
            field.field = fp.FIELD;
            if(groups.indexOf(field.name) >= 0){
                field.sequen = 0;
            } else {
                field.sequen = 1;
            }
        }
        return ast;
    }

    ast2sql(ast: CQL_AST): string{
        ast = JSON.parse(JSON.stringify(ast));
        this.astPriHandle(ast);
        let sql = simpleSqlParser.ast2sql(ast);
        return sql;
    }

    fieldParse(field: string){
        field = field.replace(/ /g,'');
        let FUNCTION, TABLE, FIELD;
        if(field.indexOf('(') >= 0){
            let arr = field.split('(');
            FUNCTION = arr[0];
            field = arr[1];
        }
        field = field.replace(/\(|\)/g,'');
        if(field.indexOf('.') >= 0){
            let arr = field.split('.');
            TABLE = arr[0];
            FIELD = arr[1];
        }
        FIELD = FIELD || field;
        return {
            FUNCTION: FUNCTION,
            TABLE: TABLE,
            FIELD: FIELD
        }
    }

    private distinctByKey(arr: any[], key: string): any[]{
        let newArr: any[] = [];
        let map = new Map();
        arr.forEach(obj => map.set(obj[key],obj));
        map.forEach((val) => newArr.push(val));
        return newArr;
    }

    private astPriHandle(ast: CQL_AST){
        if(ast.SELECT.length == 0) ast.SELECT.push({name: 'count(*)',func:'count',table:'',field:'*',sequen: 'values'});
        if(ast.FROM.length) ast.FROM = this.distinctByKey(ast.FROM,'table');
        if(!ast['ORDER BY'].length) ast['ORDER BY'] = undefined;
        if(!ast['GROUP BY'].length) ast['GROUP BY'] = undefined;
        ast.SELECT.sort((old,newe) => {
            if(old.sequen != newe.sequen && old.sequen == 'values') return 1;
            return -1;
        });
    }

}