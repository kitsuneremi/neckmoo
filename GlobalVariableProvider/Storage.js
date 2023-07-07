'use client'
import { useState, useLayoutEffect, useEffect } from "react";
import Context from './Context'
import { useSession } from "next-auth/react";


function VariableProvider({ children }) {
    const [collapseSidebar, setCollapseSidebar] = useState(true)
    const [deviceType, setDeviceType] = useState(0); //0 là pc, 1 là tablet, 2 là mobile
    const [ses, setSes] = useState(null)
    const { data: session } = useSession();

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
    }, []);
    const value = {
        collapseSidebar: collapseSidebar,
        ses: ses,
        setCollapseSidebar,
        setSes,
        deviceType
    }

    useLayoutEffect(() => {
        setSes(session)
    }, [session])

    return (
        <Context.Provider value={value} >
            {children}
        </Context.Provider>
    )
}

export default VariableProvider
