'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';

const Protector = ({ children }) => {
    const { data: session } = useSession();
    const router = useRouter();
    useEffect(() => {
        if (session) {
            console.log(session)
            if (!session.user) {
                return router.push('/register')
            }
        }else{
            return router.push('/register')
        }
    }, [session])

    return (
        <>
            {children}
        </>
    )
}
export default Protector