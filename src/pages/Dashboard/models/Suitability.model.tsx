import { IDriver } from '../../../models/Driver.model';
import { IShipment } from '../../../models/Shipment.model';

export interface IDriverSuitabily{
    driver: IDriver;
    vowels: number;
    consonants: number;
    nameLength:number;
}
export interface IShipmentSuitabily{
    shipment: IShipment;
    addressSteetLength: number;
}

export interface ISuitabilyResult{
    driver: IDriverSuitabily;
    shipment: IShipmentSuitabily;
    suitabilityScore: number;
    hasAnyCommonFactors: boolean;   
}