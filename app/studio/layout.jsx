'use client'
import { useContext, useEffect } from "react"
import styles from '@/styles/layout/defaultLayout.module.scss'
import classNames from "classnames/bind"
import Context from "@/GlobalVariableProvider/Context"
import Navbar from "@/components/layout/Navbar"
import Protector from '@/lib/protector'
import MainStudioLayout from '@/layout/mainStudioLayout'
const cx = classNames.bind(styles)
export default function StudioLayout({ children }) {
    const context = useContext(Context)
    useEffect(() => {
        if (context.deviceType == 0) {
            context.setCollapseSidebar(false)
        } else {
            context.setCollapseSidebar(true)
        }
    }, [])
    return (
        <>
            <Protector>
                <div className={cx('navbar')}>
                    <Navbar></Navbar>
                </div>
                <MainStudioLayout>
                    {children}
                </MainStudioLayout>
            </Protector>
        </>
    )
}