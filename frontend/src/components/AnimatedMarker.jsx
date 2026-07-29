import { Marker } from "react-leaflet";
import { useEffect, useState } from "react";

export default function AnimatedMarker({
    position,
    icon,
    children,
    ...props
}) {

    const [pos, setPos] = useState(position);

    useEffect(() => {
        setPos(position);
    }, [position]);

    return (
        <Marker
            position={pos}
            icon={icon}
            {...props}
        >
            {children}
        </Marker>
    );
}