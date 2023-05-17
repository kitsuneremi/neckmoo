'use client'
import { useRef, useState } from "react";
import Context from './Context'


function VariableProvider({ children }) {
    const [collapseSidebar, setCollapseSidebar] = useState(false)
    const value = {
        collapseSidebar,
        setCollapseSidebar,
    }
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default VariableProvider
