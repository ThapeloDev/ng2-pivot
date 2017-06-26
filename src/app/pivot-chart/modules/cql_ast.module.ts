export class CQL_AST{
    FROM: {as: string, table:string}[] = [];
    SELECT: {name: string, func: string, table: string, field: string, sequen: string}[] = [];
    JOIN: {as: string, table: string, type: string, cond: {left: string, operator: string, right: string}}[] = [];
    LIMIT: {from: number, nb: number};
    WHERE: {logic: string, terms: any[]};
    'ORDER BY': {column: string, order: string}[] = [];
    'GROUP BY': {column: string}[] = [];
}