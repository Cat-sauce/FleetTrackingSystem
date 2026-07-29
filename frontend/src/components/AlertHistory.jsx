export default function AlertHistory({ alerts,latestEvent }) {
    return(

        <div
            style={{
                flex:2,
                background:"#20252b",
                padding:"20px",
                borderRadius:"10px"
            }}
        >

            <h2>📜 Recent Activity</h2>

            <table
                style={{
                    width:"100%",
                    marginTop:"20px"
                }}
            >

                <thead>

                    <tr>

                        <th>Time</th>

                        <th>Vehicle</th>

                        <th>Alert</th>

                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                {

                    alerts.map(alert=>(

                        <tr key={

                            alert.vehicle+

                            alert.time+

                            alert.title

                        }>

                            <td>{alert.time}</td>

                            <td>{alert.vehicle}</td>

                            <td>{alert.title}</td>

                            <td>{alert.level}</td>

                        </tr>

                    ))

                }

                </tbody>

            </table>

        </div>

    );

}