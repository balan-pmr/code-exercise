
import { MainContext } from '../../../src/contexts/Main.context';
import { useContext, useEffect, useState } from "react";
import { IDriver } from '../../models/Driver.model';
import { IShipment } from '../../models/Shipment.model';
import { IFileEndpoint } from "../../models/FileEndPoint.model"
import { createAdapterDriverNamesList } from '../../adapters/Driver.adapter'
import { createAdapterShipmentAddressNamesList } from '../../adapters/Shipment.adapter'

const fileDrivers: IFileEndpoint = {
    lines: [ 
    "Pedro Balan Martinez Rosales abcabcabcab", 
    "Alejandra Anaya Cantella",
    "Dafne Martinez Anaaya",
    "Ana Lopez Martinez", 
    "Carlos Santillan Rosas",
    "Bety Ramoz Cruz",
    "Ricardo Perez",
    "Lolita Ayala Lopex",
    "San Smith"
    ]    
}

const fileShipment: IFileEndpoint = {
    lines: [ 
    "Cuahutemoc, CDMX", 
    "Rio, Blanco Veracruz",
    "Nort",
    "Toluca, Mexico",
    "Leon, Guanajuto", 
    "Sur",
    "Ciudad del Carmen, Cancun",
    "Guerrero, Acapulco"
    ]    
}



const Loader  = () =>{

    const { setDriversCtx, setShipmentCtx } = useContext(MainContext);
    const [driversText, setDriversText] = useState('No drivers data')
    const [shipmentText, setShipmentText] = useState('No shipment data')

    useEffect(
        ()=>{

            const driversNameList: IDriver [] = createAdapterDriverNamesList(fileDrivers);
            const shipmentAdressNameList: IShipment [] = createAdapterShipmentAddressNamesList(fileShipment);           
            
            setDriversCtx(driversNameList);
            setShipmentCtx(shipmentAdressNameList);

            const dtext= driversNameList.slice().map((driver:IDriver)=>driver.name).join('\n');
            const stext= shipmentAdressNameList.slice().map((shipment:IShipment)=>shipment.destination.address.street).join('\n');
            
            setDriversText(dtext);
            setShipmentText(stext)
           
        }, [setDriversCtx,setShipmentCtx, setDriversText, setShipmentText]
    )

    return (
        <section style= {{display: 'flex',justifyContent: 'center'}}>
            <div style= {{ margin: '50px'}} >
                Driver's List   <br/><br/>
                <textarea rows={15} cols={50} value={driversText} 
                    onChange={()=>{}}
                />
            </div>
            <div style= {{ margin: '50px'}} >
                Shipment Destinations' List
                <br/><br/>
                <textarea rows={15} cols={50} value={shipmentText} 
                    onChange={()=>{}}
                />
            </div>
        </section>
    )
    
}

export default Loader;