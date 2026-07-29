import { useNotifications } from "../context/NotificationContext";
//bell icon notifications
export default function NotificationDrawer(){

    const{

        notifications,
        drawerOpen

    } = useNotifications();

    if(!drawerOpen)
        return null;

    return(

        <div
            style={{

                position:"fixed",

                top:70,

                right:20,

                width:"340px",

                maxHeight:"500px",

                overflowY:"auto",

                background:"#20252b",

                borderRadius:"12px",

                padding:"20px",

                zIndex:9999,

                boxShadow:"0 0 20px rgba(0,0,0,.5)"

            }}
        >

            <h3>Notifications</h3>

            {

                notifications.slice(0,20).map(n=>(

                    <div

                        key={n.vehicle+n.time}

                        style={{

                            marginTop:"12px",

                            padding:"12px",

                            background:"#2b3138",

                            borderRadius:"8px"

                        }}

                    >

                        <b>{n.title}</b>

                        <div>{n.vehicle}</div>

                        <div>{n.message}</div>

                        <small>{n.time}</small>

                    </div>

                ))

            }

        </div>

    );

}