import {ITableData, ITitleColums, IRows}  from '../../../models/Table.model';
import { ISuitabilyResult } from '../models/Suitability.model';

export async function generateSuitabilyDataTable(result: ISuitabilyResult[]): Promise<ITableData> {
    return new Promise( resolve => {
        let dataTable: ITableData = {
            tableName: 'Results',
            data: [],
            titles: []
        };
    
        let rows: IRows = { data: [] };
        let titles: ITitleColums = { titles: [ 
            '#',
            'Drivers', 
            'Shipments', 
            'Suitability Score (SS)', 
            'Has bonification Factor?' ]};
        
        result.forEach( (r, index) => {
            let obj = [
                String(index+1),
                r.driver.driver.name, 
                r.shipment.shipment.destination.address.street , 
                String(r.suitabilityScore),
                r.hasAnyCommonFactors?'Yes':'No',
            ]
            rows.data.push(obj)
        })
    
        dataTable.titles = titles.titles;
        dataTable.data = rows.data;
        resolve(dataTable)        
    })
    //return Promise.resolve(dataTable);
}

export async function  getTotalPoints (result: ISuitabilyResult[]): Promise<number> {
    await wait();
    return new Promise( resolve =>{
        let points:number =0;
        result.forEach(r => {
            points += r.hasAnyCommonFactors ? r.suitabilityScore * 1.5 : r.suitabilityScore;
        })
        resolve(points)  
    })
}

async function wait() {
    return new Promise(
        (resolve)=>{
            let interval = setInterval( ()=> {
                console.log('after 5 secs')
                clearInterval(interval)
                resolve('ok')
            }, 2000)
        }
    )
}