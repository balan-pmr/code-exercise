
import { MainContext } from '../../../src/contexts/Main.context';
import { useContext, useState } from "react";
import { IDriver } from '../../models/Driver.model';
import { IShipment } from '../../models/Shipment.model';
import { IFileEndpoint } from "../../models/FileEndPoint.model"
import { createAdapterDriverNamesList } from '../../adapters/Driver.adapter'
import { createAdapterShipmentAddressNamesList } from '../../adapters/Shipment.adapter'
import { readFromText } from './utils/utils'

const Loader  = () =>{

    const { setDriversCtx, setShipmentCtx, driversCtx, shipmentsCtx } = useContext(MainContext);
    const [driversText, setDriversText] = useState('No drivers data')
    const [shipmentText, setShipmentText] = useState('No shipment data')

    const showDriverFile = async (e: any) => {
        e.preventDefault()
        const allText: string = await e.target.files[0].text();
        let listOfDrivers: IFileEndpoint = await readFromText(allText)
        setDriversText(prev => allText );
        const driversNameList: IDriver [] = createAdapterDriverNamesList(listOfDrivers);
        setDriversCtx(driversNameList);
    }

    const showShipmentFile = async (e: any) => {
        e.preventDefault()
        const allText: string = await e.target.files[0].text();
        const listOfShipments: IFileEndpoint = await readFromText(allText)
        setShipmentText(prev => allText );
        const shipmentAdressNameList: IShipment [] = createAdapterShipmentAddressNamesList(listOfShipments);
        setShipmentCtx(shipmentAdressNameList);
    }
    
    const numberOfDrivers = driversCtx? driversCtx.length: 0;
    const numberOfShipments = driversCtx? shipmentsCtx.length: 0;
    
    
    return (
        <section style= {{display: 'flex',justifyContent: 'space-evenly'}}>
            <div style= {{ margin: '50px'}} >
                Driver's List <br/>
                <div>
                    <input type="file" onChange={(e) => showDriverFile(e)} />
                </div>                
                <br/>
                <textarea rows={15} cols={50} value={driversText} 
                    onChange={()=>{ }}
                /><br/>
                <span style= {{fontSize: "15px"}} > {numberOfDrivers} drivers loaded. </span>
            </div>
            <div style= {{ margin: '50px'}} >
                Shipment Destinations' List
                <div>
                    <input type="file" onChange={(e) => showShipmentFile(e)} />
                </div>   
                <br/>
                <textarea rows={15} cols={50} value={shipmentText} 
                    onChange={()=>{}}
                /><br/>
                 <span style= {{fontSize: "15px"}}  > {numberOfShipments} shipments street address loaded. </span>
            </div>
        </section>
    )
    
}

export default Loader;