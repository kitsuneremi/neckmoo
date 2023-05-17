'use client'
import style from '@/styles/defaultLayout.module.scss'
import classNames from 'classnames/bind'
import DefaultSidebar from '@/components/DefaultSidebar'
import { useContext } from 'react'
import Context from '@/GlobalVariableProvider/Context'
import Navbar from '@/components/Navbar'
import clsx from 'clsx'
export default function ChannelLayout({ children }) {
    const cx = classNames.bind(style)
    const context = useContext(Context)
    return (
        <>
            <div className={cx('navbar')}>
                <Navbar></Navbar>
            </div>
            <div className={cx('box')}>
                <aside className={clsx({ [cx('sidebar-collapse')]: context.collapseSidebar }, { [cx('sidebar-expand')]: !context.collapseSidebar })}><DefaultSidebar /></aside>
                <aside className={clsx({ [cx('main-content-expand')]: context.collapseSidebar }, { [cx('main-content-collapse')]: !context.collapseSidebar })}>
                    {children}
                </aside>
            </div>
        </>
    )
}