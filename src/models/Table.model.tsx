export interface IRows{
    data: Array<Array<string>> ;
}

export interface ITitleColums{
    titles: Array<string>;
}

export interface ITableData extends IRows, ITitleColums { 
    tableName: string;
}