'use client'

import Context from '@/GlobalVariableProvider/Context';
import { useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react';

const Protector = ({ children }) => {
    const context = useContext(Context)
    const router = useRouter();
    // useEffect(() => {
    //     if (!context.ses) {
    //         return router.push('/register')
    //     }
    // }, [context.ses])

    return (
        <>
            {children}
        </>
    )
}
export default Protector