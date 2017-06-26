import { Component } from '@angular/core';
import { CSV2DBService } from "app/pivot-chart/services/csv-db.service";
import { CQLParserService } from "app/pivot-chart/services/cql-parser.service";
import { Subject } from "rxjs/Subject";

@Component({
  selector: 'app-root',
  template: `
      <pivot 
        [headers]="headers" 
        (cqlChange)="execute($event)"></pivot>
      <pivot-chart 
          [type]="chartType" 
          [title]="title" 
          [cql_ast]="cql_ast"
          [data]="data"></pivot-chart>
      <chart-param 
          (titleChange)="title = $event"
          (markChange)="mark = $event"
          [cql_ast]="cql_ast"
          (typeChange)="typeChange($event)"></chart-param>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private csv2db: CSV2DBService,private cqlParser: CQLParserService){
    this.db = this.csv2db.insertArr({headers: headers, bodys: bodys});
  }
  headers = headers;
  cql_ast;
  db: any;
  data: any = {};
  chartType;
  title;
  execute(cql_ast){
    this.cql_ast = cql_ast;
    let sql = this.cqlParser.ast2sql(cql_ast);
    this.data = this.db.execute(sql);
    console.log(this.data);
  }
  typeChange(type){
    setTimeout(() => this.chartType = type);
    console.log(type);
  }
}

let headers = [{
  type: 'demo',
  fields: [{
    name: 'city',
    type: 'char',
    dataType: 'demo'
  },
  {
    name: 'population',
    type: 'int',
    dataType: 'demo'
  },
  {
    name: 'year',
    type: 'char',
    dataType: 'demo'
  }]
}];

let bodys = [
  ['北京',1508.78,2015],
  ['北京',1854.64,2016],
  ['北京',1961.24,2017],
  ['上海',1896.78,2015],
  ['上海',2137.64,2016],
  ['上海',2301.91,2017],
  ['广州',1036.78,2015],
  ['广州',1154.64,2016],
  ['广州',1270.08,2017],
  ['青岛',784.78,2015],
  ['青岛',815.64,2016],
  ['青岛',871.51,2017],
];
