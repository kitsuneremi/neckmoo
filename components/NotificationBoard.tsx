'use client'
import { useState, useEffect } from 'react';

export default function NotiBoard({ title }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisible(false);
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div style={{ position: 'absolute', width: '100vw', height: '60px', backgroundColor: 'blue', zIndex: '10000', lineHeight: '60px', textAlign: 'center', display: visible ? 'block' : 'none', top: '-60px', left: '0' }}>
            {title}
        </div>
    );
}