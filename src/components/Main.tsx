import Dashboard from '../../src/pages/Dashboard/Dashboard';
import Loader from '../../src/pages/Loader/Loader';
import Message from '../../src/components/Message';
import { MainContext } from '../../src/contexts/Main.context';
import { useState } from 'react';

const Main = () => {

    const [messageCtx, setMessageCtx] = useState('')
    const [driversCtx, setDriversCtx ] = useState([])    
    const [shipmentsCtx, setShipmentCtx ] = useState([])  
    const [areFilesLoadedCtx, setFilesLoadedCtx] = useState(false)  

    const mainValues = { messageCtx, setMessageCtx, driversCtx, setDriversCtx, shipmentsCtx, setShipmentCtx, areFilesLoadedCtx, setFilesLoadedCtx };

    return(
        <>
            <MainContext.Provider value={mainValues}>
                <Message />                
                <Loader/>
                <Dashboard/>           
            </MainContext.Provider>         
            
        </>
    )

}

export default Main;

