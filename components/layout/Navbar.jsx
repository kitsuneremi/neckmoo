"use client";
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef, Suspense } from "react"
import { LeftOutlined, RightOutlined, CloseOutlined, SearchOutlined, BellOutlined, UploadOutlined, CommentOutlined, UnorderedListOutlined, SettingOutlined } from '@ant-design/icons'
import classNames from "classnames/bind"
import styles from '@/styles/component/navbar.module.scss'
import Link from "next/link"
import axios from "axios"
import NavbarSearchModule from '@/components/layout/NavbarSearchModule'
import ChatModule from '@/components/layout/navbar/Chat'
import NotificationModule from '@/components/layout/navbar/Notification'
import AccountModule from '@/components/layout/navbar/Account'
import { useSession } from 'next-auth/react'
import { AppDispatch, useAppSelector } from '@/redux/storage';
import { useDispatch } from 'react-redux'
import { close, reverse, open } from '@/redux/features/sidebar-slice';
import { useMediaQuery } from 'usehooks-ts'

const cx = classNames.bind(styles)

function Navbar() {
    const deviceType = {
        isPc: useMediaQuery('(min-width: 1200px'),
        isTablet: useMediaQuery('(min-width:700px) and (max-width: 1199px)'),
        isMobile: useMediaQuery('(max-width: 699px)')
    }

    const dispatch = useDispatch();
    const [responsiveShowing, setResponsiveShowing] = useState(false)
    const router = useRouter()
    const { data: session } = useSession()
    const sidebar = useAppSelector(state => state.sidebarReducer.value.sidebar)

    const ActionIsLogged = () => {
        if (typeof session == 'undefined') {
            return <div></div>
        } else {
            if (session == null) {
                return <button className={cx('login-button')} onClick={() => { router.push('/register') }}>đăng nhập</button>
            } else if (session.user) {
                return <div className={cx('action-box')}>
                    {deviceType.isMobile ? <button onClick={() => { setResponsiveShowing(true) }} className={cx('button')}><SearchOutlined /></button> : <></>}
                    <button onClick={() => { router.push('/studio/upload') }} className={cx('button')}>
                        <UploadOutlined />
                    </button>
                    <NotificationModule session={session} />
                    <ChatModule session={session} />
                    <Suspense fallback={<div>loading...</div>}><AccountModule session={session} /></Suspense>
                </div>
            } else {
                return <button className={cx('login-button')} onClick={() => { router.push('/register') }}>đăng nhập</button>
            }
        }

    }

    const handleResponsive = () => {
        if (deviceType.isMobile) {
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
                        <div></div>
                    </>
                )
            } else {
                // device type: mobile, trạng thái: ẩn search input
                return (
                    <>
                        <div className={cx('navigation-box')}>
                            {sidebar ? <RightOutlined onClick={() => { dispatch(reverse()) }} className={cx('sidebar-button')} /> : <LeftOutlined onClick={() => { dispatch(reverse()) }} className={cx('sidebar-button')} />}
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
                        {sidebar
                            ?
                            <RightOutlined
                                onClick={() => {
                                    dispatch(reverse())
                                }}
                                className={cx('sidebar-button')} />
                            :
                            <LeftOutlined
                                onClick={() => {
                                    dispatch(reverse())
                                    setResponsiveShowing(!responsiveShowing)
                                }}
                                className={cx('sidebar-button')} />}
                        <div><p className={'logo'} onClick={() => { router.push('/') }}>Neckmoo</p></div>
                    </div>
                    <NavbarSearchModule />
                    <ActionIsLogged session={session} deviceType={deviceType} router={router} />
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