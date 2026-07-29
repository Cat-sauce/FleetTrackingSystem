//Analytics Temp records display
export default function HighestTempTable({ data }) {

    return (

        <div
            style={{
                flex:1,
                background:"#20252b",
                padding:"20px",
                borderRadius:"12px"
            }}
        >

            <h3>🌡 Highest Engine Temperature</h3>

            <table
                style={{
                    width:"100%",
                    marginTop:"15px",
                    textAlign:"center"
                }}
            >

                <thead>

                    <tr>

                        <th>Vehicle</th>
                        <th>Driver</th>
                        <th>Temp</th>

                    </tr>

                </thead>

                <tbody>

                    {data.map(vehicle=>(

                        <tr key={vehicle.vehicle_id}>

                            <td>{vehicle.vehicle_id}</td>

                            <td>{vehicle.driver}</td>

                            <td
                                style={{
                                    color:"#ef4444",
                                    fontWeight:"bold"
                                }}
                            >
                                {vehicle.engine_temp.toFixed(1)}°C
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}