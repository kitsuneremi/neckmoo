'use client'
import StudioSidebar from "@/components/StudioSidebar"
import styles from '@/styles/defaultLayout.module.scss'
import classNames from "classnames/bind"
import Context from "@/GlobalVariableProvider/Context"
import { useContext, useEffect } from "react"
import Navbar from "@/components/StudioNavbar"
import clsx from "clsx"
const cx = classNames.bind(styles)
export default function StudioLayout({ children }) {
    const context = useContext(Context)
    useEffect(() => {
        context.setCollapseSidebar(false)
    },[])
    return (
        <>
            <div className={cx('navbar')}>
                <Navbar></Navbar>
            </div>
            <div className={cx('box')}>
                <aside className={clsx({ [cx('sidebar-collapse')]: context.collapseSidebar }, { [cx('sidebar-expand')]: !context.collapseSidebar })}><StudioSidebar /></aside>
                <aside className={clsx({ [cx('main-content-expand')]: context.collapseSidebar }, { [cx('main-content-collapse')]: !context.collapseSidebar })}>
                    {children}
                </aside>
            </div>
        </>
    )
}