'use client'
import { useState, useEffect } from 'react';

export default function NotiBoard({ title }) {
    const [visible, setVisible] = useState<boolean>(true);
    const [progress, setProgress] = useState<number>(100);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisible(false);
        }, 3000);

        const interval = setInterval(() => {
            setProgress((prevProgress) => prevProgress - 100 / 300);
        }, 10);

        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, []);

    return (
        <div style={{ display: 'unset' }}>
            <div style={{ position: 'fixed', width: '100vw', height: '60px', backgroundColor: 'aliceblue', zIndex: '10000', lineHeight: '60px', textAlign: 'center', display: visible ? 'block' : 'none', top: 0, left: 0 }}>
                {title}
                <div style={{ height: '5px', backgroundColor: 'blue', width: `${progress}%` }}></div>
            </div>
        </div>
    );
}