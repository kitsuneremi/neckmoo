'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react';

const Protector = ({ children }) => {
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