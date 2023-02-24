import { MutableRefObject, useContext, useEffect, useRef, useState } from "react";
import { MainContext } from '../../../src/contexts/Main.context';
import Table from '../../components/Table'
import './Dashboard.css';
import {executeSuitabilityScore} from './use-case/SuitabilityScore'
import { ISuitabilyResult } from './models/Suitability.model';
import {ITableData}  from '../../models/Table.model';
import {generateSuitabilyDataTable, getTotalPoints }  from './utils/utils';
import Score from './components/Score';
import CustomButtom from './components/CustomButtom';

const Dashboard = () => {

    const { setMessageCtx, driversCtx, shipmentsCtx } = useContext(MainContext);
    const totalOfPointsRef = useRef(0);
    const dataTableRefRef = useRef() as MutableRefObject<ITableData>
    const [isProcessing, setProcessing] = useState(false)

    const processLists = async () => {
        if(isProcessing) return;
        setProcessing(true);
        setMessageCtx('Processing data execution ...')
    }

    useEffect(
        ()=>{
          async function Execution(){
            if(isProcessing){
                console.log('before execution')
                const execution = await executeSuitabilityScore(driversCtx, shipmentsCtx)
                console.log('after execution')
                if (execution.result === 'ok') {
                    let results: ISuitabilyResult[] = execution.data;
                    console.log('before data and points')
                    const dataTable :ITableData = await generateSuitabilyDataTable(results)
                    const totalPoints : number = await getTotalPoints(results);
                    console.log('afeter data and points')
                    totalOfPointsRef.current = totalPoints
                    dataTableRefRef.current = dataTable;
                    setMessageCtx('Execution Successfully!')
                    setProcessing(false);
                } else {
                    setMessageCtx('An error happends when executing suitability score: ' + execution.result)
                    setProcessing(false);
                }
               }            
          }
        Execution();
        },[isProcessing, setProcessing,setMessageCtx,driversCtx,shipmentsCtx]
    )

    return (
        <section style={{ display: 'grid', justifyContent: 'center' }}>
            <CustomButtom isProcessing={isProcessing} onClickFn={processLists} />
            <section style={{ display: 'flex', justifyContent: 'space-evenly' }} >
                <Table data={dataTableRefRef} />
                <Score points={totalOfPointsRef.current} />
            </section>
        </section>
    );



};


export default Dashboard;

