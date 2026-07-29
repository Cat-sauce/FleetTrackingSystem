import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
    return (
        <div
            style={{
                width: "100%",
                minHeight: "100vh",
                overflowX: "hidden",
                background: "#0f1116"
            }}
        >
            <Navbar />

            <div
                style={{
                    display: "flex",
                    width: "100%"
                }}
            >
                <Sidebar />

                <div
                    style={{
                        flex: 1,
                        padding: "24px"
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}