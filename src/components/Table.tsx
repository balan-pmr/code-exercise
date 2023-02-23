

const Table = () =>{
    return(
        <table>
            <thead>
                <tr>
                    <th colSpan={5} >Shipment destinations and drivers</th>
                </tr>
                <tr>
                    <th>Employee's Name</th>
                    <th>Vowels</th>
                    <th>Consonants</th>
                    <th>Destination Street Name</th>
                    <th>Suitability Score</th>                    
                </tr>                             
            </thead>
            <tbody>
                <tr>
                    <td>Pedro Balan Martinez Rosales</td>
                    <td>7</td>
                    <td>12</td>
                    <td>Rio Blanco, Veracruz</td>
                    <td>12</td>
                </tr>
                <tr>
                    <td>Alejandra Anaya Cantella</td>
                    <td>23</td>
                    <td>34</td>
                    <td>Cuahutemoch, CDMX</td>
                    <td>12</td>
                </tr>                
            </tbody>
        </table>
    )
}

export default Table;