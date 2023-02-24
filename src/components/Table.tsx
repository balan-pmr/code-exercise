import './Table.css';
import {ITableData}  from '../models/Table.model';
import { RefObject } from 'react';

interface TablePros{
    data: RefObject<ITableData>;
}

const Table = (props:TablePros) =>{

    const tableName : string | undefined = props.data.current?.tableName;
    const titles : string [] | undefined = props.data.current?.titles
    const dataRows : string[][] | undefined = props.data.current?.data;

    const getTitlesHTML = processTitlesHTML(titles);
    const getRowsHTML = processRowsHTML(dataRows);
    
    return(
        <div className="div-table">
            <div className="div-table-title"> { tableName ? tableName: "Results"} </div>
            <div className="div-table-row">
                {getTitlesHTML}
            </div>
            {getRowsHTML}
        </div>
 
    )


    function processTitlesHTML(titles: string[] | undefined) {
        return(
            titles? titles.map( title =>  <div className="div-table-col" key={title}><strong key={title} >{title}</strong> </div>): 
            <div className="div-table-col"><strong>No data </strong> </div>             
        )
    }

    function processRowsHTML(dataRows: string[][] | undefined) {
        if (dataRows) {
            let rowHTML = (
                dataRows.map((row, r) => 
                    (
                    <div className="div-table-row" key={r}>
                        {
                            row.map( (col, c) => (
                                <div className="div-table-col" key={c}> {col} </div>
                            ))
                        }
                    </div>
                    )
                )
            );
            return rowHTML;
        } else {
            return <div className="div-table-row">
                <div className="div-table-col"><strong>No data</strong> </div>
            </div>
        }
    }
    

    
}

export default Table;



