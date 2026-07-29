import { useNotifications } from "../context/NotificationContext";
//bell icon drawer
export default function NotificationBell() {

    const {
        unread,
        notifications,
        drawerOpen,
        setDrawerOpen,
        markAllRead
    } = useNotifications();

    return (

        <div style={{ position: "relative" }}>

            <button
                onClick={() => {
                    setDrawerOpen(!drawerOpen);
                    markAllRead();
                }}
                style={{
                    background: "transparent",
                    border: "none",
                    color: "white",
                    fontSize: "26px",
                    cursor: "pointer",
                    position: "relative"
                }}
            >
                🔔

                {
                    unread > 0 &&
                    <span
                        style={{
                            position: "absolute",
                            top: "-8px",
                            right: "-8px",
                            background: "red",
                            color: "white",
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            fontSize: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        {unread}
                    </span>
                }

            </button>

            {
                drawerOpen &&
                <div
                    style={{
                        position: "absolute",
                        right: 0,
                        top: "45px",
                        width: "360px",
                        maxHeight: "450px",
                        overflowY: "auto",
                        background: "#20252b",
                        borderRadius: "12px",
                        padding: "15px",
                        zIndex: 999
                    }}
                >

                    <h3>Notifications</h3>

                    {
                        notifications.slice(0,15).map((n,i)=>(
                            <div
                                key={i}
                                style={{
                                    padding:"10px",
                                    marginTop:"10px",
                                    borderBottom:"1px solid #444"
                                }}
                            >
                                <b>{n.title}</b>

                                <div>{n.vehicle}</div>

                                <small>{n.time}</small>

                            </div>
                        ))
                    }

                </div>
            }

        </div>

    );

}