'use client'
import { useState, useLayoutEffect } from "react";
import Context from './Context'
import { useSession } from "next-auth/react";


function VariableProvider({ children }) {
    const [collapseSidebar, setCollapseSidebar] = useState(false)
    const [ses, setSes] = useState(null)
    const value = {
        collapseSidebar,
        ses,
        setCollapseSidebar,
        setSes
    }
    const {data: session} = useSession();
    useLayoutEffect(() => {
      setSes(session)
    },[session])
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default VariableProvider
