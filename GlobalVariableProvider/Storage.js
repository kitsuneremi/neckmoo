'use client'
import { useState, useLayoutEffect, useEffect } from "react";
import Context from './Context'

function VariableProvider({ children }) {
    const [deviceType, setDeviceType] = useState(0); //0 là pc, 1 là tablet, 2 là mobile

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1200) {
                setDeviceType(0);
            } else if (window.innerWidth >= 700) {
                setDeviceType(1);
            } else if (window.innerWidth < 700) {
                setDeviceType(2);
            }
        };

        if (typeof window !== 'undefined') {
            handleResize();
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [typeof window]);
    const value = {
        deviceType
    }
    return (
        <Context.Provider value={value} >
            {children}
        </Context.Provider>
    )
}

export default VariableProvider
