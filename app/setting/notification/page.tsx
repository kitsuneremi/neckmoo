'use client'
import Context from '@/GlobalVariableProvider/Context'
import styles from '@/styles/setting/settingComponent.module.scss'
import classNames from 'classnames/bind'
import { useState, useLayoutEffect, useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const cx = classNames.bind(styles)

export default function NotificationSetting() {

    const context: any = useContext(Context);
    const router = useRouter();

    useLayoutEffect(() => {
        if (context.deviceType == 2 || context.deviceType == 1) {
            router.push('/setting')
        }
    }, [context.deviceType])

    return (
        <div className={cx('box')}>
            cập nhật sau(in progress)
        </div>
    )
}