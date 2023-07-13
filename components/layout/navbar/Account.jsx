'use client'
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import axios from "axios"
import styles from '@/styles/component/accountModule.module.scss'
import classNames from "classnames/bind";

const cx = classNames.bind(styles)

export default function AccountModule({ session }) {
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
            // menu.style.left = `-220px`;
            menu.style.right = 0
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
        <button className={cx('button')}>
            <div className={cx('account-menu-box')}>
                <div ref={buttonRef} onClick={() => { setShow(!show) }}>
                    <img src={null} className={cx('avatar')} ref={buttonRef} />
                </div>
                {show ? <ul className={cx('dropdown')} ref={menuRef}>
                    <li className={cx('infomation-box')}>
                        <img src={null} className={cx('avatar')} />
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
        </button>
    )

}