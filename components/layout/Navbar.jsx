"use client";
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef, useContext } from "react"
import { LeftOutlined, RightOutlined, CloseOutlined, SearchOutlined, BellOutlined, UploadOutlined, CommentOutlined, UnorderedListOutlined, SettingOutlined } from '@ant-design/icons'
import classNames from "classnames/bind"
import styles from '@/styles/component/navbar.module.scss'
import Link from "next/link"
import Context from "@/GlobalVariableProvider/Context"
import axios from "axios"
import NavbarSearchModule from '@/components/layout/NavbarSearchModule'
import ChatModule from '@/components/layout/navbar/Chat'
import NotificationModule from '@/components/layout/navbar/Notification'
import AccountModule from '@/components/layout/navbar/Account'

const cx = classNames.bind(styles)


function Navbar() {
    const context = useContext(Context)
    const [responsiveShowing, setResponsiveShowing] = useState(false)
    const router = useRouter()

    const ActionIsLogged = () => {
        if (context.ses && context.ses.user) {
            return <div className={cx('action-box')}>
                {context.deviceType != 2 ? <></> : <button onClick={() => { setResponsiveShowing(true) }} className={cx('button')}><SearchOutlined /></button>}
                <button onClick={() => { router.push('/studio/upload') }} className={cx('button')}>
                    <UploadOutlined />
                </button>
                <NotificationModule session={context.ses} />
                <ChatModule session={context.ses} />
                <AccountModule session={context.ses} />

            </div>
        } else {
            return <button className={cx('login-button')} onClick={() => { router.push('/register') }}>đăng nhập</button>
        }
    }

    const handleResponsive = () => {
        if (context.deviceType == 2) {
            if (responsiveShowing) {
                //device type: mobile, trạng thái: show search input
                return (
                    <>
                        <div className={cx('navigation-box')}>
                            <button className={cx('button')}>
                                <CloseOutlined onClick={() => setResponsiveShowing(false)} />
                            </button>
                        </div>
                        <NavbarSearchModule />
                    </>
                )
            } else {
                // device type: mobile, trạng thái: ẩn search input
                return (
                    <>
                        <div className={cx('navigation-box')}>
                            {context.collapseSidebar ? <RightOutlined onClick={() => { context.setCollapseSidebar(!context.collapseSidebar) }} className={cx('sidebar-button')} /> : <LeftOutlined onClick={() => { context.setCollapseSidebar(!context.collapseSidebar); }} className={cx('sidebar-button')} />}
                            <div><p className={'logo'} onClick={() => { router.push('/') }}>Neckmoo</p></div>
                        </div>
                        {ActionIsLogged()}
                    </>
                )
            }
        } else {
            return (
                // device type: desktop hoặc tablet
                <>
                    <div className={cx('navigation-box')}>
                        {context.collapseSidebar ? <RightOutlined onClick={() => { context.setCollapseSidebar(!context.collapseSidebar) }} className={cx('sidebar-button')} /> : <LeftOutlined onClick={() => { context.setCollapseSidebar(!context.collapseSidebar); setResponsiveShowing(!responsiveShowing) }} className={cx('sidebar-button')} />}
                        <div><p className={'logo'} onClick={() => { router.push('/') }}>Neckmoo</p></div>
                    </div>
                    <NavbarSearchModule />
                    {ActionIsLogged()}
                </>
            )
        }
    }

    return (
        <nav className={'navbar'}>
            <div className={cx('wrapper')}>
                {handleResponsive()}
            </div>
        </nav>
    )
}

export default Navbar