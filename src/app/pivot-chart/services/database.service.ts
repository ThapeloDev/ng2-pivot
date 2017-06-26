import { Injectable } from '@angular/core';
import * as uuidV4 from 'uuid/v4';
declare let SQL: any;

@Injectable()
export class DatabaseService {

    db: any;

    constructor() {
        // this.db = this.createDB();
    }

    private createDB(): any{
        return new SQL.Database();
    }

    public createTab(schema: any, tableName?: string): string{
        if(!this.db) this.db = this.createDB();
        let tabName = tableName || uuidV4();
        let schema2sql = () => {
            let strArr: string[] = [];
            for(let field of schema){
                strArr.push(`\`${field.name}\` ${field.type}`);
            }
            if(strArr.length)
                return `( ${strArr.join(',')} )`;
            return '';
        }
        try{
            let fields = schema2sql();
            if(fields){
                let sql = `DROP TABLE IF EXISTS \`${tabName}\`; CREATE TABLE \`${tabName}\` ${fields};`;
                this.db.run(sql);
            }
        }catch(e){
            console.error(e);
        }
        return tabName;
    }

    public insertArr(arr: any[][], tabName: string): boolean{
        try{
            for(let vals of arr){
                let symbArr = [];
                for(let i = 0; i < vals.length; i++){
                    symbArr.push('?');
                }
                this.db.run(`INSERT INTO \`${tabName}\` VALUES (${symbArr.join(',')})`, vals);
            }
        }catch(e){
            console.error(e);
            return false;
        }
        return true;
    }

    public insertObj(obj: any, tabName: string): boolean{
        let keys = [];
        let vals = [];
        for(let key in obj){
            keys.push(`\`${key}\``);
            vals.push(`\"${obj[key].replace(/\"/g,'\"\"')}\"`);
        }
        try{
            this.db.run(`INSERT INTO \`${tabName}\` (${keys.join(',')}) VALUES (${vals.join(',')})`);
        }catch(e){
            console.error(e);
            return false;
        }
        return true;
    }

    public dropTab(tabName: string): boolean{
        try{
            this.db.run(`DROP TABLE IF EXISTS \`${tabName}\``);
        }catch(e){
            console.log(e);
            return false;
        }
        return true;
    }

    public execute(sql: string): any[]{
        try{
            return this.db.exec(sql);
        }catch(e){
            console.log(e);
            return [];
        }
    }

}