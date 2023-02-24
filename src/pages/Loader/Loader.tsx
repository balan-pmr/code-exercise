
import { MainContext } from '../../../src/contexts/Main.context';
import { useContext, useRef, useState } from "react";
import { IDriver } from '../../models/Driver.model';
import { IShipment } from '../../models/Shipment.model';
import { IFileEndpoint } from "../../models/FileEndPoint.model"
import { createAdapterDriverNamesList } from '../../adapters/Driver.adapter'
import { createAdapterShipmentAddressNamesList } from '../../adapters/Shipment.adapter'
import { readFromText } from './utils/utils'

const Loader  = () =>{

    const { setDriversCtx, setShipmentCtx, driversCtx, shipmentsCtx,setMessageCtx, setFilesLoadedCtx} = useContext(MainContext);
    const [driversText, setDriversText] = useState('No drivers data')
    const [shipmentText, setShipmentText] = useState('No shipment data')
    const driverFileRef =useRef<HTMLInputElement>(null);
    const shipmentFileRef =useRef<HTMLInputElement>(null);
    

    const showDriverFile = async (e: any) => {
        e.preventDefault()
        setMessageCtx('Loading file...')
        const allText: string = await e.target.files[0].text();
        let listOfDrivers: IFileEndpoint = await readFromText(allText)
        setDriversText(prev => allText );
        const driversNameList: IDriver [] = createAdapterDriverNamesList(listOfDrivers);
        setDriversCtx(driversNameList);
        setMessageCtx('File Driver names Loaded.')
        shipmentFileRef.current !== null && shipmentFileRef.current.value!=='' ? setFilesLoadedCtx(true): setFilesLoadedCtx(false)
    }

    const showShipmentFile = async (e: any) => {
        e.preventDefault()
        setMessageCtx('Loading file...')
        const allText: string = await e.target.files[0].text();
        const listOfShipments: IFileEndpoint = await readFromText(allText)
        setShipmentText(prev => allText );
        const shipmentAdressNameList: IShipment [] = createAdapterShipmentAddressNamesList(listOfShipments);
        setShipmentCtx(shipmentAdressNameList);
        setMessageCtx('File Shipment destination address Loaded')
        driverFileRef.current !== null && driverFileRef.current.value!==''  ? setFilesLoadedCtx(true): setFilesLoadedCtx(false)
    }
    
    const numberOfDrivers = driversCtx? driversCtx.length: 0;
    const numberOfShipments = driversCtx? shipmentsCtx.length: 0;
    
    
    const  clearRefFiles = (e:any)  => {
        try{
            if(driverFileRef.current!== null ){
                driverFileRef.current.value = ''
            }
            if(shipmentFileRef.current!== null ){
                shipmentFileRef.current.value = ''
            }
            setDriversText('No drivers data');
            setShipmentText('No shipment data');
            let emptyShipment: IShipment []=[];
            let emptyDriver: IShipment []=[];
            setShipmentCtx(emptyShipment);
            setDriversCtx(emptyDriver);
            setFilesLoadedCtx(false)
        }catch(error){
            console.log('clearRefFiles error: '+error)
        }
    }

    return (
        <section>
            <div style={{padding:'10px'}}>
                <button onClick={(e) => clearRefFiles(e)}>
                    Clear Files
                </button>
            </div>            
            <section style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <div style={{ margin: '50px' }} >
                    Driver's List <br />
                    <div>
                        <input type="file" onChange={(e) => showDriverFile(e)} ref={driverFileRef} />
                    </div>
                    <br />
                    <textarea rows={15} cols={50} value={driversText}
                        onChange={() => { }}
                    /><br />
                    <span style={{ fontSize: "15px" }} > {numberOfDrivers} drivers loaded. </span>
                </div>
                <div style={{ margin: '50px' }} >
                    Shipment Destinations' List
                    <div>
                        <input type="file" onChange={(e) => showShipmentFile(e)} ref={shipmentFileRef} />
                    </div>
                    <br />
                    <textarea rows={15} cols={50} value={shipmentText}
                        onChange={() => { }}
                    /><br />
                    <span style={{ fontSize: "15px" }}  > {numberOfShipments} shipments street address loaded. </span>
                </div>

            </section>


        </section>
    )
    
}

export default Loader;