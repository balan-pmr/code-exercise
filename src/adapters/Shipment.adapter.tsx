
import { IShipment } from "../models/Shipment.model"
import { IFileEndpoint } from "../models/FileEndPoint.model"

export const createAdapterShipmentAddressNamesList = (file: IFileEndpoint) : IShipment[] => {
    const shipmentDestinationList: IShipment[] = file.lines.map(line => {
        const shipment: IShipment = { destination : {  address : { street : line } } }
        return shipment
    })
    return shipmentDestinationList;
}