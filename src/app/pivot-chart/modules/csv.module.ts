export class CSV{
    headers: CSVHeader[];
    bodys: CSVBody[];
}

export class CSVHeader{
    type: string;
    fields: CSVField[];
}

export class CSVField{
    name: string;
    type: string;
    dataType: string;
}

export class CSVBody{
    type: string;
    fields: any;
}