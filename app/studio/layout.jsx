'use client'
import StudioSidebar from "@/components/StudioSidebar"
import styles from '@/styles/defaultLayout.module.scss'
import classNames from "classnames/bind"
import Context from "@/GlobalVariableProvider/Context"
import { useContext, useEffect } from "react"
import Navbar from "@/components/Navbar"
import clsx from "clsx"
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