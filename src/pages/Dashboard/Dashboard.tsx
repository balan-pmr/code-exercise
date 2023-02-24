import { MutableRefObject, useContext, useRef } from "react";
import { MainContext } from '../../../src/contexts/Main.context';
import Table from '../../components/Table'
import './Dashboard.css';
import executeSuitabilityScore from './use-case/SuitabilityScore'
import { ISuitabilyResult } from './models/Suitability.model';
import {ITableData}  from '../../models/Table.model';
import {generateSuitabilyDataTable, getTotalPoints }  from './utils/utils';
import Score from './components/Score';
import CustomButtom from './components/CustomButtom';

const Dashboard = () => {

    const { setMessageCtx, driversCtx, shipmentsCtx } = useContext(MainContext);
    const isProcessingRef = useRef(false);
    const totalOfPointsRef = useRef(0);
    const dataTableRefRef = useRef() as MutableRefObject<ITableData>

    const processLists = async () => {
        if (isProcessingRef.current) return;
        isProcessingRef.current = true;
        setMessageCtx('Processing data...')
        const execution = await executeSuitabilityScore(driversCtx, shipmentsCtx)
        if (execution.result === 'ok') {
            let results: ISuitabilyResult[] = execution.data;
            const dataTable :ITableData = await generateSuitabilyDataTable(results)
            const totalPoints : number = await getTotalPoints(results);
            totalOfPointsRef.current = totalPoints
            dataTableRefRef.current = dataTable;
            console.log(dataTable, totalPoints)
            setMessageCtx('Execution Successfully!')
        } else {
            setMessageCtx('An error happends when executing suitability score: ' + execution.result)
        }
        isProcessingRef.current = false;
    }

    const executeButtonClass = !isProcessingRef.current ? 'Dash-button-Active' : 'Dash-button-Inactive';
    const executeButtonLabel = !isProcessingRef.current ? 'Execute Best Suitability Score' : 'Please wait...';
    

    return (
        <section style={{ display: 'grid', justifyContent: 'center' }}>
            <CustomButtom label={executeButtonLabel} classStyle={executeButtonClass} onClickFn={processLists}  />
            <section style= {{display: 'flex',justifyContent: 'space-evenly'}} >
                <Table data={dataTableRefRef} />
                <Score points={totalOfPointsRef.current}/>
            </section>
        </section>
    );



};


export default Dashboard;

