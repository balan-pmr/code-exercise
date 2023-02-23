import { useContext, useRef } from "react";
import { MainContext } from '../../../src/contexts/Main.context';
import Table from '../../components/Table'
import './Dashboard.css';
import executeSuitabilityScore from './UseCase/SuitabilityScore'
import { ISuitabilyResult } from './models/Suitability.model';

const Dashboard = () => {

    const { setMessageCtx, driversCtx, shipmentsCtx } = useContext(MainContext);
    const isProcessingRef = useRef(false);
    const totalOfPointsRef = useRef(0);


    const processLists = async () => {
        if (isProcessingRef.current) return;
        isProcessingRef.current = true;
        setMessageCtx('Processing data...')
        const execution = await executeSuitabilityScore(driversCtx, shipmentsCtx)
        if (execution.result === 'ok') {
            let results: ISuitabilyResult[] = execution.data;
            let points: number = 0;
            results.forEach(r => {
                console.log('Driver: ' + r.driver.driver.name + ' -> Shipment: ' + r.shipment.shipment.destination.address.street);
                points += r.hasAnyCommonFactors ? r.suitabilityScore * 1.5 : r.suitabilityScore;
            })
            totalOfPointsRef.current = points;
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

            <div style={{ margin: '40px' }} >
                <p onClick={() => { processLists() }} className={executeButtonClass}> {executeButtonLabel}  </p>
            </div>

            <Table />

            <div style={{ margin: '100px' }}>
                <p> Total of Suitability Score </p>
                <h1> {totalOfPointsRef.current} Points</h1>
            </div>

        </section>
    );



};

export default Dashboard;