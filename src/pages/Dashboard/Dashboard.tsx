import { MutableRefObject, useContext, useEffect, useRef, useState } from "react";
import { MainContext } from '../../../src/contexts/Main.context';
import Table from '../../components/Table'
import './Dashboard.css';
import {executeSuitabilityScore} from './use-case/SuitabilityScore'
import { ISuitabilyResult } from './models/Suitability.model';
import {ITableData}  from '../../models/Table.model';
import {generateSuitabilyDataTable, getTotalPoints, generateAndDonwloadFile }  from './utils/utils';
import Score from './components/Score';
import CustomButtom from './components/CustomButtom';

const Dashboard = () => {

    const { setMessageCtx, driversCtx, shipmentsCtx, areFilesLoadedCtx} = useContext(MainContext);
    const totalOfPointsRef = useRef(0);
    const dataTableRefRef = useRef() as MutableRefObject<ITableData>
    const [isProcessing, setProcessing] = useState(false)
    const [isLargeAmountOfData, setLargeAmountOfData] = useState(false)
    
    const processLists = async () => {
        if(isProcessing) return;
        setProcessing(true);
        setMessageCtx('Processing data execution ...')
    }

    useEffect(
        ()=>{
          async function Execution(){
            if(isProcessing){
                //console.log('before execution')
                const execution = await executeSuitabilityScore(driversCtx, shipmentsCtx)
                //console.log('after execution')
                if (execution.result === 'ok') {
                    let results: ISuitabilyResult[] = execution.data;
                    //console.log('before data and points')
                    const dataTable :ITableData = await generateSuitabilyDataTable(results)
                    const totalPoints : number = await getTotalPoints(results);
                    if(dataTable.data.length > Number(process.env.REACT_APP_LIMIT_RESULTS)  ){
                        setLargeAmountOfData(true)
                    }else{
                        setLargeAmountOfData(false)
                    }                    
                    //console.log('afeter data and points')
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
        },[isProcessing, setProcessing,setMessageCtx,driversCtx,shipmentsCtx, setLargeAmountOfData, isLargeAmountOfData]
    )

        const donwloadFileResults = ()=>{
            const fileTitle= 'SS_Results_';
            const contentText = (dataTableRefRef.current !== null)? 
                '#, Drivers,ShipmentsSuitability Score (SS),Has bonification Factor?\n'+(dataTableRefRef.current.data).join('\n')  
                :'No results'; 
            generateAndDonwloadFile(fileTitle, contentText)
        }

    const executeButtonClass = !isProcessing? 'Dash-button-Active' : 'Dash-button-Inactive';
    const executeButtonLabel = !isProcessing ? 'Execute Best Suitability Score' : 'Please wait...';
    
    const downloadButtonResultClass = 'Dash-button-Active' ;
    const downloadButtonResultLabel = 'Download Results' ;


    return (
        <section style={{ display: 'grid', justifyContent: 'center' }}>
            {
                areFilesLoadedCtx ? <CustomButtom styleClass={executeButtonClass} label={executeButtonLabel} onClickFn={processLists} />
                    : <></>
            }
            <section style={{ display: 'flex', justifyContent: 'space-evenly' }} >
            {
                !isLargeAmountOfData? <Table data={dataTableRefRef} /> : <> Results are more than expected, please download the file to see full resutls. </>
            }
                <Score points={totalOfPointsRef.current} />
            </section>
            <br/>
            {
                dataTableRefRef.current ? <CustomButtom styleClass={downloadButtonResultClass} onClickFn={donwloadFileResults} label={downloadButtonResultLabel} />
                    : <></>
            }
        </section>
    );



};


export default Dashboard;

