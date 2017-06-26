import { Injectable } from '@angular/core';
import { CSV } from '../modules/csv.module';
import { DatabaseService } from "./database.service";

@Injectable()
export class CSV2DBService {

    constructor() { }

    insertCSV(csv: CSV | any){
        if(csv && csv.headers && csv.headers.length && csv.bodys){
            let database = new DatabaseService();
            for(let header of csv.headers){
                database.createTab(header.fields,header.type);
            }
            for(let body of csv.bodys){
                database.insertObj(body.fields,body.type);
            }
            return database;
        }
        return null;
    }

    insertArr(csv: any){
        if(csv && csv.headers && csv.headers.length && csv.bodys){
            let database = new DatabaseService();
            let tname;
            for(let header of csv.headers){
                tname = database.createTab(header.fields,header.type);
            }
            database.insertArr(csv.bodys,tname);
            return database;
        }
        return null;
    }

    // destroyDB(){
    //     this.database.db = null;
    // }
}