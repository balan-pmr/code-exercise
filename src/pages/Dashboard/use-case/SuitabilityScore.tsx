
import { IDriver } from '../../../models/Driver.model';
import { IShipment } from '../../../models/Shipment.model';
import { IDriverSuitabily,IShipmentSuitabily, ISuitabilyResult } from '../models/Suitability.model';
import {isEven, countVowels, countConsonants} from '../../../utils/utils';


const executeSuitabilityScore =  async ( drivers: IDriver [], shipments: IShipment[] ) : Promise<{result:string, data:any }>   =>{

    if (drivers.length > 0 && shipments.length > 0) {
        try {

            /**
             *  [START ALGORITHM]
             *
             */

            // Conver data into array for manipulating into the algorithm
            const driverSuitabily: IDriverSuitabily[] = drivers.map(d => ({ driver: d, vowels: countVowels(d.name), consonants: countConsonants(d.name), nameLength:d.name.length }))

            // Get even array of Shipments order by desc address length
            const evenShipmentSuitabily: IShipmentSuitabily[] = getEvenArrayOfShipmentsOrderByDesc(shipments);
           
            // Get odd array of Shipments order by desc address length
            const oddShipmentSuitabily: IShipmentSuitabily[] = getOddArrayOfShipmentsOrderByDesc(shipments)

            // Get driver array order by desc drivers vowels
            driverSuitabily.sort((a, b) => b.vowels - a.vowels)

            //console.log({ evenShipmentSuitabily, driverSuitabily, oddShipmentSuitabily })

            // Variable results
            let evenResults: ISuitabilyResult[] = [];
            let oddResults: ISuitabilyResult[] = [];

            let limit = 1;

            // EXECUTING USE CASE [1] 
            // if the length of the shipment's destination street name is even, the base suitability score (SS) is the number of vowels in the driver’s name multiplied by 1.5.
            for (let i = 0; (i < evenShipmentSuitabily.length && i < driverSuitabily.length); i++) {
                let suitabilityScore: number = driverSuitabily[i].vowels * 1.5;
                let result: ISuitabilyResult = { driver: driverSuitabily[i], shipment: evenShipmentSuitabily[i], hasAnyCommonFactors: false, suitabilityScore: suitabilityScore }
                let hasCommonFactors = result.driver.driver.name.length % result.shipment.addressSteetLength === 0? true: false;
                result.hasAnyCommonFactors = hasCommonFactors;
                evenResults.push(result);
                limit++;
            }

            // Ask if we have enough drivers to asign to oddShipments
            if (limit === driverSuitabily.length) {
                console.warn('No drivers for oddShipments. check the results')
            } else {
            
            // EXECUTING USE CASE [2] if the length of the shipment's destination street name is odd, the base SS is the number of consonants in the driver’s name multiplied by 1.
                
                const restOfDrivers = driverSuitabily.slice(limit - 1, driverSuitabily.length)
                restOfDrivers.sort((a, b) => b.consonants - a.consonants)

                for (let i = 0; (i < oddShipmentSuitabily.length && i < restOfDrivers.length); i++) {
                    let suitabilityScore: number = restOfDrivers[i].consonants * 1;
                    let result: ISuitabilyResult = { driver: restOfDrivers[i], shipment: oddShipmentSuitabily[i], hasAnyCommonFactors: false, suitabilityScore: suitabilityScore }
                    let hasCommonFactors = result.driver.driver.name.length % result.shipment.addressSteetLength === 0? true: false;
                    result.hasAnyCommonFactors = hasCommonFactors;
                    oddResults.push(result);
                }
            }
                
            // USE CASE [3]   Executed in use cases before 
            // if the length of the shipment's destination street name shares any common factors (besides 1) with the length of the driver’s name, the 
            // SS is increased by 50% above the base SS.


            /**
             *  [END ALGORITHM]
             *
             */
            console.log({ evenResults, oddResults })
            return new Promise(reject => { reject({ result: 'ok', data: [...evenResults, ...oddResults] }) })

        } catch (error) {
            return new Promise(reject => { reject({ result: 'An error happends. Error: '+error, data: [] }) })
        } finally {
           // return new Promise(reject => { reject({ result: 'Working in progress...', data: [] }) })
        }

    } else {
        return new Promise(reject => { reject({ result: 'No data into <Drivers list> or <Shipments list>', data: [] }) })
    }

}


export default executeSuitabilityScore;

function getEvenArrayOfShipmentsOrderByDesc(shipments:IShipment[]): IShipmentSuitabily[] {
    const evenShipments = shipments.filter(shipment => isEven(Number(shipment.destination.address.street.length)))
    const evenShipmentSuitabily: IShipmentSuitabily[] = evenShipments.map(s => ({ shipment: s, addressSteetLength: Number(s.destination.address.street.length) }))
    return evenShipmentSuitabily.sort((a, b) => b.addressSteetLength - a.addressSteetLength)
}

function getOddArrayOfShipmentsOrderByDesc(shipments:IShipment[]): IShipmentSuitabily[] {
    const oddShipments = shipments.filter(shipment => !isEven(Number(shipment.destination.address.street.length)))
    const oddShipmentSuitabily: IShipmentSuitabily[] = oddShipments.map(s => ({ shipment: s, addressSteetLength: Number(s.destination.address.street.length) }))
    return oddShipmentSuitabily.sort((a, b) => b.addressSteetLength - a.addressSteetLength)
}


