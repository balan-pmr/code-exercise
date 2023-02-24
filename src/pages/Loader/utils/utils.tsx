
import { IFileEndpoint } from "../../../models/FileEndPoint.model"

export const readFromText = (text: string) : Promise<IFileEndpoint>=>{
    let list : IFileEndpoint = { lines: []}
    return (
        new Promise( (resolve)=>{
            text.split('\n').forEach(
                line=>list.lines.push(line)
            )
            resolve(list)
        }
        )
   )

}
