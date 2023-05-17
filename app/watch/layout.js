'use client'
import WatchSidebar from "@/components/WatchSidebar";
import styles from '@/styles/defaultLayout.module.scss'
import classNames from "classnames/bind";
import { useContext, useEffect } from "react";
import Context from "@/GlobalVariableProvider/Context";
import Navbar from "@/components/Navbar";
import clsx from "clsx";
export default function WatchLayout({ children }) {
    const context = useContext(Context)
    const cx = classNames.bind(styles)
    useEffect(() => {
        context.setCollapseSidebar(true)
    },[])
    return (
        <>
            <div className={cx('navbar')}>
                <Navbar></Navbar>
            </div>
            <div className={cx('box')}>
                <aside className={clsx({[cx('sidebar-hide')]: context.collapseSidebar}, {[cx('sidebar-expand')]: !context.collapseSidebar})}><WatchSidebar /></aside>
                <aside className={cx('main-content-full')}>
                    {children}
                </aside>
            </div>
        </>
    )
}