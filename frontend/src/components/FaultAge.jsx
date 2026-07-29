//Timer for faults
import { useEffect, useState } from "react";

export default function FaultAge({ startedAt }) {

    const [seconds, setSeconds] = useState(0);

    useEffect(() => {

        function update() {
            const elapsed = Math.floor(Date.now() / 1000 - startedAt);
            setSeconds(Math.max(0, elapsed));
        }

        update();

        const timer = setInterval(update, 1000);

        return () => clearInterval(timer);

    }, [startedAt]);

    if (seconds < 60) {
        return (
            <span>
                Active for {seconds} sec
            </span>
        );
    }

    if (seconds < 3600) {

        const mins = Math.floor(seconds / 60);

        return (
            <span>
                Active for {mins} min
            </span>
        );
    }

    const hrs = Math.floor(seconds / 3600);

    return (
        <span>
            Active for {hrs} hr
        </span>
    );

}   