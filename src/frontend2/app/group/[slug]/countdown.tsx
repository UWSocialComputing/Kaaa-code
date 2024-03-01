import { useState, useEffect } from 'react';

export default function Countdown(props: { timeLeft: number, className: string }) {
    const [seconds, setSeconds] = useState<number>(Math.floor(props.timeLeft / 1000));

    useEffect(() => {
        seconds > 0 && setTimeout(() => setSeconds(seconds - 1), 1000);
    }, [seconds]);

    const formatTime = () => {
        const days = Math.floor((seconds % 365) / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${days}:${hours}:${minutes}:${seconds % 60}`;
    }

    return (
        <div className={props.className}>
            {seconds > 0 ? formatTime() : "Prompt Expired"}
        </div>
    );
}