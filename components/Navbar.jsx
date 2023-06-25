"use client";
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef, useContext, useLayoutEffect } from "react"
import { signOut } from 'next-auth/react'
import { IeOutlined, LeftOutlined, RightOutlined, CloseOutlined, LoadingOutlined, SearchOutlined, BellOutlined, UploadOutlined } from '@ant-design/icons'
import classNames from "classnames/bind"
import styles from '@/styles/navbar.module.scss'
import Link from "next/link"
import Context from "@/GlobalVariableProvider/Context"
import axios from "axios"
import NavbarSearchModule from './inside/NavbarSearchModule'

const cx = classNames.bind(styles)

const AccountMenu = ({ session }) => {
    const [show, setShow] = useState(false)
    const [channelData, setChannelData] = useState(null);
    const buttonRef = useRef(null);
    const menuRef = useRef(null);
    const router = useRouter();


    useEffect(() => {
        const button = buttonRef.current;
        const menu = menuRef.current;
        if (button && menu) {
            const buttonRect = button.getBoundingClientRect();
            menu.style.left = `-220px`;
            menu.style.top = `${buttonRect.bottom}px`;
        }
    }, [show]);

    useEffect(() => {
        if (session && session.user) {
            axios.get(`/api/channel/getdatabyaccountid`, {
                params: {
                    accountId: session.user.id
                }
            }).then(res => { setChannelData(res.data) })
        }
    }, [session])

    const handlePush = () => {
        if (channelData != null) {
            router.push(`/channel/${channelData.tagName}`)
        } else {
            router.push('/registerchannel')
        }
    }

    return (
        <div className={cx('account-menu-box')}>
            <button ref={buttonRef} onClick={() => { setShow(!show) }} className={cx('button')}>
                <img src="" className={cx('avatar')} />
            </button>
            {show ? <ul className={cx('dropdown')} ref={menuRef}>
                <li className={cx('infomation-box')}>
                    <img src="" className={cx('avatar')} />
                    <div className={cx('infomation')}>
                        <p>@{session ? session.user.name : ''}</p>
                        <p>{session ? session.user.email : ''}</p>
                    </div>
                </li>
                <li className={cx('menu-box')} onClick={() => { handlePush() }}><p className={cx('title')}>Kênh của bạn</p></li>
                <li className={cx('menu-box')} onClick={() => { router.push('/setting') }}><p className={cx('title')}>cài đặt</p></li>
                <li className={cx('menu-box')}><p className={cx('title')}>chế độ sáng</p></li>
                <li className={cx('menu-box')} onClick={() => { router.push('/termofuser') }}><p className={cx('title')}>điều khoản sử dụng</p></li>
                <li className={cx('menu-box')} onClick={() => { router.push('/setting/account') }}><p className={cx('title')}>thông tin cá nhân</p></li>
                <li className={cx('menu-box')}><p className={cx('title')} onClick={() => { signOut() }}>đăng xuất</p></li>
            </ul> : <></>}
        </div>
    )
}

const NotificationMenu = () => {
    const [show, setShow] = useState(false)
    const buttonRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const button = buttonRef.current;
        const menu = menuRef.current;
        if (button && menu) {
            const buttonRect = button.getBoundingClientRect();
            menu.style.left = `-180px`;
            menu.style.top = `${buttonRect.bottom}px`;
        }
    }, [show]);

    return (
        <div className={cx('notification-box')}>
            <button ref={buttonRef} onClick={() => { setShow(!show) }} className={cx('button')}>
                <BellOutlined />
            </button>

            {show ? <div className={cx('dropdown')} ref={menuRef}>
                menu
            </div> : <></>}
        </div>
    )
}

function Navbar() {
    const context = useContext(Context)
    const [responsiveShowing, setResponsiveShowing] = useState(false)
    const router = useRouter()

    const ActionIsLogged = () => {
        if (context.ses && context.ses.user) {
            return <div className={cx('action-box')}>
                {context.deviceType != 2 ? <></> : <button onClick={() => { setResponsiveShowing(true) }} className={cx('button')}><SearchOutlined></SearchOutlined></button>}
                <button onClick={() => { router.push('/studio/upload') }} className={cx('button')}>
                    <UploadOutlined />
                </button>
                <button>
                    <NotificationMenu />
                </button>

                <AccountMenu session={context.ses} />

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
                            <div><p className={'logo'} onClick={() => { router.push('/') }}>Zootube</p></div>
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
                        <div><p className={'logo'} onClick={() => { router.push('/') }}>Zootube</p></div>
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