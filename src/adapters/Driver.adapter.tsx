
import { IDriver } from "../models/Driver.model"
import { IFileEndpoint } from "../models/FileEndPoint.model"

export const createAdapterDriverNamesList = (file: IFileEndpoint) : IDriver[] => {
    const driversList: IDriver[] = file.lines.map(line => {
        const driver: IDriver = { name: line }
        return driver
    })
    return driversList;
}