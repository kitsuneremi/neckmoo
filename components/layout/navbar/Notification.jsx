'use client';
import { useState, useEffect, useRef } from "react";
import styles from '@/styles/component/notificationModule.module.scss'
import classNames from "classnames/bind";
import { BellOutlined } from '@ant-design/icons'

const cx = classNames.bind(styles)

export default function NotificationModule({ session }) {
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
        <button className={cx('button')}>
        <div className={cx('notification-box')}>
            <div ref={buttonRef} onClick={() => { setShow(!show) }}>
                <BellOutlined />
            </div>

            {show ? <div className={cx('dropdown')} ref={menuRef}>
                menu
            </div> : <></>}
        </div>
        </button>
    )
}